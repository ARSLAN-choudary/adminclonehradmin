import { Component, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { Subject } from "rxjs";
import { WebcamImage, WebcamModule } from "ngx-webcam";
import { BackendService } from "../../Services/backend.service"; // Adjust path as needed

type DocType =
  | "passport"
  | "residenceCard"
  | "healthCard"
  | "healthCertificate"
  | "additional";

interface DocumentStatus {
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  remarks: string;
}

interface UserApplication {
  _id: string;
  documents: {
    doc1?: DocumentStatus;
    doc2?: DocumentStatus;
    doc3?: DocumentStatus;
    doc4?: DocumentStatus;
    additional?: any[];
  };
  [key: string]: any;
}
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

  // User data
  userApplication: UserApplication | null = null;
  rejectedDocuments: any[] = [];
  isLoading = true;
  staticUserId = "691f1eb4238c5fb7c1d8039d";

  // ngx-webcam trigger
  private snapshotTrigger: Subject<void> = new Subject<void>();
  triggerObservable = this.snapshotTrigger.asObservable();

  constructor(
    private fb: FormBuilder,
    private backend: BackendService
  ) {
    this.form = this.fb.group({
      passport: this.fb.group({
        dataUrl: [''],
        uploaded: [false],
        originalStatus: [''],
        remarks: ['']
      }),
      residenceCard: this.fb.group({
        dataUrl: [''],
        uploaded: [false],
        originalStatus: [''],
        remarks: ['']
      }),
      healthCard: this.fb.group({
        dataUrl: [''],
        uploaded: [false],
        originalStatus: [''],
        remarks: ['']
      }),
      healthCertificate: this.fb.group({
        dataUrl: [''],
        uploaded: [false],
        originalStatus: [''],
        remarks: ['']
      }),
      additionalDocuments: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadUserApplication();
  }

  // ========== LOAD USER APPLICATION ==========
  loadUserApplication() {
    this.isLoading = true;
    this.backend.getApplicationById(this.staticUserId).subscribe({
      next: (apiRes: any) => {
        this.userApplication = apiRes.data;
        this.processUserDocuments();
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading user application:", err);
        this.isLoading = false;
        // Initialize with one additional document even if API fails
        this.addAdditionalDocument();
      }
    });
  }

  processUserDocuments() {
    if (!this.userApplication?.documents) return;

    const documents = this.userApplication.documents;

    // Map main documents (doc1, doc2, doc3, doc4)
    const mainDocs = [
      { key: 'doc1', formKey: 'passport', name: 'Passport' },
      { key: 'doc2', formKey: 'residenceCard', name: 'Residence Card' },
      { key: 'doc3', formKey: 'healthCard', name: 'Health Card' },
      { key: 'doc4', formKey: 'healthCertificate', name: 'Health Certificate' }
    ];

    mainDocs.forEach(doc => {
      const documentData = documents[doc.key as keyof typeof documents] as DocumentStatus;
      if (documentData) {
        const formGroup = this.form.get(doc.formKey) as FormGroup;
        formGroup.patchValue({
          originalStatus: documentData.status,
          remarks: documentData.remarks || ''
        });

        // Only add to rejected documents if status is rejected
        if (documentData.status === 'rejected') {
          this.rejectedDocuments.push({
            key: doc.formKey,
            name: doc.name,
            status: documentData.status,
            remarks: documentData.remarks,
            originalUrl: documentData.url
          });
        }
      }
    });

    // Process additional documents
    if (documents.additional && Array.isArray(documents.additional)) {
      documents.additional.forEach((doc: any, index: number) => {
        if (doc.status === 'rejected') {
          this.rejectedDocuments.push({
            key: `additional_${index}`,
            name: doc.name || `Additional Document ${index + 1}`,
            status: doc.status,
            remarks: doc.remarks,
            originalUrl: doc.url,
            isAdditional: true,
            index: index
          });

          // Add to form array
          this.addAdditionalDocumentWithData(doc, index);
        }
      });
    }

    // If no rejected documents found, add one empty additional document
    if (this.additionalDocumentsForms.length === 0) {
      this.addAdditionalDocument();
    }

    console.log('Rejected documents:', this.rejectedDocuments);
  }

  // ========== DOCUMENT TYPE SELECTION ==========
  selectDocType(type: DocType) {
    // Check if this document is rejected and can be updated
    const isRejected = this.rejectedDocuments.some(doc => doc.key === type);
    if (!isRejected) {
      this.hint = "This document is already approved and cannot be updated.";
      return;
    }

    this.activeDocType = type;
    this.activeAdditionalDocIndex = null;
    this.hint = `Align your ${this.labelFor(type)} inside the frame and tap Capture.`;
    this.qualityStatus = "unknown";
    this.showCamera = true;
  }

  selectAdditionalDocType(index: number) {
    const docKey = `additional_${index}`;
    const isRejected = this.rejectedDocuments.some(doc => doc.key === docKey);
    if (!isRejected) {
      this.hint = "This document is already approved and cannot be updated.";
      return;
    }

    this.activeDocType = "additional";
    this.activeAdditionalDocIndex = index;
    const docName = this.additionalDocumentsForms.at(index).get('documentName')?.value || `Additional Document ${index + 1}`;
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

    // Simple quality check
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

  // ========== QUALITY CHECK ==========
  private async simpleQualityCheck(dataUrl: string): Promise<{
    status: "good" | "blurry" | "too_far" | "too_close" | "unknown";
    message: string;
  }> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
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
      originalStatus: [''],
      remarks: ['']
    });
    this.additionalDocumentsForms.push(additionalDocGroup);
  }

  addAdditionalDocumentWithData(docData: any, index: number) {
    const additionalDocGroup = this.fb.group({
      documentName: [docData.name || `Additional Document ${index + 1}`],
      dataUrl: [''],
      uploaded: [false],
      originalStatus: [docData.status],
      remarks: [docData.remarks || '']
    });
    this.additionalDocumentsForms.push(additionalDocGroup);
  }

  removeAdditionalDocument(index: number) {
    this.additionalDocumentsForms.removeAt(index);
  }

  // ========== HELPER METHODS ==========
  isDocumentRejected(docType: DocType): boolean {
    return this.rejectedDocuments.some(doc => doc.key === docType);
  }

  isAdditionalDocumentRejected(index: number): boolean {
    const docKey = `additional_${index}`;
    return this.rejectedDocuments.some(doc => doc.key === docKey);
  }

  getRejectedDocumentRemarks(docType: DocType): string {
    const doc = this.rejectedDocuments.find(d => d.key === docType);
    return doc?.remarks || '';
  }

  getAdditionalDocumentRemarks(index: number): string {
    const docKey = `additional_${index}`;
    const doc = this.rejectedDocuments.find(d => d.key === docKey);
    return doc?.remarks || '';
  }

  // ========== FORM VALIDATION & SUBMISSION ==========
  get hasRejectedDocuments(): boolean {
    return this.rejectedDocuments.length > 0;
  }

  get hasUpdatedDocuments(): boolean {
    const mainDocs = ['passport', 'residenceCard', 'healthCard', 'healthCertificate'];
    const mainDocsUpdated = mainDocs.some(doc =>
      this.form.get(doc)?.get('uploaded')?.value &&
      this.isDocumentRejected(doc as DocType)
    );

    const additionalDocsUpdated = this.additionalDocumentsForms.controls.some((doc, index) =>
      doc.get('uploaded')?.value &&
      this.isAdditionalDocumentRejected(index)
    );

    return mainDocsUpdated || additionalDocsUpdated;
  }

  getUpdatedDocuments(): any {
    const updatedDocs: any = {};

    // Main documents
    const mainDocs = [
      { key: 'passport', apiKey: 'doc1' },
      { key: 'residenceCard', apiKey: 'doc2' },
      { key: 'healthCard', apiKey: 'doc3' },
      { key: 'healthCertificate', apiKey: 'doc4' }
    ];

    mainDocs.forEach(doc => {
      const docGroup = this.form.get(doc.key) as FormGroup;
      if (docGroup.get('uploaded')?.value && docGroup.get('dataUrl')?.value && this.isDocumentRejected(doc.key as DocType)) {
        updatedDocs[doc.apiKey] = {
          dataUrl: docGroup.get('dataUrl')?.value,
          name: this.labelFor(doc.key as DocType)
        };
      }
    });

    // Additional documents
    this.additionalDocumentsForms.controls.forEach((docGroup, index) => {
      if (docGroup.get('uploaded')?.value && docGroup.get('dataUrl')?.value && this.isAdditionalDocumentRejected(index)) {
        const docName = docGroup.get('documentName')?.value || `Additional Document ${index + 1}`;
        updatedDocs[`additional_${index}`] = {
          dataUrl: docGroup.get('dataUrl')?.value,
          name: docName
        };
      }
    });

    return updatedDocs;
  }

  onSubmit() {
    if (this.hasUpdatedDocuments) {
      const updatedDocuments = this.getUpdatedDocuments();
      console.log('Documents to be updated:', updatedDocuments);

      // Prepare FormData for backend upload
      const formData = new FormData();
      formData.append('applicationId', this.staticUserId);

      Object.keys(updatedDocuments).forEach(key => {
        const doc = updatedDocuments[key];
        if (doc.dataUrl) {
          const blob = this.dataURLtoBlob(doc.dataUrl);
          formData.append('file', blob, `${doc.name}.jpg`);
          formData.append('documentKey', key); // Send which documents are being updated
        }
      });

      // Call your backend API to update documents
      this.backend.updateApplicationDocuments(formData).subscribe({
        next: (response: any) => {
          console.log('Documents updated successfully:', response);
          alert('Documents updated successfully!');
          // Reload the application to get updated status
          this.loadUserApplication();
        },
        error: (error: any) => {
          console.error('Error updating documents:', error);
          alert('Error updating documents. Please try again.');
        }
      });

    } else {
      alert('Please capture at least one rejected document before submitting.');
    }
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