import { Component, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  Validators,
} from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import { WebcamImage, WebcamModule } from "ngx-webcam";

type DocType =
  | "passport"
  | "residenceCard"
  | "healthCard"
  | "healthCertificate"
  | "additional";

@Component({
  selector: 'app-resubmition-docs',
  imports: [CommonModule, ReactiveFormsModule, WebcamModule],
  templateUrl: './resubmition-docs.component.html',
  styleUrl: './resubmition-docs.component.scss'
})
export class ResubmitionDocsComponent {
  form: FormGroup;

  activeDocType: DocType | null = null;
  activeAdditionalDocIndex: number | null = null;
  showCamera = false;
  hint = "Click a card to capture its document.";
  qualityStatus: "unknown" | "good" | "blurry" | "too_far" | "too_close" = "unknown";

  // ngx-webcam trigger
  private snapshotTrigger: Subject<void> = new Subject<void>();
  triggerObservable = this.snapshotTrigger.asObservable();

  // OpenCV (optional - for image quality analysis)
  private cvReady = false;

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
      healthCertificate: this.fb.group({
        dataUrl: [''],
        uploaded: [false],
      }),
      additionalDocuments: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Initialize with one additional document
    this.addAdditionalDocument();
  }

  // ========== DOCUMENT TYPE SELECTION ==========
  selectDocType(type: DocType) {
    this.activeDocType = type;
    this.activeAdditionalDocIndex = null;
    this.hint = `Align your ${this.labelFor(type)} inside the frame and tap Capture.`;
    this.qualityStatus = "unknown";
    this.showCamera = true;
  }

  selectAdditionalDocType(index: number) {
    this.activeDocType = "additional";
    this.activeAdditionalDocIndex = index;
    const docName = this.additionalDocumentsForms.at(index).get('documentName')?.value || `Document ${index + 1}`;
    this.hint = `Align your ${docName} inside the frame and tap Capture.`;
    this.qualityStatus = "unknown";
    this.showCamera = true;
  }

  labelFor(type: DocType): string {
    switch (type) {
      case "passport": return "Passport";
      case "residenceCard": return "Residence Card";
      case "healthCard": return "Health Card";
      case "healthCertificate": return "Health Certificate";
      case "additional": return "Additional Document";
      default: return "Document";
    }
  }

  getCameraTitle(): string {
    if (this.activeDocType === "additional" && this.activeAdditionalDocIndex !== null) {
      const docName = this.additionalDocumentsForms.at(this.activeAdditionalDocIndex).get('documentName')?.value;
      return docName || `Additional Document ${this.activeAdditionalDocIndex + 1}`;
    }
    return this.activeDocType ? this.labelFor(this.activeDocType) : "Document";
  }

  // ========== CAMERA CONTROLS ==========
  onCloseCamera() {
    this.showCamera = false;
    this.qualityStatus = "unknown";
    this.hint = "Click a card to capture its document.";
    this.activeAdditionalDocIndex = null;
  }

  triggerSnapshot() {
    if (!this.activeDocType) return;
    this.snapshotTrigger.next();
  }

  async handleImage(webcamImage: WebcamImage) {
    if (!this.activeDocType) return;

    const dataUrl = webcamImage.imageAsDataUrl;

    // Simple quality check (you can enhance this with OpenCV)
    const quality = await this.simpleQualityCheck(dataUrl);
    this.qualityStatus = quality.status;
    this.hint = quality.message;

    if (quality.status !== "good") {
      console.warn("Quality not good, not saving image", quality);
      return;
    }

    // Save to form
    if (this.activeDocType === "additional" && this.activeAdditionalDocIndex !== null) {
      const docGroup = this.additionalDocumentsForms.at(this.activeAdditionalDocIndex) as FormGroup;
      docGroup.patchValue({
        dataUrl,
        uploaded: true,
      });
    } else {
      const group = this.form.get(this.activeDocType) as FormGroup;
      group.patchValue({
        dataUrl,
        uploaded: true,
      });
    }

    console.log(`Captured for ${this.activeDocType}:`, dataUrl);

    // Close camera
    this.showCamera = false;
    this.hint = `Captured ${this.getCameraTitle()}. Click another card to capture again.`;
    this.qualityStatus = "good";
    this.activeAdditionalDocIndex = null;
  }

  handleCameraInitError(error: any) {
    console.error("Camera init error", error);
    this.hint = "Cannot access camera. Please allow camera permission.";
  }

  // ========== QUALITY CHECK (SIMPLIFIED) ==========
  private async simpleQualityCheck(dataUrl: string): Promise<{
    status: "good" | "blurry" | "too_far" | "too_close" | "unknown";
    message: string;
  }> {
    // Simple check - you can implement more sophisticated quality analysis
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Basic checks
        if (img.width < 300 || img.height < 300) {
          resolve({
            status: "too_far",
            message: "Document is too far. Move it closer so it fills more of the frame."
          });
        } else {
          resolve({
            status: "good",
            message: "Looks good! Image captured successfully."
          });
        }
      };
      img.src = dataUrl;
    });
  }

  // ========== DOCUMENT MANAGEMENT ==========
  clearDoc(type: DocType, event: MouseEvent) {
    event.stopPropagation();
    const group = this.form.get(type) as FormGroup;
    if (!group) return;
    group.patchValue({
      dataUrl: '',
      uploaded: false,
    });
  }

  clearAdditionalDoc(index: number, event: MouseEvent) {
    event.stopPropagation();
    const docGroup = this.additionalDocumentsForms.at(index) as FormGroup;
    if (!docGroup) return;
    docGroup.patchValue({
      dataUrl: '',
      uploaded: false,
    });
  }

  // ========== ADDITIONAL DOCUMENTS ==========
  get additionalDocumentsForms() {
    return this.form.get('additionalDocuments') as FormArray;
  }

  addAdditionalDocument() {
    const additionalDocGroup = this.fb.group({
      documentName: [''],
      dataUrl: [''],
      uploaded: [false],
    });
    this.additionalDocumentsForms.push(additionalDocGroup);
  }

  removeAdditionalDocument(index: number) {
    this.additionalDocumentsForms.removeAt(index);
  }

  // ========== FORM VALIDATION & SUBMISSION ==========
  get allDocumentsValid(): boolean {
    const mainDocs = ['passport', 'residenceCard', 'healthCard', 'healthCertificate'];
    const mainDocsValid = mainDocs.some(doc => this.form.get(doc)?.get('uploaded')?.value);
    const additionalDocsValid = this.additionalDocumentsForms.controls.some(doc => doc.get('uploaded')?.value);

    return mainDocsValid || additionalDocsValid;
  }

  getUploadedDocuments(): any {
    const documents: any = {};

    // Main documents
    const mainDocs = [
      { key: 'passport', name: 'Passport' },
      { key: 'residenceCard', name: 'Residence Card' },
      { key: 'healthCard', name: 'Health Card' },
      { key: 'healthCertificate', name: 'Health Certificate' }
    ];

    mainDocs.forEach(doc => {
      const docGroup = this.form.get(doc.key) as FormGroup;
      if (docGroup.get('uploaded')?.value && docGroup.get('dataUrl')?.value) {
        documents[doc.key] = {
          name: doc.name,
          dataUrl: docGroup.get('dataUrl')?.value,
          uploaded: true
        };
      }
    });

    // Additional documents
    this.additionalDocumentsForms.controls.forEach((docGroup, index) => {
      if (docGroup.get('uploaded')?.value && docGroup.get('dataUrl')?.value) {
        const docName = docGroup.get('documentName')?.value || `Additional Document ${index + 1}`;
        documents[`additional_${index}`] = {
          name: docName,
          dataUrl: docGroup.get('dataUrl')?.value,
          uploaded: true
        };
      }
    });

    return documents;
  }

  onSubmit() {
    if (this.allDocumentsValid) {
      const documents = this.getUploadedDocuments();
      console.log('Documents ready for submission:', documents);

      // Emit event or handle submission
      this.emitDocuments(documents);
    } else {
      alert('Please capture at least one document before submitting.');
    }
  }

  private emitDocuments(documents: any) {
    // You can emit an event or call a service here
    console.log('Documents to be uploaded:', documents);

    // Example: Convert to FormData for backend upload
    const formData = new FormData();
    Object.keys(documents).forEach(key => {
      const doc = documents[key];
      if (doc.dataUrl) {
        const blob = this.dataURLtoBlob(doc.dataUrl);
        formData.append('documents', blob, `${doc.name}.jpg`);
      }
    });

    // Here you would typically call your backend service
    // this.documentService.uploadDocuments(formData).subscribe(...);
  }

  private dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}