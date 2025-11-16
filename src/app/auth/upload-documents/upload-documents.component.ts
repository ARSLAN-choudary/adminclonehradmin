import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

type DocType = 'passport' | 'residenceCard' | 'healthCard' | 'drivingLicense';

@Component({
  selector: 'app-upload-documents',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss'],
})
export class UploadDocumentsComponent implements OnDestroy {
  @ViewChild('videoEl', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  @ViewChild('canvasEl', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  form: FormGroup;

  // Which card is currently active for capture
  activeDocType: DocType | null = null;

  hint = 'Click a card to start capturing.';
  qualityStatus: 'unknown' | 'good' | 'blurry' | 'too_far' | 'too_close' =
    'unknown';

  debug = {
    blurScore: 0,
    edgeCount: 0,
    borderEdgeRatio: 0,
  };

  showPermissionHelp = false;

  private stream: MediaStream | null = null;
  private analyzeIntervalId: any = null;
  private isCameraReady = false;

  // ========== Analysis settings ==========
  private readonly ANALYZE_INTERVAL_MS = 700;
  private readonly ANALYZE_WIDTH = 160;
  private readonly ANALYZE_HEIGHT = 120;

  private readonly BLUR_THRESHOLD = 80;
  private readonly EDGE_TOO_FAR_MAX = 130;
  private readonly EDGE_TOO_CLOSE_MIN = 450;
  private readonly BORDER_EDGE_RATIO_MAX = 0.32;

  private readonly METRICS_WINDOW = 5;
  private metricsHistory: {
    blurScore: number;
    edgeCount: number;
    borderEdgeRatio: number;
  }[] = [];

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
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  // ========== CARD SELECTION ==========
  async selectDocType(type: DocType) {
    this.activeDocType = type;
    this.hint = `Preparing camera for ${this.labelFor(type)}...`;
    this.qualityStatus = 'unknown';

    // (re)start camera when a card is clicked
    await this.startCamera();
  }

  labelFor(type: DocType): string {
    switch (type) {
      case 'passport': return 'Passport';
      case 'residenceCard': return 'Residence Card';
      case 'healthCard': return 'Health Card';
      case 'drivingLicense': return 'Driving License';
    }
  }

  // ========== CAMERA ==========
  private async startCamera() {
    try {
      this.showPermissionHelp = false;
      this.stopCamera(); // make sure no old stream is alive

      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });

      const video = this.videoRef.nativeElement;
      video.srcObject = this.stream;
      await video.play();

      this.isCameraReady = true;
      this.hint = 'Hold your document inside the frame.';
      this.startAnalysisLoop();
    } catch (err: any) {
      console.error('Error starting camera', err);
      this.handleGetUserMediaError(err);
    }
  }

  private handleGetUserMediaError(err: any) {
    const name = err?.name;
    console.log('getUserMedia error name:', name);

    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      this.hint = 'Cannot access camera. Please allow camera permission.';
      this.showPermissionHelp = true;
    } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
      this.hint = 'No camera found on this device.';
    } else if (
      window.location.protocol !== 'https:' &&
      window.location.hostname !== 'localhost'
    ) {
      this.hint = 'Camera only works on HTTPS or http://localhost for security.';
      this.showPermissionHelp = true;
    } else {
      this.hint = 'Error starting camera. Please check browser permissions.';
      this.showPermissionHelp = true;
    }
  }

  private stopCamera() {
    if (this.analyzeIntervalId) {
      clearInterval(this.analyzeIntervalId);
      this.analyzeIntervalId = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    this.isCameraReady = false;
    this.metricsHistory = [];
    this.debug = { blurScore: 0, edgeCount: 0, borderEdgeRatio: 0 };
    this.qualityStatus = 'unknown';
  }

  async onRetryPermission() {
    if (!this.activeDocType) return;
    await this.startCamera();
  }

  // ========== ANALYSIS LOOP ==========
  private startAnalysisLoop() {
    if (this.analyzeIntervalId) {
      clearInterval(this.analyzeIntervalId);
    }

    this.analyzeIntervalId = setInterval(() => {
      this.analyzeFrame();
    }, this.ANALYZE_INTERVAL_MS);
  }

  private analyzeFrame() {
    const video = this.videoRef?.nativeElement;
    const canvas = this.canvasRef?.nativeElement;
    if (!video || !canvas || !this.isCameraReady) return;
    if (!video.videoWidth || !video.videoHeight) return;

    canvas.width = this.ANALYZE_WIDTH;
    canvas.height = this.ANALYZE_HEIGHT;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    } catch {
      return;
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const gray = this.toGrayscale(imageData.data, canvas.width, canvas.height);

    const blurScore = this.computeLaplacianVariance(
      gray,
      canvas.width,
      canvas.height
    );
    const { edgeCount, borderEdgeRatio } = this.computeEdgeStats(
      gray,
      canvas.width,
      canvas.height
    );

    this.pushMetricsSample({ blurScore, edgeCount, borderEdgeRatio });

    const avg = this.getAveragedMetrics();

    this.debug.blurScore = Math.round(avg.blurScore);
    this.debug.edgeCount = Math.round(avg.edgeCount);
    this.debug.borderEdgeRatio = Number(avg.borderEdgeRatio.toFixed(2));

    this.updateQualityFromMetrics(
      avg.blurScore,
      avg.edgeCount,
      avg.borderEdgeRatio
    );
  }

  // ========== METRICS SMOOTHING ==========
  private pushMetricsSample(sample: {
    blurScore: number;
    edgeCount: number;
    borderEdgeRatio: number;
  }) {
    this.metricsHistory.push(sample);
    if (this.metricsHistory.length > this.METRICS_WINDOW) {
      this.metricsHistory.shift();
    }
  }

  private getAveragedMetrics() {
    if (this.metricsHistory.length === 0) {
      return { blurScore: 0, edgeCount: 0, borderEdgeRatio: 0 };
    }

    let blurSum = 0;
    let edgeSum = 0;
    let borderSum = 0;

    for (const m of this.metricsHistory) {
      blurSum += m.blurScore;
      edgeSum += m.edgeCount;
      borderSum += m.borderEdgeRatio;
    }

    const n = this.metricsHistory.length;

    return {
      blurScore: blurSum / n,
      edgeCount: edgeSum / n,
      borderEdgeRatio: borderSum / n,
    };
  }

  private updateQualityFromMetrics(
    blurScore: number,
    edgeCount: number,
    borderEdgeRatio: number
  ) {
    if (!this.isCameraReady) return;

    if (blurScore < this.BLUR_THRESHOLD) {
      this.qualityStatus = 'blurry';
      this.hint = 'Image is blurry. Hold still or move slightly closer.';
      return;
    }

    if (edgeCount < this.EDGE_TOO_FAR_MAX) {
      this.qualityStatus = 'too_far';
      this.hint = 'Move the document closer and fill more of the frame.';
      return;
    }

    if (
      edgeCount > this.EDGE_TOO_CLOSE_MIN &&
      borderEdgeRatio > this.BORDER_EDGE_RATIO_MAX
    ) {
      this.qualityStatus = 'too_close';
      this.hint = 'Move the document a bit farther. Edges are getting cut off.';
      return;
    }

    this.qualityStatus = 'good';
    this.hint = 'Perfect! Keep it like this and tap Capture.';
  }

  // ========== IMAGE HELPERS ==========
  private toGrayscale(
    data: Uint8ClampedArray,
    width: number,
    height: number
  ): Float32Array {
    const gray = new Float32Array(width * height);
    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      gray[j] = 0.299 * r + 0.587 * g + 0.114 * b;
    }
    return gray;
  }

  private computeLaplacianVariance(
    gray: Float32Array,
    width: number,
    height: number
  ): number {
    let sum = 0;
    let sumSq = 0;
    let count = 0;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;
        const up = gray[idx - width];
        const down = gray[idx + width];
        const left = gray[idx - 1];
        const right = gray[idx + 1];
        const center = gray[idx];

        const lap = up + down + left + right - 4 * center;

        sum += lap;
        sumSq += lap * lap;
        count++;
      }
    }

    if (count === 0) return 0;
    const mean = sum / count;
    const variance = sumSq / count - mean * mean;
    return variance;
  }

  private computeEdgeStats(
    gray: Float32Array,
    width: number,
    height: number
  ): { edgeCount: number; borderEdgeRatio: number } {
    const EDGE_THRESHOLD = 18;
    const borderX = Math.floor(width * 0.18);
    const borderY = Math.floor(height * 0.18);

    let edgeCount = 0;
    let borderEdgeCount = 0;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;

        const gx = gray[idx + 1] - gray[idx - 1];
        const gy = gray[idx + width] - gray[idx - width];
        const mag = Math.abs(gx) + Math.abs(gy);

        if (mag > EDGE_THRESHOLD) {
          edgeCount++;

          const isBorder =
            x < borderX ||
            x > width - borderX ||
            y < borderY ||
            y > height - borderY;

          if (isBorder) borderEdgeCount++;
        }
      }
    }

    const borderEdgeRatio = edgeCount > 0 ? borderEdgeCount / edgeCount : 0;
    return { edgeCount, borderEdgeRatio };
  }

  // ========== CAPTURE AND FORM UPDATE ==========
  async capture() {
    if (!this.activeDocType) return;

    const video = this.videoRef?.nativeElement;
    if (!video || !this.isCameraReady) return;

    const captureCanvas = document.createElement('canvas');
    const ctx = captureCanvas.getContext('2d');
    if (!ctx) return;

    const videoWidth = video.videoWidth || 1280;
    const videoHeight = video.videoHeight || 720;
    captureCanvas.width = videoWidth;
    captureCanvas.height = videoHeight;

    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    captureCanvas.toBlob(
      (blob) => {
        if (!blob) return;

        const file = new File([blob], `${this.activeDocType}.jpg`, {
          type: 'image/jpeg',
        });

        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;

          const group = this.form.get(this.activeDocType!) as FormGroup;
          group.patchValue({
            dataUrl,
            uploaded: true,
          });

          console.log(
            `Captured for ${this.activeDocType}:`,
            group.value
          );

          // ✅ Close the camera after capturing
          this.stopCamera();
          this.hint = `Captured ${this.labelFor(this.activeDocType!)}. Click another card to capture again.`;
        };
        reader.readAsDataURL(file);
      },
      'image/jpeg',
      0.9
    );
  }

  // ========== SUBMIT ==========
  onSubmit() {
    console.log('Full form value:', this.form.value);
    // Later: send this.form.value to API
  }
}
