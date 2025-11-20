import { Component } from '@angular/core';

@Component({
  selector: 'app-resubmition-docs',
  imports: [],
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

  // OpenCV (optional - for quality analysis)
  private cvReady = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // Main documents
      passport: this.fb.group({
        dataUrl: [""],
        uploaded: [false],
      }),
      residenceCard: this.fb.group({
        dataUrl: [""],
        uploaded: [false],
      }),
      healthCard: this.fb.group({
        dataUrl: [""],
        uploaded: [false],
      }),
      healthCertificate: this.fb.group({
        dataUrl: [""],
        uploaded: [false],
      }),
      additionalDocuments: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Initialize OpenCV if needed (optional)
    this.initOpenCv();
  }

  // Getter for additional documents form array
  get additionalDocumentsForms() {
    return this.form.get("additionalDocuments") as FormArray;
  }

  // Add new additional document
  addAdditionalDocument() {
    const additionalDocGroup = this.fb.group({
      documentName: ["", Validators.required],
      dataUrl: [""],
      uploaded: [false],
    });
    this.additionalDocumentsForms.push(additionalDocGroup);
  }

  // Remove additional document
  removeAdditionalDocument(index: number) {
    this.additionalDocumentsForms.removeAt(index);
  }

  // Select document type for capture
  selectDocType(type: DocType) {
    this.activeDocType = type;
    this.activeAdditionalDocIndex = null;
    this.hint = `Align your ${this.labelFor(type)} inside the frame and tap Capture.`;
    this.qualityStatus = "unknown";
    this.showCamera = true;
  }

  // Select additional document for capture
  selectAdditionalDocType(index: number) {
    this.activeDocType = "additional";
    this.activeAdditionalDocIndex = index;
    const docName = this.additionalDocumentsForms.at(index).get("documentName")?.value || `Document ${index + 1}`;
    this.hint = `Align your ${docName} inside the frame and tap Capture.`;
    this.qualityStatus = "unknown";
    this.showCamera = true;
  }

  // Close camera overlay
  onCloseCamera() {
    this.showCamera = false;
    this.qualityStatus = "unknown";
    this.hint = "Click a card to capture its document.";
    this.activeAdditionalDocIndex = null;
  }

  // Get document label
  private labelFor(type: DocType): string {
    switch (type) {
      case "passport":
        return "Passport";
      case "residenceCard":
        return "Residence Card";
      case "healthCard":
        return "Health Card";
      case "healthCertificate":
        return "Health Certificate";
      case "additional":
        return "Additional Document";
      default:
        return "Document";
    }
  }

  // Get camera title for display
  getCameraTitle(): string {
    if (this.activeDocType === "additional" && this.activeAdditionalDocIndex !== null) {
      const docName = this.additionalDocumentsForms.at(this.activeAdditionalDocIndex).get("documentName")?.value;
      return docName || `Additional Document ${this.activeAdditionalDocIndex + 1}`;
    }
    return this.activeDocType ? this.labelFor(this.activeDocType) : "Document";
  }

  // Trigger snapshot
  triggerSnapshot() {
    if (!this.activeDocType) return;
    this.snapshotTrigger.next();
  }

  // Handle captured image
  async handleImage(webcamImage: WebcamImage) {
    if (!this.activeDocType) return;

    const dataUrl = webcamImage.imageAsDataUrl;

    // Analyze quality (optional)
    const quality = await this.analyzeQuality(dataUrl);
    this.qualityStatus = quality.status;
    this.hint = quality.message;

    // If quality is not good, keep camera open for retry
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

  // Handle camera initialization error
  handleCameraInitError(error: any) {
    console.error("Camera init error", error);
    this.hint = "Cannot access camera. Please allow camera permission.";
  }

  // Clear document
  clearDoc(type: DocType, event: MouseEvent) {
    event.stopPropagation();
    const group = this.form.get(type) as FormGroup;
    if (!group) return;
    group.patchValue({
      dataUrl: "",
      uploaded: false,
    });
  }

  // Clear additional document
  clearAdditionalDoc(index: number, event: MouseEvent) {
    event.stopPropagation();
    const docGroup = this.additionalDocumentsForms.at(index) as FormGroup;
    if (!docGroup) return;
    docGroup.patchValue({
      dataUrl: "",
      uploaded: false,
    });
  }

  // Initialize OpenCV (optional - for quality analysis)
  private async initOpenCv() {
    // You can keep your OpenCV initialization logic here if needed
    // For now, we'll skip it and always return good quality
    this.cvReady = false;
  }

  // Analyze image quality (simplified version)
  private async analyzeQuality(dataUrl: string): Promise<{
    status: "good" | "blurry" | "too_far" | "too_close" | "unknown";
    message: string;
  }> {
    // Simplified quality check - always return good for now
    // You can add your OpenCV quality analysis logic here
    return {
      status: "good",
      message: "Looks good! Image captured successfully.",
    };
  }

  // Get form data for submission
  getFormData(): any {
    return this.form.value;
  }

  // Check if all required documents are uploaded
  get allRequiredDocumentsUploaded(): boolean {
    const mainDocs = ['passport', 'residenceCard', 'healthCard', 'healthCertificate'];
    const allMainDocsUploaded = mainDocs.every(doc =>
      this.form.get(doc)?.get('uploaded')?.value
    );

    const additionalDocsUploaded = this.additionalDocumentsForms.controls.every(
      doc => doc.get('uploaded')?.value
    );

    return allMainDocsUploaded && additionalDocsUploaded;
  }

  // Reset form
  resetForm(): void {
    this.form.reset({
      passport: { dataUrl: "", uploaded: false },
      residenceCard: { dataUrl: "", uploaded: false },
      healthCard: { dataUrl: "", uploaded: false },
      healthCertificate: { dataUrl: "", uploaded: false },
    });
    this.additionalDocumentsForms.clear();
  }
}