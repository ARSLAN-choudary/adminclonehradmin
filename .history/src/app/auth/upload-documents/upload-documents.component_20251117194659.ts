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
import { BackendService } from '../../Services/backend.service';

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
  showCamera = false;
  hint = 'Click a card to capture its document.';
  qualityStatus: 'unknown' | 'good' | 'blurry' | 'too_far' | 'too_close' = 'unknown';

  // ngx-webcam trigger
  private snapshotTrigger: Subject<void> = new Subject<void>();
  triggerObservable = this.snapshotTrigger.asObservable();

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

  constructor(private fb: FormBuilder,private backend:BackendService) {
    this.form = this.fb.group({
      // SECTION 1: PERSONAL DETAILS
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

  // Convert to FormData and submit
  onSubmit() {
    if (this.form.valid) {
      // Convert form to FormData
      const formData = new FormData();
      const formValue = this.form.value;

      // Helper function to append form data recursively
      const appendFormData = (data: any, prefix: string = '') => {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key];
            const fullKey = prefix ? `${prefix}[${key}]` : key;

            if (value instanceof File) {
              formData.append(fullKey, value);
            } else if (value instanceof Date) {
              formData.append(fullKey, value.toISOString());
            } else if (typeof value === 'object' && value !== null) {
              appendFormData(value, fullKey);
            } else {
              formData.append(fullKey, value === null ? '' : String(value));
            }
          }
        }
      };

      appendFormData(formValue);

      // Log FormData entries
      console.log('=== FORM DATA ENTRIES ===');
      for (let pair of (formData as any).entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      // Log complete form value
      console.log('=== COMPLETE FORM VALUE ===');
      console.log(JSON.stringify(formValue, null, 2));
this.backend.uploadDocuments(formValue).subscribe((res)=>{
  console.log('Document upload response:', res);
});
      alert('Form submitted successfully! Check console for FormData and complete form value.');
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

  // Document upload methods
  selectDocType(type: DocType) {
    this.activeDocType = type;
    this.hint = `Align your ${this.labelFor(type)} inside the frame and tap Capture.`;
    this.qualityStatus = 'unknown';
    this.showCamera = true;
  }

  onCloseCamera() {
    this.showCamera = false;
    this.qualityStatus = 'unknown';
    this.hint = 'Click a card to capture its document.';
  }

  labelFor(type: DocType): string {
    switch (type) {
      case 'passport': return 'Passport';
      case 'residenceCard': return 'Residence Card';
      case 'healthCard': return 'Health Card';
      case 'drivingLicense': return 'Driving License';
      default: return 'Document';
    }
  }

  triggerSnapshot() {
    if (!this.activeDocType) return;
    this.snapshotTrigger.next();
  }

  handleImage(webcamImage: WebcamImage) {
    if (!this.activeDocType) return;
    const dataUrl = webcamImage.imageAsDataUrl;

    // For demo purposes, always accept the image
    const group = this.form.get(this.activeDocType) as FormGroup;
    group.patchValue({
      dataUrl,
      uploaded: true,
    });

    this.showCamera = false;
    this.hint = `Captured ${this.labelFor(this.activeDocType)}. Click another card to capture again.`;
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