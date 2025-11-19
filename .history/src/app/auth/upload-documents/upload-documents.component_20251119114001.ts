import { Component, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { SelectModule } from "primeng/select";
import { Subject } from "rxjs";
import { WebcamImage, WebcamModule } from "ngx-webcam";
import { BackendService } from "../../Services/backend.service";

// OpenCV.js
import cvModule from "@techstark/opencv-js";
import { ActivatedRoute, Router } from "@angular/router";
import { FirebaseStoreService } from "../../Services/firebase-store.service";

type DocType = "passport" | "residenceCard" | "healthCertificate" | "additionalDoc";

// Custom Validators
export class CustomValidators {
  static dateRangeValidator(fromField: string, toField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const from = formGroup.get(fromField)?.value;
      const to = formGroup.get(toField)?.value;
      
      if (from && to && from > to) {
        return { dateRange: true };
      }
      return null;
    };
  }

  static ibanValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      
      const ibanPattern = /^GE\d{2}\s?[A-Z]{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
      return ibanPattern.test(control.value.replace(/\s/g, '')) ? null : { ibanFormat: true };
    };
  }

  static georgianPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      
      const phonePattern = /^\+995\s?\d{9}$/;
      return phonePattern.test(control.value.replace(/\s/g, '')) ? null : { georgianPhone: true };
    };
  }
}

@Component({
  selector: "app-upload-documents",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WebcamModule, SelectModule],
  templateUrl: "./upload-documents.component.html",
  styleUrls: ["./upload-documents.component.scss"],
})
export class UploadDocumentsComponent implements OnInit {
  form: FormGroup;

  activeDocType: DocType | string | null = null;
  activeAdditionalDocIndex: number | null = null;
  showCamera = false;
  hint = "Click a card to capture its document.";
  qualityStatus: "unknown" | "good" | "blurry" | "too_far" | "too_close" =
    "unknown";

  // ngx-webcam trigger
  private snapshotTrigger: Subject<void> = new Subject<void>();
  triggerObservable = this.snapshotTrigger.asObservable();

  // OpenCV
  private cv: any | null = null;
  private cvReady = false;

  // thresholds (relaxed!)
  private readonly BLUR_THRESHOLD = 40;
  private readonly AREA_TOO_FAR_MAX = 0.05;
  private readonly AREA_TOO_CLOSE_MIN = 0.85;

  // Data for dropdowns with default values
  cities = [
    { label: "Tbilisi", value: "Tbilisi" },
    { label: "Batumi", value: "Batumi" },
    { label: "Rustavi", value: "Rustavi" },
    { label: "Kutaisi", value: "Kutaisi" },
    { label: "Gori", value: "Gori" },
    { label: "Poti", value: "Poti" },
    { label: "Zugdidi", value: "Zugdidi" },
    { label: "Khashuri", value: "Khashuri" },
    { label: "Kobuleti", value: "Kobuleti" },
    { label: "Marneuli", value: "Marneuli" },
    { label: "Samtredia", value: "Samtredia" },
    { label: "Zestaponi", value: "Zestaponi" },
    { label: "Telavi", value: "Telavi" },
    { label: "Akhaltsikhe", value: "Akhaltsikhe" },
    { label: "Senaki", value: "Senaki" },
    { label: "Ozurgeti", value: "Ozurgeti" },
    { label: "Kaspi", value: "Kaspi" },
    { label: "Gardabani", value: "Gardabani" },
    { label: "Chiatura", value: "Chiatura" },
    { label: "Borjomi", value: "Borjomi" },
    { label: "Sagarejo", value: "Sagarejo" },
    { label: "Kvareli", value: "Kvareli" },
    { label: "Bolnisi", value: "Bolnisi" },
    { label: "Tkibuli", value: "Tkibuli" },
    { label: "Khoni", value: "Khoni" },
    { label: "Akhalkalaki", value: "Akhalkalaki" },
    { label: "Tskaltubo", value: "Tskaltubo" },
    { label: "Mtskheta", value: "Mtskheta" },
    { label: "Gurjaani", value: "Gurjaani" },
    { label: "Dusheti", value: "Dusheti" },
    { label: "Kareli", value: "Kareli" },
    { label: "Lanchkhuti", value: "Lanchkhuti" },
    { label: "Akhmeta", value: "Akhmeta" },
    { label: "Lagodekhi", value: "Lagodekhi" },
    { label: "Dedoplistsqaro", value: "Dedoplistsqaro" },
    { label: "Sachkhere", value: "Sachkhere" },
    { label: "Vale", value: "Vale" },
    { label: "Tsnori", value: "Tsnori" },
    { label: "Terjola", value: "Terjola" },
    { label: "Tetritsqaro", value: "Tetritsqaro" },
    { label: "Abasha", value: "Abasha" },
    { label: "Ninotsminda", value: "Ninotsminda" },
    { label: "Martvili", value: "Martvili" },
    { label: "Tsalka", value: "Tsalka" },
    { label: "Vani", value: "Vani" },
    { label: "Khobi", value: "Khobi" },
    { label: "Dmanisi", value: "Dmanisi" },
    { label: "Tsalenjikha", value: "Tsalenjikha" },
    { label: "Baghdati", value: "Baghdati" },
    { label: "Oni", value: "Oni" },
    { label: "Ambrolauri", value: "Ambrolauri" },
    { label: "Sighnaghi", value: "Sighnaghi" },
    { label: "Jvari", value: "Jvari" },
    { label: "Tsageri", value: "Tsageri" },
  ];

  regions = [
    { label: "Tbilisi", value: "Tbilisi" },
    { label: "Imereti", value: "Imereti" },
    { label: "Adjara", value: "Adjara" },
    { label: "Kvemo Kartli", value: "Kvemo Kartli" },
    { label: "Samegrelo-Zemo Svaneti", value: "Samegrelo-Zemo Svaneti" },
    { label: "Kakheti", value: "Kakheti" },
    { label: "Shida Kartli", value: "Shida Kartli" },
    { label: "Abkhazia", value: "Abkhazia" },
    { label: "Samtskhe-Javakheti", value: "Samtskhe-Javakheti" },
    { label: "Guria", value: "Guria" },
    { label: "Mtskheta-Mtianeti", value: "Mtskheta-Mtianeti" },
    {
      label: "Racha-Lechkhumi and Kvemo Svaneti",
      value: "Racha-Lechkhumi and Kvemo Svaneti",
    },
  ];

  banks = [
    { label: "TBC Bank", value: "TBC Bank" },
    { label: "Bank of Georgia", value: "Bank of Georgia" },
    { label: "Liberty Bank (Georgia)", value: "Liberty Bank (Georgia)" },
    { label: "Basis Bank", value: "Basis Bank" },
    { label: "ProCredit Bank", value: "ProCredit Bank" },
    { label: "Credo Bank", value: "Credo Bank" },
    { label: "Terabank", value: "Terabank" },
    { label: "Cartu Bank", value: "Cartu Bank" },
    { label: "Halyk Bank", value: "Halyk Bank" },
    { label: "VTB Bank of Georgia", value: "VTB Bank of Georgia" },
    { label: "PASHA Bank Georgia", value: "PASHA Bank Georgia" },
    { label: "Isbank", value: "Isbank" },
    { label: "Ziraat Bank", value: "Ziraat Bank" },
    { label: "Silk Road Bank", value: "Silk Road Bank" },
  ];

  languages = [
    { label: "Georgian", value: "Georgian" },
    { label: "English", value: "English" },
    { label: "Russian", value: "Russian" },
    { label: "Turkish", value: "Turkish" },
    { label: "Hindi", value: "Hindi" },
    { label: "Arabic", value: "Arabic" },
    { label: "Other", value: "Other" },
  ];

  proficiencyLevels = [
    { label: "Basic", value: "Basic" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Fluent", value: "Fluent" },
    { label: "Native", value: "Native" },
  ];

  professionalSkills = [
    { label: "Microsoft Word", value: "Microsoft Word" },
    { label: "Microsoft Excel", value: "Microsoft Excel" },
    { label: "Microsoft PowerPoint", value: "Microsoft PowerPoint" },
    { label: "Email & Outlook", value: "Email & Outlook" },
    { label: "Data Entry", value: "Data Entry" },
    {
      label: "Basic IT / Troubleshooting",
      value: "Basic IT / Troubleshooting",
    },
    { label: "Filing & Documentation", value: "Filing & Documentation" },
    { label: "Scheduling / Planning", value: "Scheduling / Planning" },
    { label: "Record Keeping", value: "Record Keeping" },
    { label: "Office Management", value: "Office Management" },
  ];

  skillLevels = [
    { label: "Beginner", value: "Beginner" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advanced", value: "Advanced" },
    { label: "Expert", value: "Expert" },
  ];
  
  private fromApp: boolean = false;
  email = signal<string>("");
  private deviceId: string = "";
  private fcmToken: string = "";

  private _filterIdCounter = 0;
  
  constructor(
    private fb: FormBuilder,
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseStore: FirebaseStoreService,
  ) {
    this.form = this.fb.group({
      personalDetails: this.fb.group({
        givenNameSurnameEnglish: ["", [Validators.required]],
        givenNameSurnameGeorgian: [""],
        citizenship: ["georgian", [Validators.required]],
        documentType: ["georgianId", [Validators.required]],
        documentNumber: ["", [Validators.required]],
        dateOfBirth: ["", [Validators.required]],
        gender: ["male", [Validators.required]],
        maritalStatus: ["single", [Validators.required]],
        contactNumber: ["", [Validators.required, CustomValidators.georgianPhoneValidator()]],
        emailAddress: ["", [Validators.required, Validators.email]],
        legalHomeAddress: this.fb.group({
          streetBuildingApartment: ["", [Validators.required]],
          village: [""],
          city: ["Tbilisi", [Validators.required]],
          region: ["Tbilisi", [Validators.required]],
        }),
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
        otherSkills: [""],
        skillRating: ["Intermediate"],
      }),

      // SECTION 6: BANK DETAILS
      bankDetails: this.fb.group({
        bank: ["TBC Bank", [Validators.required]],
        accountNumber: ["", [Validators.required, CustomValidators.ibanValidator()]],
        accountHolderName: ["", [Validators.required]],
        useSameName: [false],
      }),

      // SECTION 7: EMERGENCY CONTACT
      emergencyContact: this.fb.group({
        fullName: ["", [Validators.required]],
        relationship: ["", [Validators.required]],
        address: ["", [Validators.required]],
        contactNumber: ["", [Validators.required, CustomValidators.georgianPhoneValidator()]],
        notes: [""],
      }),

      // SECTION 8: RIGHT TO WORK IN GEORGIA
      rightToWork: this.fb.group({
        allowedToWork: ["yes", [Validators.required]],
        explanation: [""],
      }),

      // SECTION 9: DOCUMENT UPLOAD
      passport: this.fb.group({
        dataUrl: [""],
        uploaded: [false],
      }),
      residenceCard: this.fb.group({
        dataUrl: [""],
        uploaded: [false],
      }),
      healthCertificate: this.fb.group({
        dataUrl: [""],
        uploaded: [false],
      }),
      additionalDocuments: this.fb.array([]),

      // SECTION 10: ADDITIONAL FIELD
      additionalField: [""],
    });

    // Add initial entries
    this.addEducation();
    this.addWorkExperience();
    this.addLanguage();
    this.addAdditionalDocument();

    // Initialize OpenCV
    this.initOpenCv();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params["email"] || "";
      this.fromApp = params["from"] === "app";
      this.deviceId = params["deviceId"] || "";
      this.fcmToken = params["fcmToken"] || "";

      if (this.deviceId) {
        setTimeout(() => {
          this.updateUrl();
        }, 100);
      }
    });
  }

  updateUrl() {
    if (this.deviceId) {
      const currentUrl = window.location.href;
      this.firebaseStore.updateUrlByDeviceId(this.deviceId, currentUrl);
    }
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
      console.log("OpenCV.js is ready");
    } catch (error) {
      console.error("Failed to initialize OpenCV:", error);
      this.cvReady = false;
    }
  }

  // ========== QUALITY ANALYSIS WITH OPENCV ==========
  private async analyzeQuality(dataUrl: string): Promise<{
    status: "good" | "blurry" | "too_far" | "too_close" | "unknown";
    message: string;
  }> {
    if (!this.cvReady || !this.cv) {
      console.warn("OpenCV not ready, skipping quality check");
      return {
        status: "good",
        message: "Captured (quality check not ready).",
      };
    }

    const cv = this.cv;
    const img = await this.loadImage(dataUrl);

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return {
        status: "unknown",
        message: "Unable to analyze image quality.",
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
      "blurScore:",
      blurScore.toFixed(1),
      "areaRatio:",
      areaRatio.toFixed(2)
    );

    // 3) Map to messages
    if (blurScore < this.BLUR_THRESHOLD) {
      return {
        status: "blurry",
        message: "Image is blurry. Hold still and try again.",
      };
    }

    if (areaRatio === 0) {
      return {
        status: "good",
        message: "Looks good! Image captured successfully.",
      };
    }

    if (areaRatio < this.AREA_TOO_FAR_MAX) {
      return {
        status: "too_far",
        message:
          "Document is too far. Move it closer so it fills more of the frame.",
      };
    }

    if (areaRatio > this.AREA_TOO_CLOSE_MIN) {
      return {
        status: "too_close",
        message:
          "Document is too close. Move it a bit away so edges are visible.",
      };
    }

    return {
      status: "good",
      message: "Looks good! Image captured successfully.",
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
    return this.form.get("personalDetails") as FormGroup;
  }

  // Getter for legal home address form group
  get legalHomeAddress(): FormGroup {
    return this.personalDetails.get("legalHomeAddress") as FormGroup;
  }

  // Getter for skills form group
  get skills(): FormGroup {
    return this.form.get("skills") as FormGroup;
  }

  // Getter for bank details form group
  get bankDetails(): FormGroup {
    return this.form.get("bankDetails") as FormGroup;
  }

  // Getter for emergency contact form group
  get emergencyContact(): FormGroup {
    return this.form.get("emergencyContact") as FormGroup;
  }

  // Getter for right to work form group
  get rightToWork(): FormGroup {
    return this.form.get("rightToWork") as FormGroup;
  }

  // Getter for additional documents form array
  get additionalDocumentForms() {
    return this.form.get("additionalDocuments") as FormArray;
  }

  // Education FormArray methods
  get educationForms() {
    return this.form.get("education") as FormArray;
  }

  addEducation() {
    const educationGroup = this.fb.group({
      from: ["", [Validators.required]],
      to: ["", [Validators.required]],
      institution: ["", [Validators.required]],
      qualification: ["", [Validators.required]],
      notes: [""],
      currentlyStudying: [false],
    });
    this.educationForms.push(educationGroup);
  }

  removeEducation(index: number) {
    this.educationForms.removeAt(index);
  }

  // Work Experience FormArray methods
  get workExperienceForms() {
    return this.form.get("workExperience") as FormArray;
  }

  addWorkExperience() {
    const workGroup = this.fb.group({
      companyName: ["", [Validators.required]],
      cityCountry: ["", [Validators.required]],
      jobTitle: ["", [Validators.required]],
      employmentPeriodFrom: ["", [Validators.required]],
      employmentPeriodTo: ["", [Validators.required]],
      grossSalary: [""],
      reasonForLeaving: [""],
      stillWorking: [false],
      additionalNotes: [""],
    });
    this.workExperienceForms.push(workGroup);
  }

  removeWorkExperience(index: number) {
    this.workExperienceForms.removeAt(index);
  }

  // Languages FormArray methods
  get languageForms() {
    return this.form.get("languages") as FormArray;
  }

  addLanguage() {
    const languageGroup = this.fb.group({
      language: ["English", [Validators.required]],
      proficiency: ["Intermediate", [Validators.required]],
    });
    this.languageForms.push(languageGroup);
  }

  removeLanguage(index: number) {
    this.languageForms.removeAt(index);
  }

  // Additional Documents FormArray methods
  addAdditionalDocument() {
    const docGroup = this.fb.group({
      dataUrl: [""],
      uploaded: [false],
    });
    this.additionalDocumentForms.push(docGroup);
  }

  removeAdditionalDocument(index: number) {
    this.additionalDocumentForms.removeAt(index);
  }

  // Professional Skills FormArray methods
  get professionalSkillsForms() {
    return this.skills.get("professionalSkills") as FormArray;
  }

  toggleProfessionalSkill(skill: string) {
    const skillsArray = this.professionalSkillsForms;
    const index = skillsArray.controls.findIndex(
      (control) => control.value === skill
    );

    if (index > -1) {
      skillsArray.removeAt(index);
    } else {
      skillsArray.push(this.fb.control(skill));
    }
  }

  // Add this method to your UploadDocumentsComponent class
  labelFilterInput(prefix = "pfilter"): void {
    const apply = () => {
      const filters = Array.from(
        document.querySelectorAll<HTMLInputElement>("input.p-select-filter")
      ).filter((el) => !el.id);

      if (!filters.length) return false;

      for (const input of filters) {
        input.id = `${prefix}-${++this._filterIdCounter}`;
      }
      return true;
    };

    if (!apply()) setTimeout(apply, 0);
    setTimeout(apply, 40);
    setTimeout(apply, 120);
  }

  // Use same name for bank account
  onUseSameNameChange(event: any) {
    if (event.target.checked) {
      const personalName = this.personalDetails.get(
        "givenNameSurnameEnglish"
      )?.value;
      this.bankDetails.get("accountHolderName")?.setValue(personalName);
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
      const userId =
        localStorage.getItem("userId") ||
        localStorage.getItem("user_id") ||
        localStorage.getItem("id") ||
        localStorage.getItem("_id");

      if (userId) {
        console.log("Found userId in localStorage:", userId);
        return userId;
      } else {
        console.warn(
          "No userId found in localStorage. Available keys:",
          Object.keys(localStorage)
        );
        return "";
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return "";
    }
  }

  // Convert form data to match backend schema
  private transformFormData(formValue: any): any {
    const personal = formValue.personalDetails;
    const [userNameEnglish, surnameEnglish] = personal.givenNameSurnameEnglish
      .split(" ")
      .filter(Boolean);

    // Prepare documents object
    const documents: any = {
      doc1: {
        url: formValue.passport.dataUrl || "",
        status: formValue.passport.uploaded ? "pending" : "pending",
      },
      doc2: {
        url: formValue.residenceCard.dataUrl || "",
        status: formValue.residenceCard.uploaded ? "pending" : "pending",
      },
      doc3: {
        url: formValue.healthCertificate.dataUrl || "",
        status: formValue.healthCertificate.uploaded ? "pending" : "pending",
      }
    };

    // Add additional documents
    formValue.additionalDocuments.forEach((doc: any, index: number) => {
      documents[`doc${index + 4}`] = {
        url: doc.dataUrl || "",
        status: doc.uploaded ? "pending" : "pending",
      };
    });

    return {
      userId: this.getUserId(),

      // Personal Details - removed unwanted fields
      userNameEnglish: userNameEnglish || "",
      surnameEnglish: surnameEnglish || "",
      documentType: personal.documentType,
      documentNumber: parseInt(personal.documentNumber) || 0,
      email: personal.emailAddress,
      phone: personal.contactNumber.toString(),
      location: `${personal.legalHomeAddress.city}, ${personal.legalHomeAddress.region}`,
      dateOfBirth: personal.dateOfBirth,
      gender: personal.gender,
      martialStatus: personal.maritalStatus,
      legalAdress: personal.legalHomeAddress.streetBuildingApartment,
      position: "",
      citizenship: personal.citizenship,

      // Education
      education: formValue.education.map((edu: any) => ({
        from: edu.from,
        to: edu.to,
        institution: edu.institution,
        qualification: edu.qualification,
        notes: edu.notes,
        currentlyStudying: edu.currentlyStudying,
      })),

      // Work Experience
      workExperience: formValue.workExperience.map((work: any) => ({
        companyName: work.companyName,
        cityCountry: work.cityCountry,
        jobTitle: work.jobTitle,
        from: work.employmentPeriodFrom,
        to: work.employmentPeriodTo,
        stillWorking: work.stillWorking,
        grossSalary: work.grossSalary ? work.grossSalary.toString() : "",
        reasonForLeaving: work.reasonForLeaving,
        notes: work.additionalNotes,
      })),

      // Languages
      languages: formValue.languages.map((lang: any) => ({
        language: lang.language,
        level: lang.proficiency,
      })),

      // Skills
      computerSkills: formValue.skills.professionalSkills || [],
      administrativeSkills: [],
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
      emergencyContactNumber: formValue.emergencyContact.contactNumber.toString(),
      emergencyNotes: formValue.emergencyContact.notes,

      // Right to Work
      allowedToWork: formValue.rightToWork.allowedToWork === "yes",
      rightToWorkRemarks:
        formValue.rightToWork.allowedToWork === "no"
          ? formValue.rightToWork.explanation
          : "",

      // Additional Notes
      additionalNotes: formValue.additionalField,

      // Documents
      documents,

      // Only include necessary fields
      role: "USER",
      status: "active",
      isLoggedIn: 0,
      isDeleted: false,
      fcmToken: this.fromApp ? this.fcmToken : null,
      deviceId: this.fromApp ? this.deviceId : null,
    };
  }

  // Convert base64 to blob for file upload
  private dataURLtoBlob(dataURL: string): Blob {
    if (!dataURL) {
      return new Blob();
    }
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
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
    Object.keys(transformedData).forEach((key) => {
      const value = transformedData[key];

      if (key === "documents") return;

      if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value === null ? "" : String(value));
      }
    });

    // Add document files if they exist and have data
    const documents = transformedData.documents || {};

    // Passport
    if (documents.doc1?.url) {
      const blob = this.dataURLtoBlob(documents.doc1.url);
      if (blob.size > 0) {
        formData.append("passport", blob, "passport.jpg");
      }
    }

    // Residence Card
    if (documents.doc2?.url) {
      const blob = this.dataURLtoBlob(documents.doc2.url);
      if (blob.size > 0) {
        formData.append("residenceCard", blob, "residenceCard.jpg");
      }
    }

    // Health Certificate
    if (documents.doc3?.url) {
      const blob = this.dataURLtoBlob(documents.doc3.url);
      if (blob.size > 0) {
        formData.append("healthCertificate", blob, "healthCertificate.jpg");
      }
    }

    // Additional Documents
    Object.keys(documents).forEach((key, index) => {
      if (index >= 3 && documents[key]?.url) { // Start from doc4 onwards
        const blob = this.dataURLtoBlob(documents[key].url);
        if (blob.size > 0) {
          formData.append(`additionalDoc${index - 2}`, blob, `additionalDoc${index - 2}.jpg`);
        }
      }
    });

    return formData;
  }

  // Convert to FormData and submit
  onSubmit() {
    if (this.form.valid) {
      const userId = this.getUserId();
      if (!userId) {
        alert("User not authenticated. Please log in again.");
        return;
      }

      const formValue = this.form.value;
      const transformedData = this.transformFormData(formValue);
      const formData = this.createFormData(transformedData);

      this.backend.uploadDocuments(formData).subscribe({
        next: (res) => {
          console.log("Document upload response:", res);
          alert("Form submitted successfully!");
          this.router.navigate(["/waiting-for-application-submission"]);
        },
        error: (err) => {
          console.error("Error submitting form:", err);
          alert("Error submitting form. Please try again.");
        },
      });
    } else {
      alert("Please fill all required fields correctly before submitting.");
      this.markAllFieldsAsTouched();
    }
  }

  // Mark all fields as touched to show validation errors
  private markAllFieldsAsTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((subKey) => {
          control.get(subKey)?.markAsTouched();
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl) => {
          if (arrayControl instanceof FormGroup) {
            Object.keys(arrayControl.controls).forEach((subKey) => {
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
    this.activeAdditionalDocIndex = null;
    this.hint = `Align your ${this.labelFor(
      type
    )} inside the frame and tap Capture.`;
    this.qualityStatus = "unknown";
    this.showCamera = true;
  }

  selectAdditionalDocType(index: number) {
    this.activeDocType = `additionalDoc${index}`;
    this.activeAdditionalDocIndex = index;
    this.hint = `Align your additional document ${index + 1} inside the frame and tap Capture.`;
    this.qualityStatus = "unknown";
    this.showCamera = true;
  }

  // Close camera overlay (X button)
  onCloseCamera() {
    this.showCamera = false;
    this.qualityStatus = "unknown";
    this.hint = "Click a card to capture its document.";
    this.activeAdditionalDocIndex = null;
  }

  labelFor(type: DocType | string): string {
    switch (type) {
      case "passport":
        return "Passport";
      case "residenceCard":
        return "Residence Card";
      case "healthCertificate":
        return "Health Certificate";
      default:
        if (typeof type === 'string' && type.startsWith('additionalDoc')) {
          const index = this.activeAdditionalDocIndex !== null ? this.activeAdditionalDocIndex + 1 : 1;
          return `Additional Document ${index}`;
        }
        return "Document";
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
    const quality = await this.analyzeQuality(dataUrl);
    this.qualityStatus = quality.status;
    this.hint = quality.message;

    if (quality.status !== "good") {
      console.warn("Quality not good, not saving image", quality);
      return;
    }

    // Save to appropriate form group
    if (this.activeAdditionalDocIndex !== null) {
      // Additional document
      const docGroup = this.additionalDocumentForms.at(this.activeAdditionalDocIndex) as FormGroup;
      docGroup.patchValue({
        dataUrl,
        uploaded: true,
      });
    } else {
      // Main document
      const group = this.form.get(this.activeDocType as DocType) as FormGroup;
      if (group) {
        group.patchValue({
          dataUrl,
          uploaded: true,
        });
      }
    }

    console.log(`Captured for ${this.activeDocType}:`, dataUrl);

    // Close camera
    this.showCamera = false;
    this.hint = `Captured ${this.labelFor(
      this.activeDocType
    )}. Click another card to capture again.`;
    this.qualityStatus = "good";
    this.activeAdditionalDocIndex = null;
  }

  handleCameraInitError(error: any) {
    console.error("Camera init error", error);
    this.hint = "Cannot access camera. Please allow camera permission.";
  }

  isProfessionalSkillSelected(skill: string): boolean {
    return this.professionalSkillsForms?.controls?.some(
      (c: any) => c.value === skill
    );
  }

  clearDoc(type: DocType, event: MouseEvent) {
    event.stopPropagation();
    const group = this.form.get(type) as FormGroup;
    if (!group) return;
    group.patchValue({
      dataUrl: "",
      uploaded: false,
    });
  }

  clearAdditionalDoc(index: number, event: MouseEvent) {
    event.stopPropagation();
    const docGroup = this.additionalDocumentForms.at(index) as FormGroup;
    if (!docGroup) return;
    docGroup.patchValue({
      dataUrl: "",
      uploaded: false,
    });
  }
}