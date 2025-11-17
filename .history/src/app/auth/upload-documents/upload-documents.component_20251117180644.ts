import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
  AbstractControl,
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

  // New data for dropdowns
  cities = [
    'Tbilisi', 'Batumi', 'Rustavi', 'Kutaisi', 'Gori', 'Poti', 'Zugdidi', 'Khashuri',
    'Kobuleti', 'Marneuli', 'Samtredia', 'Zestaponi', 'Telavi', 'Akhaltsikhe', 'Senaki',
    'Ozurgeti', 'Kaspi', 'Gardabani', 'Chiatura', 'Borjomi', 'Sagarejo', 'Kvareli',
    'Bolnisi', 'Tkibuli', 'Khoni', 'Akhalkalaki', 'Tskaltubo', 'Mtskheta', 'Gurjaani',
    'Dusheti', 'Kareli', 'Lanchkhuti', 'Akhmeta', 'Lagodekhi', 'Dedoplistsqaro',
    'Sachkhere', 'Vale', 'Tsnori', 'Terjola', 'Tetritsqaro', 'Abasha', 'Ninotsminda',
    'Martvili', 'Tsalka', 'Vani', 'Khobi', 'Dmanisi', 'Tsalenjikha', 'Baghdati', 'Oni',
    'Ambrolauri', 'Sighnaghi', 'Jvari', 'Tsageri'
  ];

  regions = [
    'Tbilisi', 'Imereti', 'Adjara', 'Kvemo Kartli', 'Samegrelo-Zemo Svaneti',
    'Kakheti', 'Shida Kartli', 'Abkhazia', 'Samtskhe-Javakheti', 'Guria',
    'Mtskheta-Mtianeti', 'Racha-Lechkhumi and Kvemo Svaneti'
  ];

  banks = [
    'TBC Bank', 'Bank of Georgia', 'Liberty Bank (Georgia)', 'Basis Bank',
    'ProCredit Bank', 'Credo Bank', 'Terabank', 'Cartu Bank', 'Halyk Bank',
    'VTB Bank of Georgia', 'PASHA Bank Georgia', 'Isbank', 'Ziraat Bank', 'Silk Road Bank'
  ];

  languages = [
    'Georgian', 'English', 'Russian', 'Turkish', 'Hindi', 'Arabic', 'Other'
  ];

  proficiencyLevels = ['Basic', 'Intermediate', 'Fluent', 'Native'];

  professionalSkills = [
    'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Email & Outlook',
    'Data Entry', 'Basic IT / Troubleshooting', 'Filing & Documentation',
    'Scheduling / Planning', 'Record Keeping', 'Office Management'
  ];

  skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // UI state
  activeSection: string = 'personal';
  allStepsCompleted = false ;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // SECTION 1: PERSONAL DETAILS
      personalDetails: this.fb.group({
        givenNameSurnameEnglish: ['', [Validators.required]],
        givenNameSurnameGeorgian: [''],
        citizenship: ['', [Validators.required]],
        documentType: ['', [Validators.required]],
        documentNumber: ['', [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        maritalStatus: ['', [Validators.required]],
        contactNumber: ['', [Validators.required]],
        emailAddress: ['', [Validators.required, Validators.email]],
        legalHomeAddress: this.fb.group({
          streetBuildingApartment: ['', [Validators.required]],
          village: [''],
          city: ['', [Validators.required]],
          region: ['', [Validators.required]]
        })
      }),

      // SECTION 2: EDUCATION
      education: this.fb.array([]),

      // SECTION 3: WORK EXPERIENCE
      workExperience: this.fb.array([]),

      // SECTION 4: LANGUAGES KNOWN
      languages: this.fb.array([]),

      // SECTION 5: SKILLS
      skills: this.fb.group({
        professionalSkills: this.fb.array([]),
        otherSkills: [''],
        skillRating: ['']
      }),

      // SECTION 6: BANK DETAILS
      bankDetails: this.fb.group({
        bank: ['', [Validators.required]],
        accountNumber: ['', [Validators.required]],
        accountHolderName: ['', [Validators.required]],
        useSameName: [false]
      }),

      // SECTION 7: EMERGENCY CONTACT
      emergencyContact: this.fb.group({
        fullName: ['', [Validators.required]],
        relationship: ['', [Validators.required]],
        address: ['', [Validators.required]],
        contactNumber: ['', [Validators.required]],
        notes: ['']
      }),

      // SECTION 8: RIGHT TO WORK IN GEORGIA
      rightToWork: this.fb.group({
        allowedToWork: ['', [Validators.required]],
        explanation: ['']
      }),

      // SECTION 9: DOCUMENT UPLOAD (your existing documents)
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

      // SECTION 10: ADDITIONAL FIELD
      additionalField: ['']
    });

    // Add initial entries for education, work experience, and languages
    this.addEducation();
    this.addWorkExperience();
    this.addLanguage();

    // Watch for form changes to update completion status
    this.form.valueChanges.subscribe(() => {
      this.checkAllStepsCompleted();
    });

    this.initOpenCv();
  }

  // Check if all steps are completed
  checkAllStepsCompleted() {
    const personalValid = this.form.get('personalDetails')?.valid;
    const educationValid = this.educationForms.length > 0 && this.educationForms.valid;
    const workValid = this.workExperienceForms.length > 0 && this.workExperienceForms.valid;
    const languagesValid = this.languageForms.length > 0 && this.languageForms.valid;
    const bankValid = this.form.get('bankDetails')?.valid;
    const emergencyValid = this.form.get('emergencyContact')?.valid;
    const rightToWorkValid = this.form.get('rightToWork')?.valid;

    // Check if at least 3 documents are uploaded
    const documents = ['passport', 'residenceCard', 'healthCard', 'drivingLicense'];
    const uploadedDocuments = documents.filter(doc => this.form.get(doc)?.get('uploaded')?.value);
    const documentsValid = uploadedDocuments.length >= 3;

    this.allStepsCompleted = personalValid && educationValid && workValid &&
      languagesValid && bankValid && emergencyValid &&
      rightToWorkValid && documentsValid;
  }

  // Navigation
  setActiveSection(section: string) {
    this.activeSection = section;
  }

  // Next button functionality
  nextSection() {
    const sections = [
      'personal', 'education', 'work', 'languages', 'skills',
      'bank', 'emergency', 'rightToWork', 'documents', 'additional'
    ];
    const currentIndex = sections.indexOf(this.activeSection);
    if (currentIndex < sections.length - 1) {
      this.activeSection = sections[currentIndex + 1];
    }
  }

  // Previous button functionality
  previousSection() {
    const sections = [
      'personal', 'education', 'work', 'languages', 'skills',
      'bank', 'emergency', 'rightToWork', 'documents', 'additional'
    ];
    const currentIndex = sections.indexOf(this.activeSection);
    if (currentIndex > 0) {
      this.activeSection = sections[currentIndex - 1];
    }
  }

  // Check if current section is valid
  isCurrentSectionValid(): boolean {
    switch (this.activeSection) {
      case 'personal':
        return this.form.get('personalDetails')?.valid || false;
      case 'education':
        return this.educationForms.valid && this.educationForms.length > 0;
      case 'work':
        return this.workExperienceForms.valid && this.workExperienceForms.length > 0;
      case 'languages':
        return this.languageForms.valid && this.languageForms.length > 0;
      case 'skills':
        return true; // Skills are optional
      case 'bank':
        return this.form.get('bankDetails')?.valid || false;
      case 'emergency':
        return this.form.get('emergencyContact')?.valid || false;
      case 'rightToWork':
        return this.form.get('rightToWork')?.valid || false;
      case 'documents':
        const documents = ['passport', 'residenceCard', 'healthCard', 'drivingLicense'];
        const uploadedDocuments = documents.filter(doc => this.form.get(doc)?.get('uploaded')?.value);
        return uploadedDocuments.length >= 3;
      case 'additional':
        return true; // Additional field is optional
      default:
        return false;
    }
  }

  // Education FormArray methods
  get educationForms() {
    return this.form.get('education') as FormArray;
  }

  addEducation() {
    const educationGroup = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      institution: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      notes: [''],
      currentlyStudying: [false]
    });
    this.educationForms.push(educationGroup);
  }

  removeEducation(index: number) {
    this.educationForms.removeAt(index);
  }

  // Work Experience FormArray methods
  get workExperienceForms() {
    return this.form.get('workExperience') as FormArray;
  }

  addWorkExperience() {
    const workGroup = this.fb.group({
      companyName: ['', [Validators.required]],
      cityCountry: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      employmentPeriodFrom: ['', [Validators.required]],
      employmentPeriodTo: ['', [Validators.required]],
      grossSalary: [''],
      reasonForLeaving: [''],
      stillWorking: [false],
      additionalNotes: ['']
    });
    this.workExperienceForms.push(workGroup);
  }

  removeWorkExperience(index: number) {
    this.workExperienceForms.removeAt(index);
  }

  // Languages FormArray methods
  get languageForms() {
    return this.form.get('languages') as FormArray;
  }

  addLanguage() {
    const languageGroup = this.fb.group({
      language: ['', [Validators.required]],
      proficiency: ['', [Validators.required]]
    });
    this.languageForms.push(languageGroup);
  }

  removeLanguage(index: number) {
    this.languageForms.removeAt(index);
  }

  // Professional Skills FormArray methods
  get professionalSkillsForms() {
    return this.form.get('skills.professionalSkills') as FormArray;
  }

  toggleProfessionalSkill(skill: string) {
    const skillsArray = this.professionalSkillsForms;
    const index = skillsArray.controls.findIndex(control => control.value === skill);

    if (index > -1) {
      skillsArray.removeAt(index);
    } else {
      skillsArray.push(this.fb.control(skill));
    }
  }

  // Use same name for bank account
  onUseSameNameChange(event: any) {
    if (event.target.checked) {
      const personalName = this.form.get('personalDetails.givenNameSurnameEnglish')?.value;
      this.form.get('bankDetails.accountHolderName')?.setValue(personalName);
    }
  }

  // Helper to get form control
  getControl(path: string): AbstractControl | null {
    return this.form.get(path);
  }

  // Check if field is invalid
  isFieldInvalid(path: string): boolean {
    const control = this.getControl(path);
    return !!(control && control.invalid && (control.dirty || control.touched));
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

    // Check if all steps are completed after document upload
    this.checkAllStepsCompleted();
  }

  handleCameraInitError(error: any) {
    console.error('Camera init error', error);
    this.hint = 'Cannot access camera. Please allow camera permission.';
  }

  // ========== Submit ==========
  onSubmit() {
    if (this.form.valid && this.allStepsCompleted) {
      console.log('Full form value:', this.form.value);
      alert('Form submitted successfully! Check console for data.');
    } else {
      alert('Please complete all required fields and upload at least 3 documents before submitting.');
    }
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

  isProfessionalSkillSelected(skill: string): boolean {
    return this.professionalSkillsForms?.controls?.some((c: any) => c.value === skill);
  }

  clearDoc(type: DocType, event: MouseEvent) {
    event.stopPropagation();

    const group = this.form.get(type) as FormGroup;
    if (!group) return;

    group.patchValue({
      dataUrl: '',
      uploaded: false,
    });

    // Update completion status
    this.checkAllStepsCompleted();
  }
}