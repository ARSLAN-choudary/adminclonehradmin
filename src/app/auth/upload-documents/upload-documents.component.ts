import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { WebcamImage, WebcamModule } from 'ngx-webcam';

// OpenCV.js
import cvModule from '@techstark/opencv-js';

type DocType = 'passport' | 'residenceCard' | 'healthCard' | 'drivingLicense';

@Component({
  selector: 'app-upload-documents',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WebcamModule],
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss'],
})
export class UploadDocumentsComponent {
  form: FormGroup;

  activeDocType: DocType | null = null;

  // when true: show full-screen camera, hide cards
  showCamera = false;

  hint = 'Click a card to capture its document.';
  qualityStatus: 'unknown' | 'good' | 'blurry' | 'too_far' | 'too_close' =
    'unknown';

  // ngx-webcam trigger
  private snapshotTrigger: Subject<void> = new Subject<void>();
  triggerObservable = this.snapshotTrigger.asObservable();

  // OpenCV
  private cv: any | null = null;
  private cvReady = false;

  // thresholds (relaxed!)
  private readonly BLUR_THRESHOLD = 40;      // was 80, now easier to pass
  private readonly AREA_TOO_FAR_MAX = 0.05;  // < 5% of frame area = too far
  private readonly AREA_TOO_CLOSE_MIN = 0.85; // > 85% of frame area = too close

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      passport: this.fb.group({
        dataUrl: [''],
        uploaded: [false],
      }),
      residenceCard: this.fb.group({
        dataUrl: [''],
        uploaded: [false],
      }),
      healthCard: this.fb.group({
        dataUrl: [''],
        uploaded: [false],
      }),
      drivingLicense: this.fb.group({
        dataUrl: [''],
        uploaded: [false],
      }),
    });

    this.initOpenCv();
  }

  // --------- OpenCV init ----------
  private async initOpenCv() {
    let cvAny: any;

    if ((cvModule as any) instanceof Promise) {
      cvAny = await (cvModule as any);
    } else {
      const mod: any = cvModule;
      if (mod.Mat) {
        cvAny = mod;
      } else {
        await new Promise<void>((resolve) => {
          mod.onRuntimeInitialized = () => resolve();
        });
        cvAny = mod;
      }
    }

    this.cv = cvAny;
    this.cvReady = true;
    console.log('OpenCV.js is ready');
  }

  // ========== Card selection ==========
  selectDocType(type: DocType) {
    this.activeDocType = type;
    this.hint = `Align your ${this.labelFor(
      type
    )} inside the frame and tap Capture.`;
    this.qualityStatus = 'unknown';
    this.showCamera = true; // show overlay, hide cards
  }

  // Close camera overlay (X button)
  onCloseCamera() {
    this.showCamera = false;
    this.qualityStatus = 'unknown';
    this.hint = 'Click a card to capture its document.';
  }

  labelFor(type: DocType): string {
    switch (type) {
      case 'passport':
        return 'Passport';
      case 'residenceCard':
        return 'Residence Card';
      case 'healthCard':
        return 'Health Card';
      case 'drivingLicense':
        return 'Driving License';
    }
  }

  // ========== Capture via ngx-webcam ==========
  triggerSnapshot() {
    if (!this.activeDocType) return;
    this.snapshotTrigger.next();
  }

  // async so we can await analysis
  async handleImage(webcamImage: WebcamImage) {
    if (!this.activeDocType) return;

    const dataUrl = webcamImage.imageAsDataUrl;

    // 1) analyze blur / too far / too close
    const quality = await this.analyzeQuality(dataUrl);
    this.qualityStatus = quality.status;
    this.hint = quality.message;

    // If not good, keep camera open so user can try again
    if (quality.status !== 'good') {
      console.warn('Quality not good, not saving image', quality);
      return;
    }

    // 2) Save to form (good quality)
    const group = this.form.get(this.activeDocType) as FormGroup;
    group.patchValue({
      dataUrl,
      uploaded: true,
    });

    console.log(`Captured for ${this.activeDocType}:`, group.value);

    // 3) Close camera & go back to cards
    this.showCamera = false;
    this.hint = `Captured ${this.labelFor(
      this.activeDocType
    )}. Click another card to capture again.`;
    this.qualityStatus = 'good';
  }

  handleCameraInitError(error: any) {
    console.error('Camera init error', error);
    this.hint = 'Cannot access camera. Please allow camera permission.';
  }

  // ========== Submit ==========
  onSubmit() {
    console.log('Full form value:', this.form.value);
  }

  // ========== QUALITY ANALYSIS WITH OPENCV ==========
  private async analyzeQuality(
    dataUrl: string
  ): Promise<{
    status: 'good' | 'blurry' | 'too_far' | 'too_close' | 'unknown';
    message: string;
  }> {
    if (!this.cvReady || !this.cv) {
      console.warn('OpenCV not ready, skipping quality check');
      return {
        status: 'good',
        message: 'Captured (quality check not ready).',
      };
    }

    const cv = this.cv;
    const img = await this.loadImage(dataUrl);

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return {
        status: 'unknown',
        message: 'Unable to analyze image quality.',
      };
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Convert to cv.Mat
    const src = cv.matFromImageData(imageData);
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    // 1) Blur detection using Laplacian variance
    const lap = new cv.Mat();
    cv.Laplacian(gray, lap, cv.CV_64F);

    const data = lap.data64F as Float64Array;
    let sum = 0;
    let sumSq = 0;
    const n = data.length;
    for (let i = 0; i < n; i++) {
      const v = data[i];
      sum += v;
      sumSq += v * v;
    }
    const mean = n > 0 ? sum / n : 0;
    const variance = n > 0 ? sumSq / n - mean * mean : 0;
    const blurScore = variance;

    // 2) Document size / distance via largest contour area
    const edges = new cv.Mat();
    cv.Canny(gray, edges, 50, 150);

    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(
      edges,
      contours,
      hierarchy,
      cv.RETR_EXTERNAL,
      cv.CHAIN_APPROX_SIMPLE
    );

    let maxArea = 0;
    for (let i = 0; i < contours.size(); i++) {
      const cnt = contours.get(i);
      const area = cv.contourArea(cnt);
      if (area > maxArea) {
        maxArea = area;
      }
      cnt.delete();
    }

    const totalArea = gray.rows * gray.cols;
    const areaRatio = totalArea > 0 ? maxArea / totalArea : 0;

    // cleanup
    src.delete();
    gray.delete();
    lap.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();

    console.log(
      'blurScore:',
      blurScore.toFixed(1),
      'areaRatio:',
      areaRatio.toFixed(2)
    );

    // 3) Map to messages

    // Blur has highest priority
    if (blurScore < this.BLUR_THRESHOLD) {
      return {
        status: 'blurry',
        message: 'Image is blurry. Hold still and try again.',
      };
    }

    // If we couldn't detect any clear contour, don't block the user
    if (areaRatio === 0) {
      return {
        status: 'good',
        message: 'Looks good! Image captured successfully.',
      };
    }

    if (areaRatio < this.AREA_TOO_FAR_MAX) {
      return {
        status: 'too_far',
        message:
          'Document is too far. Move it closer so it fills more of the frame.',
      };
    }

    if (areaRatio > this.AREA_TOO_CLOSE_MIN) {
      return {
        status: 'too_close',
        message:
          'Document is too close. Move it a bit away so edges are visible.',
      };
    }

    return {
      status: 'good',
      message: 'Looks good! Image captured successfully.',
    };
  }

  // helper to load image from data URL
  private loadImage(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = dataUrl;
    });
  }
}
