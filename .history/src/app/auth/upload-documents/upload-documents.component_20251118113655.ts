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
import { SelectModule } from "primeng/select";
import { Subject } from 'rxjs';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { BackendService } from '../../Services/backend.service';

// OpenCV.js
import cvModule from '@techstark/opencv-js';

type DocType = 'passport' | 'residenceCard' | 'healthCard' | 'drivingLicense';

@Component({
  selector: 'app-upload-documents',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WebcamModule, SelectModule],
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss'],
})
export class UploadDocumentsComponent {
  form: FormGroup;

  activeDocType: DocType | null = null;
  showCamera = false;
  hint = 'Click a card to capture its document.';
  qualityStatus: 'unknown' | 'good' | 'blurry' | 'too_far' | 'too_close' = 'unknown';

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

  // Data for dropdowns with default values
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

  constructor(private fb: FormBuilder, private backend: BackendService) {
    this.form = this.fb.group({

      personalDetails: this.fb.group({
        givenNameSurnameEnglish: ['', [Validators.required]],
        givenNameSurnameGeorgian: [''],
        citizenship: ['georgian', [Validators.required]],
        documentType: ['georgianId', [Validators.required]],
        documentNumber: ['', [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        gender: ['male', [Validators.required]],
        maritalStatus: ['single', [Validators.required]],
        contactNumber: ['', [Validators.required]],
        emailAddress: ['', [Validators.required, Validators.email]],
        legalHomeAddress: this.fb.group({
          streetBuildingApartment: ['', [Validators.required]],
          village: [''],
          city: ['Tbilisi', [Validators.required]],
          region: ['Tbilisi', [Validators.required]]
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
        skillRating: ['Intermediate']
      }),

      // SECTION 6: BANK DETAILS
      bankDetails: this.fb.group({
        bank: ['TBC Bank', [Validators.required]],
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
        allowedToWork: ['yes', [Validators.required]],
        explanation: ['']
      }),

      // SECTION 9: DOCUMENT UPLOAD
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

    // Add initial entries
    this.addEducation();
    this.addWorkExperience();
    this.addLanguage();

    // Initialize OpenCV
    this.initOpenCv();
  }

  // --------- OpenCV init ----------
  private async initOpenCv() {
    try {
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
    } catch (error) {
      console.error('Failed to initialize OpenCV:', error);
      this.cvReady = false;
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

  // Getter for personal details form group
  get personalDetails(): FormGroup {
    return this.form.get('personalDetails') as FormGroup;
  }

  // Getter for legal home address form group
  get legalHomeAddress(): FormGroup {
    return this.personalDetails.get('legalHomeAddress') as FormGroup;
  }

  // Getter for skills form group
  get skills(): FormGroup {
    return this.form.get('skills') as FormGroup;
  }

  // Getter for bank details form group
  get bankDetails(): FormGroup {
    return this.form.get('bankDetails') as FormGroup;
  }

  // Getter for emergency contact form group
  get emergencyContact(): FormGroup {
    return this.form.get('emergencyContact') as FormGroup;
  }

  // Getter for right to work form group
  get rightToWork(): FormGroup {
    return this.form.get('rightToWork') as FormGroup;
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
      language: ['English', [Validators.required]],
      proficiency: ['Intermediate', [Validators.required]]
    });
    this.languageForms.push(languageGroup);
  }

  removeLanguage(index: number) {
    this.languageForms.removeAt(index);
  }

  // Professional Skills FormArray methods
  get professionalSkillsForms() {
    return this.skills.get('professionalSkills') as FormArray;
  }
<div class="main-doc-container">
    <form class="doc-upload-container" [formGroup]="form" (ngSubmit)="onSubmit()">

        <!-- SECTION 1: PERSONAL DETAILS -->
        <div class="form-section" formGroupName="personalDetails">
            <h2>SECTION 1: PERSONAL DETAILS</h2>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Given Name, Surname (English) *</label>
                        <input type="text" class="form-control" formControlName="givenNameSurnameEnglish"
                            placeholder="Enter your full name in English">
                        <div class="text-danger mt-1"
                            *ngIf="personalDetails.get('givenNameSurnameEnglish')?.invalid && personalDetails.get('givenNameSurnameEnglish')?.touched">
                            This field is required
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Given Name, Surname (Georgian)</label>
                        <input type="text" class="form-control" formControlName="givenNameSurnameGeorgian"
                            placeholder="Enter your full name in Georgian">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <span class="form-label">Citizenship *</span>
                        <div class="radio-wrap">
                            <div class="d-flex flex-wrap">
                                <div class="me-2">
                                    <input type="radio" class="status-radio" id="georgian" value="georgian" 
                                        formControlName="citizenship" />
                                    <label for="georgian">Georgian</label>
                                </div>
                                <div>
                                    <input type="radio" class="status-radio" id="other" value="other" 
                                        formControlName="citizenship" />
                                    <label for="other">Other</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <span class="form-label">Document Type *</span>
                        <p-select appSelectFilterId [options]="[
                            {label: 'Georgian ID Card', value: 'georgianId'},
                            {label: 'Residence Permit', value: 'residencePermit'},
                            {label: 'Passport', value: 'passport'}
                        ]" optionLabel="label" optionValue="value" placeholder="Select" [filter]="true" 
                        class="form-control" formControlName="documentType" id="documentType"
                        (onShow)="labelFilterInput('documentType-filter')"></p-select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Document Number *</label>
                        <input type="text" class="form-control" formControlName="documentNumber" 
                            placeholder="Enter document number">
                        <div class="text-danger mt-1"
                            *ngIf="personalDetails.get('documentNumber')?.invalid && personalDetails.get('documentNumber')?.touched">
                            This field is required
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Date of Birth *</label>
                        <input type="date" class="form-control" formControlName="dateOfBirth">
                        <div class="text-danger mt-1"
                            *ngIf="personalDetails.get('dateOfBirth')?.invalid && personalDetails.get('dateOfBirth')?.touched">
                            This field is required
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <span class="form-label">Gender *</span>
                        <div class="radio-wrap">
                            <div class="d-flex flex-wrap">
                                <div class="me-2">
                                    <input type="radio" class="status-radio" id="male" name="gender" 
                                        formControlName="gender" value="male" />
                                    <label for="male">Male</label>
                                </div>
                                <div>
                                    <input type="radio" class="status-radio" id="female" name="gender" 
                                        formControlName="gender" value="female" />
                                    <label for="female">Female</label>
                                </div>
                            </div>
                        </div>
                        <div class="text-danger mt-1"
                            *ngIf="personalDetails.get('gender')?.invalid && personalDetails.get('gender')?.touched">
                            This field is required
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <span class="form-label">Marital Status *</span>
                        <div class="radio-wrap">
                            <div class="d-flex flex-wrap">
                                <div class="me-2">
                                    <input type="radio" class="status-radio" id="single" name="maritalStatus" 
                                        formControlName="maritalStatus" value="single" />
                                    <label for="single">Single</label>
                                </div>
                                <div class="me-2">
                                    <input type="radio" class="status-radio" id="married" name="maritalStatus" 
                                        formControlName="maritalStatus" value="married" />
                                    <label for="married">Married</label>
                                </div>
                                <div class="me-2">
                                    <input type="radio" class="status-radio" id="divorced" name="maritalStatus" 
                                        formControlName="maritalStatus" value="divorced" />
                                    <label for="divorced">Divorced</label>
                                </div>
                                <div>
                                    <input type="radio" class="status-radio" id="widowed" name="maritalStatus" 
                                        formControlName="maritalStatus" value="widowed" />
                                    <label for="widowed">Widowed</label>
                                </div>
                            </div>
                        </div>
                        <div class="text-danger mt-1"
                            *ngIf="personalDetails.get('maritalStatus')?.invalid && personalDetails.get('maritalStatus')?.touched">
                            This field is required
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Contact Number *</label>
                        <input type="number" class="form-control" formControlName="contactNumber" 
                            placeholder="+995 555 12 34 56">
                        <div class="text-danger mt-1"
                            *ngIf="personalDetails.get('contactNumber')?.invalid && personalDetails.get('contactNumber')?.touched">
                            This field is required
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Email Address *</label>
                        <input type="email" class="form-control" formControlName="emailAddress" 
                            placeholder="your.email@example.com">
                        <div class="text-danger mt-1"
                            *ngIf="personalDetails.get('emailAddress')?.invalid && personalDetails.get('emailAddress')?.touched">
                            <span *ngIf="personalDetails.get('emailAddress')?.errors?.['required']">This field is required</span>
                            <span *ngIf="personalDetails.get('emailAddress')?.errors?.['email']">Please enter a valid email</span>
                        </div>
                    </div>
                </div>
            </div>

            <div formGroupName="legalHomeAddress" class="address-group">
                <h3>Legal Home Address</h3>

                <div class="mb-3">
                    <label class="form-label">Street / Building / Apartment *</label>
                    <input type="text" class="form-control" formControlName="streetBuildingApartment" 
                        placeholder="Enter your street address">
                    <div class="text-danger mt-1"
                        *ngIf="legalHomeAddress.get('streetBuildingApartment')?.invalid && legalHomeAddress.get('streetBuildingApartment')?.touched">
                        This field is required
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Village (Optional)</label>
                    <input type="text" class="form-control" formControlName="village" 
                        placeholder="Enter village name if applicable">
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <span class="form-label">City *</span>
                            <p-select appSelectFilterId [options]="cities.map(city => ({label: city, value: city}))" 
                                optionLabel="label" optionValue="value" placeholder="Select" [filter]="true" 
                                class="form-control" formControlName="city" id="city"
                                (onShow)="labelFilterInput('city-filter')"></p-select>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="mb-3">
                            <span class="form-label">Region *</span>
                            <p-select appSelectFilterId [options]="regions.map(region => ({label: region, value: region}))" 
                                optionLabel="label" optionValue="value" placeholder="Select" [filter]="true" 
                                class="form-control" formControlName="region" id="region"
                                (onShow)="labelFilterInput('region-filter')"></p-select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 2: EDUCATION -->
        <div class="form-section">
            <h2>SECTION 2: EDUCATION</h2>

            <div formArrayName="education" *ngFor="let education of educationForms.controls; let i = index">
                <div [formGroupName]="i" class="education-item mb-4 p-3 border rounded">
                    <h3>Education {{i + 1}}</h3>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">From (MM/YYYY) *</label>
                                <input type="month" class="form-control" formControlName="from">
                                <div class="text-danger mt-1"
                                    *ngIf="education.get('from')?.invalid && education.get('from')?.touched">
                                    This field is required
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">To (MM/YYYY) *</label>
                                <input type="month" class="form-control" formControlName="to">
                                <div class="text-danger mt-1"
                                    *ngIf="education.get('to')?.invalid && education.get('to')?.touched">
                                    This field is required
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Institution *</label>
                        <input type="text" class="form-control" formControlName="institution" 
                            placeholder="School / College / University">
                        <div class="text-danger mt-1"
                            *ngIf="education.get('institution')?.invalid && education.get('institution')?.touched">
                            This field is required
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Qualification / Degree *</label>
                        <input type="text" class="form-control" formControlName="qualification" 
                            placeholder="Degree or qualification earned">
                        <div class="text-danger mt-1"
                            *ngIf="education.get('qualification')?.invalid && education.get('qualification')?.touched">
                            This field is required
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Notes (Optional)</label>
                        <input type="text" class="form-control" formControlName="notes" 
                            placeholder="Additional notes">
                    </div>

                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" formControlName="currentlyStudying" 
                                id="currentlyStudying{{i}}">
                            <label class="form-check-label" for="currentlyStudying{{i}}">
                                Currently Studying here
                            </label>
                        </div>
                    </div>

                    <button type="button" class="btn btn-outline-danger btn-sm" (click)="removeEducation(i)"
                        *ngIf="educationForms.length > 1">
                        Remove Education
                    </button>
                </div>
            </div>

            <button type="button" class="btn btn-outline-primary" (click)="addEducation()">
                + Add Another Education
            </button>
        </div>

        <!-- SECTION 3: WORK EXPERIENCE -->
        <div class="form-section">
            <h2>SECTION 3: WORK EXPERIENCE</h2>

            <div formArrayName="workExperience" *ngFor="let work of workExperienceForms.controls; let i = index">
                <div [formGroupName]="i" class="work-item mb-4 p-3 border rounded">
                    <h3>Work Experience {{i + 1}}</h3>

                    <div class="mb-3">
                        <label class="form-label">Company Name *</label>
                        <input type="text" class="form-control" formControlName="companyName" 
                            placeholder="Enter company name">
                        <div class="text-danger mt-1"
                            *ngIf="work.get('companyName')?.invalid && work.get('companyName')?.touched">
                            This field is required
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">City, Country *</label>
                        <input type="text" class="form-control" formControlName="cityCountry" 
                            placeholder="e.g., Tbilisi, Georgia">
                        <div class="text-danger mt-1"
                            *ngIf="work.get('cityCountry')?.invalid && work.get('cityCountry')?.touched">
                            This field is required
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Job Title / Position *</label>
                        <input type="text" class="form-control" formControlName="jobTitle" 
                            placeholder="Your job title">
                        <div class="text-danger mt-1"
                            *ngIf="work.get('jobTitle')?.invalid && work.get('jobTitle')?.touched">
                            This field is required
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Employment Period From *</label>
                                <input type="month" class="form-control" formControlName="employmentPeriodFrom">
                                <div class="text-danger mt-1"
                                    *ngIf="work.get('employmentPeriodFrom')?.invalid && work.get('employmentPeriodFrom')?.touched">
                                    This field is required
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Employment Period To *</label>
                                <input type="month" class="form-control" formControlName="employmentPeriodTo">
                                <div class="text-danger mt-1"
                                    *ngIf="work.get('employmentPeriodTo')?.invalid && work.get('employmentPeriodTo')?.touched">
                                    This field is required
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Gross Salary (Optional)</label>
                        <input type="number" class="form-control" formControlName="grossSalary" 
                            placeholder="Monthly gross salary">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Reason for Leaving</label>
                        <input type="text" class="form-control" formControlName="reasonForLeaving"
                            placeholder="Reason for leaving this position">
                    </div>

                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" formControlName="stillWorking" 
                                id="stillWorking{{i}}">
                            <label class="form-check-label" for="stillWorking{{i}}">
                                I currently work here
                            </label>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Additional Notes</label>
                        <textarea class="form-control" formControlName="additionalNotes"
                            placeholder="Any additional information about this role" rows="3"></textarea>
                    </div>

                    <button type="button" class="btn btn-outline-danger btn-sm" (click)="removeWorkExperience(i)"
                        *ngIf="workExperienceForms.length > 1">
                        Remove Experience
                    </button>
                </div>
            </div>

            <button type="button" class="btn btn-outline-primary" (click)="addWorkExperience()">
                + Add Another Work Experience
            </button>
        </div>

        <!-- SECTION 4: LANGUAGES KNOWN -->
        <div class="form-section">
            <h2>SECTION 4: LANGUAGES KNOWN</h2>

            <div formArrayName="languages" *ngFor="let language of languageForms.controls; let i = index">
                <div [formGroupName]="i" class="language-item mb-3 p-3 border rounded">
                    <h3>Language {{i + 1}}</h3>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <span class="form-label">Language *</span>
                                <p-select appSelectFilterId [options]="languages.map(lang => ({label: lang, value: lang}))" 
                                    optionLabel="label" optionValue="value" placeholder="Select" [filter]="true" 
                                    class="form-control" formControlName="language" id="language{{i}}"
                                    (onShow)="labelFilterInput('language-filter')"></p-select>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3">
                                <span class="form-label">Proficiency Level *</span>
                                <p-select appSelectFilterId [options]="proficiencyLevels.map(level => ({label: level, value: level}))" 
                                    optionLabel="label" optionValue="value" placeholder="Select" [filter]="true" 
                                    class="form-control" formControlName="proficiency" id="proficiency{{i}}"
                                    (onShow)="labelFilterInput('proficiency-filter')"></p-select>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="btn btn-outline-danger btn-sm" (click)="removeLanguage(i)"
                        *ngIf="languageForms.length > 1">
                        Remove Language
                    </button>
                </div>
            </div>

            <button type="button" class="btn btn-outline-primary" (click)="addLanguage()">
                + Add Another Language
            </button>
        </div>

        <!-- SECTION 5: SKILLS -->
        <div class="form-section" formGroupName="skills">
            <h2>SECTION 5: SKILLS</h2>

            <div>
                <h3>A. PROFESSIONAL / TECHNICAL SKILLS</h3>
                <p class="section-description">Select all skills that apply to you:</p>

                <div class="row">
                    <div *ngFor="let skill of professionalSkills" class="col-md-6 mb-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" [id]="'skill-' + skill" 
                                (change)="toggleProfessionalSkill(skill)" [checked]="isProfessionalSkillSelected(skill)">
                            <label class="form-check-label" [for]="'skill-' + skill">{{skill}}</label>
                        </div>
                    </div>
                </div>

                <h3 class="mt-4">B. OTHER SKILLS</h3>
                <div class="mb-3">
                    <label class="form-label">Your skills:</label>
                    <textarea class="form-control" formControlName="otherSkills"
                        placeholder="List any additional skills you have..." rows="3"></textarea>
                </div>

                <h3>C. RATING YOUR SKILLS (Optional)</h3>
                <div class="mb-3">
                    <span class="form-label">Rate your overall skill level:</span>
                    <div class="radio-wrap">
                        <div class="d-flex flex-wrap">
                            <label *ngFor="let level of skillLevels" class="me-3">
                                <input type="radio" class="status-radio" name="skillRating" 
                                    formControlName="skillRating" [value]="level" [id]="'skillRating-' + level">
                                {{level}}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 6: BANK DETAILS -->
        <div class="form-section" formGroupName="bankDetails">
            <h2>SECTION 6: BANK DETAILS</h2>

            <div>
                <div class="mb-3">
                    <span class="form-label">Select Your Bank *</span>
                    <p-select appSelectFilterId [options]="banks.map(bank => ({label: bank, value: bank}))" 
                        optionLabel="label" optionValue="value" placeholder="Select" [filter]="true" 
                        class="form-control" formControlName="bank" id="bank"
                        (onShow)="labelFilterInput('bank-filter')"></p-select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Account Number (IBAN) *</label>
                    <input type="text" class="form-control" formControlName="accountNumber" 
                        placeholder="GE__ ____ ____ ____ ____">
                    <small class="form-text text-muted">Format: GE00 TBBC 0000 0000 0000 0000</small>
                    <div class="text-danger mt-1"
                        *ngIf="bankDetails.get('accountNumber')?.invalid && bankDetails.get('accountNumber')?.touched">
                        This field is required
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Account Holder Name *</label>
                    <input type="text" class="form-control" formControlName="accountHolderName"
                        placeholder="Name as it appears on bank account">
                    <div class="text-danger mt-1"
                        *ngIf="bankDetails.get('accountHolderName')?.invalid && bankDetails.get('accountHolderName')?.touched">
                        This field is required
                    </div>
                </div>

                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" formControlName="useSameName" 
                            (change)="onUseSameNameChange($event)" id="useSameName">
                        <label class="form-check-label" for="useSameName">
                            Use same name as personal details
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 7: EMERGENCY CONTACT -->
        <div class="form-section" formGroupName="emergencyContact">
            <h2>SECTION 7: EMERGENCY CONTACT</h2>

            <div>
                <div class="mb-3">
                    <label class="form-label">Full Name *</label>
                    <input type="text" class="form-control" formControlName="fullName" 
                        placeholder="Emergency contact full name">
                    <div class="text-danger mt-1"
                        *ngIf="emergencyContact.get('fullName')?.invalid && emergencyContact.get('fullName')?.touched">
                        This field is required
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Relationship *</label>
                    <input type="text" class="form-control" formControlName="relationship"
                        placeholder="e.g., Spouse, Parent, Sibling, Friend">
                    <div class="text-danger mt-1"
                        *ngIf="emergencyContact.get('relationship')?.invalid && emergencyContact.get('relationship')?.touched">
                        This field is required
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Address *</label>
                    <input type="text" class="form-control" formControlName="address" 
                        placeholder="Emergency contact address">
                    <div class="text-danger mt-1"
                        *ngIf="emergencyContact.get('address')?.invalid && emergencyContact.get('address')?.touched">
                        This field is required
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Contact Number *</label>
                    <input type="number" class="form-control" formControlName="contactNumber" 
                        placeholder="Emergency contact phone number">
                    <div class="text-danger mt-1"
                        *ngIf="emergencyContact.get('contactNumber')?.invalid && emergencyContact.get('contactNumber')?.touched">
                        This field is required
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Notes (Optional)</label>
                    <input type="text" class="form-control" formControlName="notes" 
                        placeholder="Any additional information">
                </div>
            </div>
        </div>

        <!-- SECTION 8: RIGHT TO WORK IN GEORGIA -->
        <div class="form-section" formGroupName="rightToWork">
            <h2>SECTION 8: RIGHT TO WORK IN GEORGIA</h2>
            <p class="section-description">For non-Georgian citizens only</p>

            <div>
                <div class="mb-3">
                    <span class="form-label">Are you legally allowed to work in Georgia? *</span>
                    <div class="radio-wrap">
                        <div class="d-flex flex-wrap">
                            <div class="me-2">
                                <input type="radio" class="status-radio" id="allowedYes" name="allowedToWork" 
                                    formControlName="allowedToWork" value="yes" />
                                <label for="allowedYes">Yes</label>
                            </div>
                            <div>
                                <input type="radio" class="status-radio" id="allowedNo" name="allowedToWork" 
                                    formControlName="allowedToWork" value="no" />
                                <label for="allowedNo">No</label>
                            </div>
                        </div>
                    </div>
                    <div class="text-danger mt-1"
                        *ngIf="rightToWork.get('allowedToWork')?.invalid && rightToWork.get('allowedToWork')?.touched">
                        This field is required
                    </div>
                </div>

                <div class="conditional-field" *ngIf="rightToWork.get('allowedToWork')?.value === 'no'">
                    <div class="mb-3">
                        <label class="form-label">If No, please explain:</label>
                        <input type="text" class="form-control" formControlName="explanation" 
                            placeholder="Please provide explanation...">
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 9: DOCUMENT UPLOAD -->
        <div class="form-section">
            <h2>SECTION 9: DOCUMENT UPLOAD</h2>
            <p class="section-description">Capture clear images of your documents using your camera</p>

            <div *ngIf="!showCamera">
                <div class="row">
                    <!-- Passport -->
                    <div class="col-md-6 mb-3">
                        <div class="doc-card card" [class.active]="activeDocType === 'passport'"
                            (click)="selectDocType('passport')">
                            <div class="card-body">
                                <h3>Passport</h3>
                                <p>
                                    Status:
                                    <span [class.text-success]="form.get('passport.uploaded')?.value"
                                        [class.text-warning]="!form.get('passport.uploaded')?.value">
                                        {{ form.get('passport.uploaded')?.value ? 'Captured' : 'Not captured' }}
                                    </span>
                                </p>
                                <div class="doc-image-wrapper" *ngIf="form.get('passport.dataUrl')?.value as img">
                                    <img [src]="img" alt="Passport preview" class="doc-image img-fluid rounded" />
                                    <button type="button" class="doc-image-remove btn btn-danger btn-sm" 
                                        (click)="clearDoc('passport', $event)">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Residence Card -->
                    <div class="col-md-6 mb-3">
                        <div class="doc-card card" [class.active]="activeDocType === 'residenceCard'"
                            (click)="selectDocType('residenceCard')">
                            <div class="card-body">
                                <h3>Residence Card</h3>
                                <p>
                                    Status:
                                    <span [class.text-success]="form.get('residenceCard.uploaded')?.value"
                                        [class.text-warning]="!form.get('residenceCard.uploaded')?.value">
                                        {{ form.get('residenceCard.uploaded')?.value ? 'Captured' : 'Not captured' }}
                                    </span>
                                </p>
                                <div class="doc-image-wrapper" *ngIf="form.get('residenceCard.dataUrl')?.value as img">
                                    <img [src]="img" alt="Residence card preview" class="doc-image img-fluid rounded" />
                                    <button type="button" class="doc-image-remove btn btn-danger btn-sm" 
                                        (click)="clearDoc('residenceCard', $event)">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Health Card -->
                    <div class="col-md-6 mb-3">
                        <div class="doc-card card" [class.active]="activeDocType === 'healthCard'"
                            (click)="selectDocType('healthCard')">
                            <div class="card-body">
                                <h3>Health Card</h3>
                                <p>
                                    Status:
                                    <span [class.text-success]="form.get('healthCard.uploaded')?.value"
                                        [class.text-warning]="!form.get('healthCard.uploaded')?.value">
                                        {{ form.get('healthCard.uploaded')?.value ? 'Captured' : 'Not captured' }}
                                    </span>
                                </p>
                                <div class="doc-image-wrapper" *ngIf="form.get('healthCard.dataUrl')?.value as img">
                                    <img [src]="img" alt="Health card preview" class="doc-image img-fluid rounded" />
                                    <button type="button" class="doc-image-remove btn btn-danger btn-sm" 
                                        (click)="clearDoc('healthCard', $event)">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Driving License -->
                    <div class="col-md-6 mb-3">
                        <div class="doc-card card" [class.active]="activeDocType === 'drivingLicense'"
                            (click)="selectDocType('drivingLicense')">
                            <div class="card-body">
                                <h3>Driving License</h3>
                                <p>
                                    Status:
                                    <span [class.text-success]="form.get('drivingLicense.uploaded')?.value"
                                        [class.text-warning]="!form.get('drivingLicense.uploaded')?.value">
                                        {{ form.get('drivingLicense.uploaded')?.value ? 'Captured' : 'Not captured' }}
                                    </span>
                                </p>
                                <div class="doc-image-wrapper" *ngIf="form.get('drivingLicense.dataUrl')?.value as img">
                                    <img [src]="img" alt="Driving license preview" class="doc-image img-fluid rounded" />
                                    <button type="button" class="doc-image-remove btn btn-danger btn-sm" 
                                        (click)="clearDoc('drivingLicense', $event)">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="hint text-muted">
                    {{ hint }}
                </p>
            </div>

            <!-- Camera overlay -->
            <div class="camera-overlay" *ngIf="showCamera">
                <div class="camera-header">
                    <div class="camera-title">
                        {{ activeDocType ? labelFor(activeDocType) : 'Document' }}
                    </div>
                    <button type="button" class="camera-close btn-close" (click)="onCloseCamera()"></button>
                </div>

                <div class="camera-content">
                    <div class="camera-box">
                        <webcam [trigger]="triggerObservable" (imageCapture)="handleImage($event)"
                            (initError)="handleCameraInitError($event)"></webcam>
                    </div>

                    <div class="camera-hint-pill alert alert-info">
                        {{ hint }}
                    </div>

                    <div class="camera-actions">
                        <button type="button" class="btn btn-outline-secondary" (click)="onCloseCamera()">
                            Cancel
                        </button>
                        <button type="button" class="btn btn-primary" (click)="triggerSnapshot()">
                            Capture {{ activeDocType ? '(' + labelFor(activeDocType) + ')' : '' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 10: ADDITIONAL FIELD -->
        <div class="form-section">
            <h2>SECTION 10: ADDITIONAL FIELD (OPTIONAL)</h2>
            <p class="section-description">Share any additional information you'd like us to know</p>

            <div class="mb-3">
                <textarea class="form-control" formControlName="additionalField" rows="4"
                    placeholder="Write anything additional you want to share about your experience, skills, or anything else relevant to your application..."></textarea>
            </div>
        </div>

        <!-- Submit Button -->
        <div class="submit-section text-end">
            <button type="submit" class="btn btn-primary btn-lg">
                Submit Application
            </button>
        </div>
    </form>
</div>
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
      const personalName = this.personalDetails.get('givenNameSurnameEnglish')?.value;
      this.bankDetails.get('accountHolderName')?.setValue(personalName);
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

  // Get userId from localStorage
  private getUserId(): string {
    try {
      // Try different possible keys for userId in localStorage
      const userId = localStorage.getItem('userId') ||
        localStorage.getItem('user_id') ||
        localStorage.getItem('id') ||
        localStorage.getItem('_id');

      if (userId) {
        console.log('Found userId in localStorage:', userId);
        return userId;
      } else {
        console.warn('No userId found in localStorage. Available keys:', Object.keys(localStorage));
        return '';
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return '';
    }
  }

  // Convert form data to match backend schema
  private transformFormData(formValue: any): any {
    const personal = formValue.personalDetails;
    const [userNameEnglish, surnameEnglish] = personal.givenNameSurnameEnglish.split(' ').filter(Boolean);
    const [userNameGeorgian, surnameGeorgian] = personal.givenNameSurnameGeorgian.split(' ').filter(Boolean);

    return {
      // User ID from localStorage
      userId: this.getUserId(),

      // Personal Details
      userNameEnglish: userNameEnglish || '',
      surnameEnglish: surnameEnglish || '',
      userNameGeorgian: userNameGeorgian || '',
      surnameGeorgian: surnameGeorgian || '',
      documentType: personal.documentType,
      documentNumber: parseInt(personal.documentNumber) || 0,
      email: personal.emailAddress,
      phone: personal.contactNumber.toString(), // Convert to String
      location: `${personal.legalHomeAddress.city}, ${personal.legalHomeAddress.region}`,
      dateOfBirth: personal.dateOfBirth,
      gender: personal.gender,
      martialStatus: personal.maritalStatus,
      legalAdress: personal.legalHomeAddress.streetBuildingApartment,
      position: '', // You might want to add this field to your form
      citizenship: personal.citizenship, // Include citizenship in payload

      // Education
      education: formValue.education.map((edu: any) => ({
        from: edu.from,
        to: edu.to,
        institution: edu.institution,
        qualification: edu.qualification,
        notes: edu.notes,
        currentlyStudying: edu.currentlyStudying
      })),

      // Work Experience
      workExperience: formValue.workExperience.map((work: any) => ({
        companyName: work.companyName,
        cityCountry: work.cityCountry,
        jobTitle: work.jobTitle,
        from: work.employmentPeriodFrom,
        to: work.employmentPeriodTo,
        stillWorking: work.stillWorking,
        grossSalary: work.grossSalary.toString(), // Convert to String
        reasonForLeaving: work.reasonForLeaving,
        notes: work.additionalNotes
      })),

      // Languages
      languages: formValue.languages.map((lang: any) => ({
        language: lang.language,
        level: lang.proficiency
      })),

      // Skills
      computerSkills: formValue.skills.professionalSkills || [],
      administrativeSkills: [], // You might want to add this field to your form
      otherSkills: formValue.skills.otherSkills,
      skillRating: formValue.skills.skillRating,

      // Bank Details
      bankName: formValue.bankDetails.bank,
      accountNumber: formValue.bankDetails.accountNumber,
      accountHolderName: formValue.bankDetails.accountHolderName,

      // Emergency Contact
      emergencyFullName: formValue.emergencyContact.fullName,
      emergencyRelationship: formValue.emergencyContact.relationship,
      emergencyAddress: formValue.emergencyContact.address,
      emergencyContactNumber: formValue.emergencyContact.contactNumber.toString(), // Convert to String
      emergencyNotes: formValue.emergencyContact.notes,

      // Right to Work
      allowedToWork: formValue.rightToWork.allowedToWork === 'yes',
      rightToWorkRemarks: formValue.rightToWork.allowedToWork === 'no' ? formValue.rightToWork.explanation : '',

      // Additional Notes
      additionalNotes: formValue.additionalField,

      // Documents - Add the missing documents object
      documents: {
        doc1: {
          url: formValue.passport.dataUrl || '',
          status: formValue.passport.uploaded ? "pending" : "pending"
        },
        doc2: {
          url: formValue.residenceCard.dataUrl || '',
          status: formValue.residenceCard.uploaded ? "pending" : "pending"
        },
        doc3: {
          url: formValue.healthCard.dataUrl || '',
          status: formValue.healthCard.uploaded ? "pending" : "pending"
        },
        doc4: {
          url: formValue.drivingLicense.dataUrl || '',
          status: formValue.drivingLicense.uploaded ? "pending" : "pending"
        }
      },

      // Default values for required fields in schema
      role: 'USER',
      status: 'active',
      isLoggedIn: 0,
      password: '',
      currentToken: '',
      otp: '',
      otpCreatedAt: null, // Add missing field
      fcmToken: null,
      deviceId: null,
      isDeleted: false
    };
  }

  // Convert base64 to blob for file upload
  private dataURLtoBlob(dataURL: string): Blob {
    if (!dataURL) {
      return new Blob();
    }
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  // Create FormData with all data as simple fields
  private createFormData(transformedData: any): FormData {
    const formData = new FormData();

    // Add all simple fields directly to FormData
    Object.keys(transformedData).forEach(key => {
      const value = transformedData[key];

      // Skip documents object for now (will handle separately)
      if (key === 'documents') return;

      // Handle arrays and objects by stringifying them
      if (Array.isArray(value) || typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value === null ? '' : String(value));
      }
    });

    // Add document files if they exist and have data
    const documents = transformedData.documents || {};

    if (documents.doc1?.url) {
      const blob = this.dataURLtoBlob(documents.doc1.url);
      if (blob.size > 0) {
        formData.append('passport', blob, 'passport.jpg');
        console.log('Passport image added to FormData');
      }
    }

    if (documents.doc2?.url) {
      const blob = this.dataURLtoBlob(documents.doc2.url);
      if (blob.size > 0) {
        formData.append('residenceCard', blob, 'residenceCard.jpg');
        console.log('Residence Card image added to FormData');
      }
    }

    if (documents.doc3?.url) {
      const blob = this.dataURLtoBlob(documents.doc3.url);
      if (blob.size > 0) {
        formData.append('healthCard', blob, 'healthCard.jpg');
        console.log('Health Card image added to FormData');
      }
    }

    if (documents.doc4?.url) {
      const blob = this.dataURLtoBlob(documents.doc4.url);
      if (blob.size > 0) {
        formData.append('drivingLicense', blob, 'drivingLicense.jpg');
        console.log('Driving License image added to FormData');
      }
    }

    // Log FormData contents for debugging
    console.log('=== FORM DATA CONTENTS ===');
    for (let pair of (formData as any).entries()) {
      if (pair[1] instanceof Blob) {
        console.log(pair[0] + ': [BLOB] - Size: ' + pair[1].size + ' bytes');
      } else {
        console.log(pair[0] + ': ' + (pair[1].toString().length > 100 ?
          pair[1].toString().substring(0, 100) + '...' : pair[1]));
      }
    }

    return formData;
  }

  // Convert to FormData and submit
  onSubmit() {
    if (this.form.valid) {
      // Check if userId exists in localStorage
      const userId = this.getUserId();
      if (!userId) {
        alert('User not authenticated. Please log in again.');
        return;
      }

      const formValue = this.form.value;

      // Transform form data to match backend schema
      const transformedData = this.transformFormData(formValue);

      console.log('=== TRANSFORMED DATA FOR BACKEND ===');
      console.log('UserId:', userId);
      console.log(JSON.stringify(transformedData, null, 2));

      // Create FormData with all data as simple fields
      const formData = this.createFormData(transformedData);

      // Call backend service
      this.backend.uploadDocuments(formData).subscribe({
        next: (res) => {
          console.log('Document upload response:', res);
          alert('Form submitted successfully!');
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          alert('Error submitting form. Please try again.');
        }
      });

    } else {
      alert('Please fill all required fields correctly before submitting.');
      this.markAllFieldsAsTouched();
    }
  }

  // Mark all fields as touched to show validation errors
  private markAllFieldsAsTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(subKey => {
          control.get(subKey)?.markAsTouched();
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            Object.keys(arrayControl.controls).forEach(subKey => {
              arrayControl.get(subKey)?.markAsTouched();
            });
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
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
      default: return 'Document';
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
  }
}