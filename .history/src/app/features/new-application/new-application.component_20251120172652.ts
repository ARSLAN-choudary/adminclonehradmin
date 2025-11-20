import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
  WritableSignal,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { Router, RouterLink } from "@angular/router";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgxEditorModule } from "ngx-editor";
import { CustomPaginationComponent } from "../../shared/custom-pagination/custom-pagination.component";
import { MatSortModule, Sort } from "@angular/material/sort";
import { CollapseHeaderComponent } from "../common/collapse-header/collapse-header.component";
import { MatTableDataSource } from "@angular/material/table";
import { routes } from "../../shared/routes/routes";
import {
  apiResultFormat,
  pageSelection,
  manageUsers,
  dataTables,
  newApplicationDataTable,
} from "../../shared/model/pages.model";
import {
  PaginationService,
  tablePageSize,
} from "../../shared/custom-pagination/pagination.service";
import { DataService } from "../../shared/data/data.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DateRangePickerComponent } from "../common/date-range-picker/date-range-picker.component";

import {
  CountryISO,
  NgxIntlTelInputModule,
  SearchCountryField,
  PhoneNumberFormat,
} from "ngx-intl-tel-input";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../Services/backend.service";
import { DropdownModule } from "primeng/dropdown";
import { SelectModule } from "primeng/select";
import { tap } from "rxjs";

import "jspdf-autotable";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { SelectFilterIdDirective } from "../../shared/common/directives/select-filter-id.directive";

interface PhoneInputValue {
  number: string;
  nationalNumber: string;
  internationalNumber: string;
  e164Number: string;
  countryCode: string;
  dialCode: string;
}

interface DocumentItem {
  id: number;
  name: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  previewUrl: string;
  fileType: "pdf" | "image";
}
interface ContractData {
  id: string;
  type: "trainee" | "probation" | "job";
  generatedDate: Date;
  fileName: string;
  data: any;
}
@Component({
  selector: "app-new-application",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgxEditorModule,
    MatSelectModule,
    FormsModule,
    BsDatepickerModule,
    MatChipsModule,
    MatIconModule,
    CustomPaginationComponent,
    MatSortModule,
    DateRangePickerComponent,
    CollapseHeaderComponent,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    DropdownModule,
    SelectModule,
    SelectFilterIdDirective,
  ],
  templateUrl: "./new-application.component.html",
  styleUrl: "./new-application.component.scss",
})
export class NewApplicationComponent implements OnInit {
  @ViewChild("deleteUserCanvas", { static: true })
  deleteUserCanvas!: ElementRef<HTMLElement>;
  @ViewChild("editCanvas", { static: true })
  editCanvas!: ElementRef<HTMLElement>;
  @ViewChild("generateContractCanvas", { static: true })
  generateContractCanvas!: ElementRef<HTMLElement>;
  @ViewChild("addCanvas", { static: true })
  addCanvas!: ElementRef<HTMLElement>;
  private _filterIdCounter = 0;
  @ViewChild("resendCanvas", { static: true })
  resendCanvas!: ElementRef<HTMLElement>;
  editForm: FormGroup;
  inActiveApplications: WritableSignal<number> = signal(0);
  activeApplications: WritableSignal<number> = signal(0);
  private editBackdrop?: HTMLElement;
  @ViewChild("offcanvas_view", { static: true })
  offcanvas_view!: ElementRef<HTMLElement>;
  private collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });
  isGenerating = false;
  traineeContract: ContractData | null = null;
  probationContract: ContractData | null = null;
  jobContract: ContractData | null = null;

  // Sample employee data - replace with actual data from your service
  employeeData = {
    name: "John Doe",
    position: "Software Developer",
    department: "IT",
    startDate: new Date(),
    salary: "$50,000",
    email: "john.doe@company.com",
    phone: "+1-555-0123",
  };
  deleteApplicationId!: any;
  @ViewChild("appSubmittedCanvas", { static: true })
  appSubmittedCanvas!: ElementRef<HTMLElement>;
  applicationDetails!: any;

  @ViewChild("docsCanvas") docsCanvas!: ElementRef;
  docsBackdrop: any;

  startDate: string = "";
  endDate: string = "";
  public routes = routes;
  public pageSize = 10;
  public skip = 0;
  public currentPage = 1;
  public totalData = 0;

  public tableData: newApplicationDataTable[] = [];
  public serialNumberArray: number[] = [];

  public dataSource!: MatTableDataSource<newApplicationDataTable>;
  public searchDataValue = "";
  public row = true;

  private backdropEl?: HTMLElement;

  addNewApplicationForm!: FormGroup;
  companies: { label: string; value: string }[] = [];
  resendApplicationData!: any;

  public tableDataCopy: any[] = [];
  public actualData: any[] = [];

  initChecked = false;
  currentAppId: string = "";

  UserAppId: string = "";

  currentUserDocs: any[] = [];
  limit: number = 10;
  openedIndex: number | null = 0;
  docsOpen: boolean = false;

  private EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  private EXCEL_EXTENSION = ".xlsx";

  applicationTypes = [
    { label: "New", value: "new" },
    { label: "Renew", value: "renew" },
    { label: "Amend", value: "amend" },
  ];

  applicationContexts = [
    { label: "Internal", value: "internal" },
    { label: "External", value: "external" },
  ];

  sectorTypes = [
    { label: "Private", value: "private" },
    { label: "Government", value: "government" },
    { label: "Non‑Profit", value: "nonprofit" },
  ];

  jobTitles = [
    { label: "Manager", value: "manager" },
    { label: "Developer", value: "developer" },
    { label: "Analyst", value: "analyst" },
  ];

  occupations = [
    { label: "Engineering", value: "engineering" },
    { label: "Finance", value: "finance" },
    { label: "Marketing", value: "marketing" },
  ];

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries = [CountryISO.Pakistan, CountryISO.UnitedArabEmirates];
  onlyCountries = [
    CountryISO.Pakistan,
    CountryISO.UnitedArabEmirates,
    CountryISO.SaudiArabia,
  ];

  form: FormGroup = new FormGroup({
    phone: new FormControl(undefined, Validators.required),
  });

  companyForm = new FormGroup({
    company: new FormControl(null, Validators.required),
  });

  public sidebarPopup = false;
  public sidebarPopup2 = false;
  public password: boolean[] = [false];

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private backendService: BackendService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private backend: BackendService
  ) {
    this.editForm = this.fb.group({
      _id: [""],
      firstName: ["", Validators.required],
      mobile: new FormControl<PhoneInputValue | null>(
        null,
        Validators.required
      ),
      email: new FormControl("", [Validators.required, Validators.email]),
      jobTitle: ["", Validators.required],
      status: ["active", Validators.required],
    });
  }

  ngOnInit() {
    this.loadExistingContracts();
    this.addNewApplicationForm = this.fb.group({
      company: [null, Validators.required],
      applicationType: [null, Validators.required],
      applicationContext: [null, Validators.required],
      sectorType: [null, Validators.required],
      jobTitle: [null, Validators.required],
      occupation: [null, Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
    });
    this.backendService.getCompany("").subscribe((res: any) => {
      this.companies = res.data.data.map((c: any) => ({
        label: c.name,
        value: c._id,
      }));
    });

    this.getTableData(this.skip, this.pageSize);

    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      // if (this.router.url === this.routes.dataTable) {
      this.pageSize = res.pageSize;
      this.skip = res.skip;
      this.getTableData(res.skip, res.pageSize);
      // }
    });
  }

  private updateCounts(data: any[] = []) {
    const active = data.filter((c) => c.status === "active").length;
    this.activeApplications.set(active);
    this.inActiveApplications.set(data.length - active);
  }

  private getTableData(skip: number, limit: number): void {
    const payload: any = {
      start: skip,
      length: limit,
      search: { value: this.searchDataValue },
    };
    if (this.startDate && this.endDate) {
      payload.startDate = this.startDate;
      payload.endDate = this.endDate;
    }

    this.backendService
      .getApplications(payload)
      .pipe(
        tap((apiRes: any) => {
          const arr = Array.isArray(apiRes?.data?.data) ? apiRes.data.data : [];
          this.updateCounts(arr);
        })
      )
      .subscribe((apiRes: any) => {
        this.actualData = apiRes.data.data ?? [];
        this.totalData = apiRes.totalData ?? this.actualData.length;
        this.tableData = [...this.actualData];

        this.serialNumberArray = this.tableData.map((_, i) => i + 1);
        this.dataSource = new MatTableDataSource<newApplicationDataTable>(
          this.tableData
        );
        this.row = this.tableData.length > 0;
        this.pagination.calculatePageSize.next({
          totalData: this.totalData,
          pageSize: this.pageSize,
          tableData: this.tableData,
          serialNumberArray: this.serialNumberArray,
        });
      });
  }

  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.skip = 0;
    if (this.searchDataValue.length >= 3) {
      this.getTableData(this.skip, this.pageSize);
    }
  }

  editApplication(data: any) {
    const raw = data.mobile || "";

    let national = raw;
    if (national.startsWith("+92")) {
      national = national.slice(3);
    } else if (national.startsWith("0")) {
      national = national.slice(1);
    }

    const phoneObj: PhoneInputValue = {
      number: national,
      nationalNumber: national,
      internationalNumber: `+92 ${national}`,
      e164Number: `+92${national}`,
      countryCode: "pk",
      dialCode: "92",
    };

    this.editForm.patchValue({
      _id: data._id,
      firstName: data.firstName || "",
      email: data.email || "",
      mobile: phoneObj,
      jobTitle: data.jobTitle || "",
      status: data.status || "active",
    });
  }

  control(name: string) {
    return this.addNewApplicationForm.get(name)!;
  }

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  onClickStar(item: manageUsers) {
    item.isStarActive = !item.isStarActive;
  }

  trackById(index: number, item: any): any {
    return item._id ?? item.id ?? index;
  }

  gotoLink() {
    const baseUrl = window.location.origin;
    window.open(`${baseUrl}/userDetails`, "_blank");
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  get hasTraineeContract(): boolean {
    return !!this.traineeContract;
  }

  get hasProbationContract(): boolean {
    return !!this.probationContract;
  }

  get hasJobContract(): boolean {
    return !!this.jobContract;
  }

  get hasGeneratedContracts(): boolean {
    return (
      this.hasTraineeContract ||
      this.hasProbationContract ||
      this.hasJobContract
    );
  }

  loadExistingContracts() {
    // Load existing contracts from localStorage or your backend
    const savedContracts = localStorage.getItem("generatedContracts");
    if (savedContracts) {
      const contracts: ContractData[] = JSON.parse(savedContracts);
      this.traineeContract =
        contracts.find((c) => c.type === "trainee") || null;
      this.probationContract =
        contracts.find((c) => c.type === "probation") || null;
      this.jobContract = contracts.find((c) => c.type === "job") || null;
    }
  }

  saveContracts() {
    const contracts: ContractData[] = [];
    if (this.traineeContract) contracts.push(this.traineeContract);
    if (this.probationContract) contracts.push(this.probationContract);
    if (this.jobContract) contracts.push(this.jobContract);

    localStorage.setItem("generatedContracts", JSON.stringify(contracts));
  }

  async generateTraineeContract() {
    this.isGenerating = true;

    try {
      const contractData = await this.generateContractForm("trainee");
      this.traineeContract = {
        id: this.generateId(),
        type: "trainee",
        generatedDate: new Date(),
        fileName: `Trainee_Contract_${
          this.employeeData.name
        }_${Date.now()}.pdf`,
        data: contractData,
      };

      this.saveContracts();
      this.exportContractAsPDF(this.traineeContract);
    } catch (error) {
      console.error("Error generating trainee contract:", error);
    } finally {
      this.isGenerating = false;
    }
  }

  async generateProbationContract() {
    this.isGenerating = true;

    try {
      const contractData = await this.generateContractForm("probation");
      this.probationContract = {
        id: this.generateId(),
        type: "probation",
        generatedDate: new Date(),
        fileName: `Probation_Contract_${
          this.employeeData.name
        }_${Date.now()}.pdf`,
        data: contractData,
      };

      this.saveContracts();
      this.exportContractAsPDF(this.probationContract);
    } catch (error) {
      console.error("Error generating probation contract:", error);
    } finally {
      this.isGenerating = false;
    }
  }

  async generateJobContract() {
    this.isGenerating = true;

    try {
      const contractData = await this.generateContractForm("job");
      this.jobContract = {
        id: this.generateId(),
        type: "job",
        generatedDate: new Date(),
        fileName: `Job_Contract_${this.employeeData.name}_${Date.now()}.pdf`,
        data: contractData,
      };

      this.saveContracts();
      this.exportContractAsPDF(this.jobContract);
    } catch (error) {
      console.error("Error generating job contract:", error);
    } finally {
      this.isGenerating = false;
    }
  }

  private async generateContractForm(contractType: string): Promise<any> {
    // Simulate form generation/API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const formData = {
          employee: this.employeeData,
          contractType: contractType,
          terms: this.getContractTerms(contractType),
          duration: this.getContractDuration(contractType),
          conditions: this.getContractConditions(contractType),
        };
        resolve(formData);
      }, 1000);
    });
  }

  private getContractTerms(contractType: string): string[] {
    switch (contractType) {
      case "trainee":
        return [
          "Training period: 6 months",
          "Monthly stipend provided",
          "Mentorship program included",
          "Performance evaluation every 2 months",
        ];
      case "probation":
        return [
          "Probation period: 3 months",
          "Full salary during probation",
          "Performance review at end of period",
          "Possible conversion to permanent position",
        ];
      case "job":
        return [
          "Permanent employment",
          "Full benefits package",
          "Annual performance review",
          "Standard company policies apply",
        ];
      default:
        return [];
    }
  }

  private getContractDuration(contractType: string): string {
    switch (contractType) {
      case "trainee":
        return "6 months";
      case "probation":
        return "3 months";
      case "job":
        return "Permanent";
      default:
        return "N/A";
    }
  }

  private getContractConditions(contractType: string): string[] {
    switch (contractType) {
      case "trainee":
        return [
          "Completion certificate upon successful training",
          "Possible job offer after training",
        ];
      case "probation":
        return [
          "Employment subject to successful probation completion",
          "Standard notice period applies",
        ];
      case "job":
        return [
          "Standard notice period: 30 days",
          "Confidentiality agreement applies",
        ];
      default:
        return [];
    }
  }

  downloadContract(contractType: string) {
    let contract: ContractData | null = null;

    switch (contractType) {
      case "trainee":
        contract = this.traineeContract;
        break;
      case "probation":
        contract = this.probationContract;
        break;
      case "job":
        contract = this.jobContract;
        break;
    }

    if (contract) {
      this.exportContractAsPDF(contract);
    }
  }

  exportContractAsPDF(contract: ContractData): void {
    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    let yPosition = 60;

    // Title
    doc.setFontSize(20);
    doc.setFont("", "bold");
    doc.text(
      `${this.getContractTitle(contract.type)}`,
      pageWidth / 2,
      yPosition,
      { align: "center" }
    );
    yPosition += 40;

    // Contract Information
    doc.setFontSize(12);
    doc.setFont("", "normal");

    // Employee Details
    doc.setFont("", "bold");
    doc.text("Employee Details:", margin, yPosition);
    yPosition += 25;

    doc.setFont("", "normal");
    doc.text(`Name: ${this.employeeData.name}`, margin, yPosition);
    yPosition += 20;
    doc.text(`Position: ${this.employeeData.position}`, margin, yPosition);
    yPosition += 20;
    doc.text(`Department: ${this.employeeData.department}`, margin, yPosition);
    yPosition += 20;
    doc.text(
      `Start Date: ${this.employeeData.startDate.toLocaleDateString()}`,
      margin,
      yPosition
    );
    yPosition += 20;
    doc.text(`Email: ${this.employeeData.email}`, margin, yPosition);
    yPosition += 30;

    // Contract Terms
    doc.setFont("", "bold");
    doc.text("Contract Terms:", margin, yPosition);
    yPosition += 25;

    doc.setFont("", "normal");
    doc.text(
      `Duration: ${this.getContractDuration(contract.type)}`,
      margin,
      yPosition
    );
    yPosition += 20;
    doc.text(`Salary: ${this.employeeData.salary}`, margin, yPosition);
    yPosition += 30;

    // Terms and Conditions
    const terms = this.getContractTerms(contract.type);
    doc.setFont("", "bold");
    doc.text("Terms & Conditions:", margin, yPosition);
    yPosition += 25;

    doc.setFont("", "normal");
    terms.forEach((term) => {
      if (yPosition > 700) {
        doc.addPage();
        yPosition = 60;
      }
      doc.text(`• ${term}`, margin + 10, yPosition);
      yPosition += 20;
    });

    // Generated Date
    yPosition += 20;
    doc.text(
      `Generated on: ${contract.generatedDate.toLocaleDateString()}`,
      margin,
      yPosition
    );

    // Save the PDF
    doc.save(contract.fileName);
  }

  private getContractTitle(contractType: string): string {
    switch (contractType) {
      case "trainee":
        return "TRAINEE EMPLOYMENT CONTRACT";
      case "probation":
        return "PROBATION EMPLOYMENT CONTRACT";
      case "job":
        return "EMPLOYMENT CONTRACT";
      default:
        return "CONTRACT";
    }
  }

  private generateId(): string {
    return `contract_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  onDateRangeChange(event: { startDate: Date; endDate: Date }) {
    this.startDate = this.formatDate(event.startDate);
    this.endDate = this.formatDate(event.endDate);
    this.getTableData(this.skip, this.pageSize);
  }
  createNewApplication() {
    if (this.addNewApplicationForm.invalid) {
      this.addNewApplicationForm.markAllAsTouched();
      return;
    }

    const raw = this.addNewApplicationForm.value;
    const payload = {
      company: raw.company,
      applicationType: raw.applicationType,
      applicationContext: raw.applicationContext,
      employmentSectorType: raw.sectorType,
      jobTitle: raw.jobTitle,
      occupation: raw.occupation,
      email: raw.email,
      mobile: raw.phone.e164Number,
    };

    this.backendService.addApplication(payload).subscribe((res: any) => {
      if (res.status === "success") {
        this.toastr.success(res.message);
        this.closeAddApplication();
        this.openThankYouModal();

        this.getTableData(this.skip, this.pageSize);

        this.addNewApplicationForm.reset();
      } else {
        this.toastr.error("User Not Created, Please Try Again Later");
        setTimeout(() => {}, 7000);
      }
    });
  }

  openAddApplication() {
    const el = this.addCanvas.nativeElement;

    this.renderer.addClass(el, "show");
    this.renderer.setStyle(el, "visibility", "visible");
    this.renderer.setAttribute(el, "aria-modal", "true");
    this.renderer.removeAttribute(el, "aria-hidden");
    this.renderer.setStyle(document.body, "overflow", "hidden");

    this.backdropEl = this.renderer.createElement("div");
    this.renderer.addClass(this.backdropEl, "offcanvas-backdrop");
    this.renderer.addClass(this.backdropEl, "fade");
    this.renderer.addClass(this.backdropEl, "show");
    if (this.backdropEl) {
      this.backdropEl.addEventListener("click", () =>
        this.closeAddApplication()
      );
      this.renderer.appendChild(document.body, this.backdropEl);
    }
  }

  closeAddApplication() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const panel = this.addCanvas.nativeElement;

    this.renderer.removeClass(panel, "show");
    const onTransition = (e: TransitionEvent) => {
      if (e.target === panel && e.propertyName.includes("transform")) {
        this.renderer.setStyle(panel, "visibility", "hidden");
        this.renderer.removeAttribute(panel, "aria-modal");
        this.renderer.setAttribute(panel, "aria-hidden", "true");
        this.renderer.removeStyle(document.body, "overflow");

        if (this.backdropEl) {
          this.renderer.removeChild(document.body, this.backdropEl);
          this.backdropEl = undefined;
        }
        document
          .querySelectorAll(".offcanvas-backdrop.fade.show")
          .forEach((backdrop) =>
            this.renderer.removeChild(document.body, backdrop)
          );
        this.renderer.removeStyle(panel, "transform");

        panel.removeEventListener("transitionend", onTransition);
      }
    };

    if (this.backdropEl) {
      this.renderer.removeChild(document.body, this.backdropEl);
      this.backdropEl = undefined;
    }
    this.renderer.removeStyle(document.body, "overflow");

    this.addNewApplicationForm.reset();
  }

  openEditApplication() {
    const el = this.editCanvas.nativeElement;

    this.renderer.addClass(el, "show");
    this.renderer.setStyle(el, "visibility", "visible");
    this.renderer.setAttribute(el, "aria-modal", "true");
    this.renderer.removeAttribute(el, "aria-hidden");
    this.renderer.setStyle(document.body, "overflow", "hidden");

    this.backdropEl = this.renderer.createElement("div");
    this.renderer.addClass(this.backdropEl, "offcanvas-backdrop");
    this.renderer.addClass(this.backdropEl, "fade");
    this.renderer.addClass(this.backdropEl, "show");
    if (this.backdropEl) {
      this.backdropEl.addEventListener("click", () =>
        this.closeAddApplication()
      );
      this.renderer.appendChild(document.body, this.backdropEl);
    }
  }
  openGenerateContractModal(id) {
    const el = this.generateContractCanvas.nativeElement;

    this.renderer.addClass(el, "show");
    this.renderer.setStyle(el, "visibility", "visible");
    this.renderer.setAttribute(el, "aria-modal", "true");
    this.renderer.removeAttribute(el, "aria-hidden");
    this.renderer.setStyle(document.body, "overflow", "hidden");

    this.backdropEl = this.renderer.createElement("div");
    this.renderer.addClass(this.backdropEl, "offcanvas-backdrop");
    this.renderer.addClass(this.backdropEl, "fade");
    this.renderer.addClass(this.backdropEl, "show");
    if (this.backdropEl) {
      this.backdropEl.addEventListener("click", () =>
        this.closeGenerateContractModal()
      );
      this.renderer.appendChild(document.body, this.backdropEl);
    }
  }

  closeGenerateContractModal() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const panel = this.generateContractCanvas.nativeElement;

    this.renderer.removeClass(panel, "show");
    const onTransition = (e: TransitionEvent) => {
      if (e.target === panel && e.propertyName.includes("transform")) {
        this.renderer.setStyle(panel, "visibility", "hidden");
        this.renderer.removeAttribute(panel, "aria-modal");
        this.renderer.setAttribute(panel, "aria-hidden", "true");
        this.renderer.removeStyle(document.body, "overflow");

        if (this.backdropEl) {
          this.renderer.removeChild(document.body, this.backdropEl);
          this.backdropEl = undefined;
        }
        document
          .querySelectorAll(".offcanvas-backdrop.fade.show")
          .forEach((backdrop) =>
            this.renderer.removeChild(document.body, backdrop)
          );
        this.renderer.removeStyle(panel, "transform");

        panel.removeEventListener("transitionend", onTransition);
      }
    };

    if (this.backdropEl) {
      this.renderer.removeChild(document.body, this.backdropEl);
      this.backdropEl = undefined;
    }
    this.renderer.removeStyle(document.body, "overflow");
  }
  closeEditApplication() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const panel = this.editCanvas.nativeElement;

    this.renderer.removeClass(panel, "show");
    const onTransition = (e: TransitionEvent) => {
      if (e.target === panel && e.propertyName.includes("transform")) {
        this.renderer.setStyle(panel, "visibility", "hidden");
        this.renderer.removeAttribute(panel, "aria-modal");
        this.renderer.setAttribute(panel, "aria-hidden", "true");
        this.renderer.removeStyle(document.body, "overflow");

        if (this.backdropEl) {
          this.renderer.removeChild(document.body, this.backdropEl);
          this.backdropEl = undefined;
        }
        document
          .querySelectorAll(".offcanvas-backdrop.fade.show")
          .forEach((backdrop) =>
            this.renderer.removeChild(document.body, backdrop)
          );
        this.renderer.removeStyle(panel, "transform");

        panel.removeEventListener("transitionend", onTransition);
      }
    };

    if (this.backdropEl) {
      this.renderer.removeChild(document.body, this.backdropEl);
      this.backdropEl = undefined;
    }
    this.renderer.removeStyle(document.body, "overflow");

    this.editForm.reset();
  }

  openViewApplicationModal(id: any) {
    const el = this.offcanvas_view.nativeElement;

    this.renderer.addClass(el, "show");
    this.renderer.setStyle(el, "visibility", "visible");
    this.renderer.setAttribute(el, "aria-modal", "true");
    this.renderer.removeAttribute(el, "aria-hidden");
    this.renderer.setStyle(document.body, "overflow", "hidden");

    this.backdropEl = this.renderer.createElement("div");
    this.renderer.addClass(this.backdropEl, "offcanvas-backdrop");
    this.renderer.addClass(this.backdropEl, "fade");
    this.renderer.addClass(this.backdropEl, "show");
    if (this.backdropEl) {
      this.backdropEl.addEventListener("click", () =>
        this.closeAddApplication()
      );
      this.renderer.appendChild(document.body, this.backdropEl);
    }

    this.backendService.getApplicationDetails(id).subscribe((res: any) => {
      this.applicationDetails = res.data;
    });
  }

  closeViewApplicationModal() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const panel = this.offcanvas_view.nativeElement;

    this.renderer.removeClass(panel, "show");
    const onTransition = (e: TransitionEvent) => {
      if (e.target === panel && e.propertyName.includes("transform")) {
        this.renderer.setStyle(panel, "visibility", "hidden");
        this.renderer.removeAttribute(panel, "aria-modal");
        this.renderer.setAttribute(panel, "aria-hidden", "true");
        this.renderer.removeStyle(document.body, "overflow");

        if (this.backdropEl) {
          this.renderer.removeChild(document.body, this.backdropEl);
          this.backdropEl = undefined;
        }
        document
          .querySelectorAll(".offcanvas-backdrop.fade.show")
          .forEach((backdrop) =>
            this.renderer.removeChild(document.body, backdrop)
          );
        this.renderer.removeStyle(panel, "transform");

        panel.removeEventListener("transitionend", onTransition);
      }
    };

    if (this.backdropEl) {
      this.renderer.removeChild(document.body, this.backdropEl);
      this.backdropEl = undefined;
    }
    this.renderer.removeStyle(document.body, "overflow");

    this.applicationDetails = null;
  }

  openThankYouModal() {
    const el = this.appSubmittedCanvas.nativeElement;

    this.renderer.addClass(el, "show");
    this.renderer.setStyle(el, "visibility", "visible");
    this.renderer.setAttribute(el, "aria-modal", "true");
    this.renderer.removeAttribute(el, "aria-hidden");
    this.renderer.setStyle(document.body, "overflow", "hidden");

    this.backdropEl = this.renderer.createElement("div");
    this.renderer.addClass(this.backdropEl, "offcanvas-backdrop");
    this.renderer.addClass(this.backdropEl, "fade");
    this.renderer.addClass(this.backdropEl, "show");
    if (this.backdropEl) {
      this.backdropEl.addEventListener("click", () =>
        this.closeThankYouModal()
      );
      this.renderer.appendChild(document.body, this.backdropEl);
    }
  }

  closeThankYouModal() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const el = this.appSubmittedCanvas.nativeElement;

    this.renderer.removeClass(el, "show");
    this.renderer.setStyle(el, "visibility", "hidden");
    this.renderer.removeAttribute(el, "aria-modal");
    this.renderer.setAttribute(el, "aria-hidden", "true");

    this.renderer.removeStyle(document.body, "overflow");

    if (this.backdropEl) {
      this.renderer.removeChild(document.body, this.backdropEl);
      this.backdropEl = undefined;
    }
  }

  openResendModal(data: any) {
    this.resendApplicationData = data;
    const el = this.resendCanvas.nativeElement;

    this.renderer.addClass(el, "show");
    this.renderer.setStyle(el, "visibility", "visible");
    this.renderer.setAttribute(el, "aria-modal", "true");
    this.renderer.removeAttribute(el, "aria-hidden");
    this.renderer.setStyle(document.body, "overflow", "hidden");

    this.backdropEl = this.renderer.createElement("div");
    this.renderer.addClass(this.backdropEl, "offcanvas-backdrop");
    this.renderer.addClass(this.backdropEl, "fade");
    this.renderer.addClass(this.backdropEl, "show");
    if (this.backdropEl) {
      this.backdropEl.addEventListener("click", () =>
        this.closeThankYouModal()
      );
      this.renderer.appendChild(document.body, this.backdropEl);
    }
  }

  closeResendModal() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const el = this.resendCanvas.nativeElement;

    this.renderer.removeClass(el, "show");
    this.renderer.setStyle(el, "visibility", "hidden");
    this.renderer.removeAttribute(el, "aria-modal");
    this.renderer.setAttribute(el, "aria-hidden", "true");

    this.renderer.removeStyle(document.body, "overflow");

    if (this.backdropEl) {
      this.renderer.removeChild(document.body, this.backdropEl);
      this.backdropEl = undefined;
    }
    this.resendApplicationData = undefined;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
  exportAsPDF(): void {
    if (!this.tableData?.length) return;

    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = { left: 20, right: 20 };

    doc.setFontSize(18);
    doc.text("Application List Detail", pageWidth / 2, 40, { align: "center" });

    const headers = [
      [
        "Reference no",
        "Employer Name",
        "Job Title",
        "Mobile",
        "Email",
        "Submission Date",
        "Status",
      ],
    ];

    const body = this.tableData.map((d) => [
      `R${d._id.slice(-3).toUpperCase()}`,
      d.firstName,
      d.jobTitle,
      d.mobile,
      d.email,

      new Date(d.createdAt).toLocaleDateString(),
      d.status,
    ]);

    autoTable(doc, {
      head: headers,
      body: body,
      startY: 60,
      margin,
      tableWidth: pageWidth - margin.left - margin.right,
      theme: "striped",

      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        halign: "center",
        valign: "middle",
      },
      bodyStyles: {
        halign: "center",
        valign: "middle",
      },
      styles: {
        fontSize: 8,
        cellPadding: 6,
        overflow: "ellipsize",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.save("ApplicationListDetail.pdf");
  }

  deleteUser(id: any) {
    this.deleteApplicationId = id;
    const panel = this.deleteUserCanvas.nativeElement;
    this.renderer.addClass(panel, "show");
    this.renderer.setStyle(panel, "visibility", "visible");
    this.renderer.setAttribute(panel, "aria-modal", "true");
    this.renderer.removeAttribute(panel, "aria-hidden");
    this.renderer.setStyle(document.body, "overflow", "hidden");
    this.editBackdrop = this.renderer.createElement("div");
    this.renderer.addClass(this.editBackdrop, "offcanvas-backdrop");
    this.renderer.addClass(this.editBackdrop, "fade");
    this.renderer.addClass(this.editBackdrop, "show");
    if (this.editBackdrop) {
      this.editBackdrop.addEventListener("click", () =>
        this.closeDeleteModal()
      );
    }
    this.renderer.appendChild(document.body, this.editBackdrop);
  }

  closeDeleteModal() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const panel = this.deleteUserCanvas.nativeElement;

    this.renderer.removeClass(panel, "show");
    this.renderer.setStyle(panel, "visibility", "hidden");
    this.renderer.removeAttribute(panel, "aria-modal");
    this.renderer.setAttribute(panel, "aria-hidden", "true");
    this.renderer.removeStyle(document.body, "overflow");
    if (this.editBackdrop) {
      this.renderer.removeChild(document.body, this.editBackdrop);
      this.editBackdrop = undefined;
    }

    document
      .querySelectorAll(".offcanvas-backdrop.fade.show")
      .forEach((backdrop) =>
        this.renderer.removeChild(document.body, backdrop)
      );
    this.renderer.removeStyle(panel, "transform");
    this.deleteApplicationId = undefined;
  }

  exportAsExcel(): void {
    if (!this.tableData?.length) return;

    const exportData = this.tableData.map((d) => ({
      ReferenceNo: `R${d._id.slice(-3).toUpperCase()}`,
      EmployerName: d.firstName,
      JobTitle: d.jobTitle,
      Mobile: d.mobile,
      Email: d.email,
      SubmissionDate: new Date(d.createdAt).toLocaleDateString(),
      Status: d.status,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData, {
      header: [
        "ReferenceNo",
        "EmployerName",
        "JobTitle",
        "Mobile",
        "Email",
        "SubmissionDate",
        "Status",
      ],
    });

    const range = XLSX.utils.decode_range(ws["!ref"]!);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[cell]) continue;
      ws[cell].s = {
        fill: { fgColor: { rgb: "297CB9" } },
        font: { bold: true, color: { rgb: "FFFFFF" } },
        alignment: { horizontal: "center" },
      };
    }

    ws["!cols"] = [
      { wch: 12 }, // ReferenceNo
      { wch: 20 }, // EmployerName
      { wch: 25 }, // JobTitle
      { wch: 15 }, // Mobile
      { wch: 25 }, // Email
      { wch: 18 }, // SubmissionDate
      { wch: 10 }, // Status
    ];

    const wb: XLSX.WorkBook = {
      Sheets: { ApplicationListDetail: ws },
      SheetNames: ["ApplicationListDetail"],
    };
    const buf = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    saveAs(
      new Blob([buf], { type: this.EXCEL_TYPE }),
      `ApplicationListDetail_${Date.now()}.xlsx`
    );
  }

  confirmDelete(event: MouseEvent) {
    (event.target as HTMLElement).blur();
    if (this.deleteApplicationId) {
      this.backend
        .deleteApplication(this.deleteApplicationId)
        .subscribe((res: any) => {
          if (res.status === "success") {
            this.toastr.success(res.message);
            this.getTableData(this.skip, this.pageSize);
            this.closeDeleteModal();
          } else {
            this.toastr.error("Please Try Again Later");
          }
        });
    }
  }

  confirmResend(event: MouseEvent) {
    (event.target as HTMLElement).blur();
    if (this.resendApplicationData) {
      let payload = {
        email: this.resendApplicationData.email,
        applicationId: this.resendApplicationData._id,
      };

      this.backend.applicationResend(payload).subscribe((res: any) => {
        if (res.status === "success") {
          this.toastr.success(res.message);
          this.getTableData(this.skip, this.pageSize);
          this.closeResendModal();
        } else {
          this.toastr.error("Please Try Again Later");
        }
      });
    }
  }
  onUpdateApplication() {
    if (this.editForm.invalid) return;
    const data = this.editForm.value;
    let payload = {
      _id: data._id,
      mobile: data.mobile.e164Number,
      status: data.status,
      jobTitle: data.jobTitle,
      email: data.email,
      firstName: data.firstName,
    };

    this.backend.updateApplication(payload).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.closeEditApplication();
        this.getTableData(this.skip, this.pageSize);
        this.editForm.reset();
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
  // toggleStatus(data: any) {
  //   const newStatus = data.status === "active" ? "inactive" : "active";
  //   const payload = {
  //     _id: data._id ?? data.id,
  //     status: newStatus,
  //   };

  //   this.backend.updateUser(payload).subscribe({
  //     next: (res: any) => {
  //       if (res?.status === "success" || res?.success === true) {
  //         data.status = newStatus;
  //         this.toastr.success(res.message || "Status updated");
  //         this.getTableData(this.skip, this.pageSize);
  //       } else {
  //         this.toastr.error(res?.message || "Failed to toggle status");
  //       }
  //     },
  //     error: (err: any) => {
  //       this.toastr.error("Failed to toggle status");
  //     },
  //   });
  // }
  toggleStatus(data: any) {
    const newStatus = data.status === "active" ? "inactive" : "active";
    const payload = {
      applicationId: data._id ?? data.id,
      status: newStatus,
    };

    this.backend.updateUser(payload).subscribe({
      next: (res: any) => {
        if (res?.status === "success" || res?.success === true) {
          data.status = newStatus;
          this.toastr.success(res.message || "Status updated");
          this.getTableData(this.skip, this.pageSize);
        } else {
          this.toastr.error(res?.message || "Failed to toggle status");
        }
      },
      error: (err: any) => {
        this.toastr.error("Failed to toggle status");
      },
    });
  }

  labelFilterInput(prefix = "pfilter"): void {
    this.setFilterId(prefix);
  }

  private setFilterId(prefix: string): void {
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

  private statusWeight(row: any): number {
    return (row.status ?? "").toLowerCase() === "inactive" ? 1 : 0;
  }

  private digitsOnly(s: string): string {
    return (s ?? "").toString().replace(/\D+/g, "");
  }

  private refSuffix(row: any): string {
    return (row?._id ?? "").slice(-3).toUpperCase();
  }

  private valueOf(row: any, key: string): any {
    switch (key) {
      case "createdAt":
        return new Date(row.createdAt).getTime() || 0;
      case "_id":
        return this.refSuffix(row);
      case "mobile":
        return this.digitsOnly(row.mobile);
      default:
        return (row[key] ?? "").toString();
    }
  }

  public sortData(sort: Sort): void {
    const data = [...this.tableData];

    if (!sort.active || sort.direction === "") {
      this.tableData = data.sort(
        (a, b) => this.statusWeight(a) - this.statusWeight(b)
      );
      this.dataSource.data = this.tableData;
      return;
    }

    const isAsc = sort.direction === "asc";

    data.sort((a, b) => {
      if (sort.active !== "status") {
        const sw = this.statusWeight(a) - this.statusWeight(b);
        if (sw !== 0) return sw;
      }

      const va = this.valueOf(a, sort.active);
      const vb = this.valueOf(b, sort.active);

      if (typeof va === "number" && typeof vb === "number") {
        return isAsc ? va - vb : vb - va;
      }
      return isAsc
        ? this.collator.compare(va, vb)
        : this.collator.compare(vb, va);
    });

    this.tableData = data;
    this.dataSource.data = this.tableData;
  }
  docData: any[] = [];
  // DOCS OFFCANVAS
  openDocs(user: any) {
    // this.currentUserId = user.userId;
    this.currentAppId = user._id;

    this.backend.getApplicationById(user._id).subscribe({
      next: (apiRes: any) => {
        const userData = apiRes.data;
        this.currentUserDocs = Object.entries(userData.documents)
          .filter(([key, value]: any) => {
            return key !== "additional" && value.url && value.url.trim() !== "";
          })
          .map(([key, value]: any, index) => ({
            id: index + 1,
            name: key.toUpperCase(),
            uploadDate: userData.createdAt,
            previewUrl: value.url,
            status: value.status,
            fileType: value.url ? "image" : "unknown",
            key: key,
          }));
        if (
          userData.documents.additional &&
          Array.isArray(userData.documents.additional)
        ) {
          const additionalDocs = userData.documents.additional
            .filter((doc: any) => doc.url && doc.url.trim() !== "")
            .map((doc: any, index: number) => ({
              id: this.currentUserDocs.length + index + 1,
              name: doc.name || `ADDITIONAL_DOC_${index + 1}`,
              uploadDate: doc.uploadDate || userData.createdAt,
              previewUrl: doc.url,
              status: doc.status || "pending",
              fileType: "image",

              key: `additional[${index}]`,
            }));

          this.currentUserDocs = [...this.currentUserDocs, ...additionalDocs];
        }

        // MAP OTHER APPLICATION SECTIONS

        this.docData = this.mapApiResponseToDocData(userData);
        console.log(this.docData);
      },
      error: (err) => {
        this.toastr.error("Failed to load user details");
        console.error("Error loading user details:", err);
      },
    });

    const panel = this.docsCanvas.nativeElement;
    this.renderer.addClass(panel, "show");
    this.renderer.setStyle(panel, "visibility", "visible");
    this.renderer.setAttribute(panel, "aria-modal", "true");
    this.renderer.removeAttribute(panel, "aria-hidden");
    this.renderer.setStyle(document.body, "overflow", "hidden");

    // BACKDROP
    this.docsBackdrop = this.renderer.createElement("div");
    this.renderer.addClass(this.docsBackdrop, "offcanvas-backdrop");
    this.renderer.addClass(this.docsBackdrop, "fade");
    this.renderer.addClass(this.docsBackdrop, "show");

    if (this.docsBackdrop) {
      this.docsBackdrop.addEventListener("click", () => this.closeDocs());
    }

    this.renderer.appendChild(document.body, this.docsBackdrop);
  }
  // Add this new method to map API response to your docData structure

  getRegion(location?: string | null): string {
    if (!location) return "";
    return location.split(",")[1]?.trim() || "";
  }
  private mapApiResponseToDocData(userData: any): any[] {
    return [
      {
        section: "Personal Information",
        fields: [
          {
            label: "Given Name (English)",
            value: userData.userNameEnglish || "N/A",
          },
          {
            label: "Surname (English)",
            value: userData.surnameEnglish || "N/A",
          },
          {
            label: "Given Name  (Georgian / ქართული)",
            value: userData.userNameGeorgian || "N/A",
          },
          {
            label: "Surname  (Georgian / ქართული)",
            value: userData.surnameGeorgian || "N/A",
          },
          { label: "City/Region", value: userData.location || "N/A" },
          { label: "Citizenship", value: userData.citizenship || "N/A" },
          {
            label: "Document Type",
            value: this.formatDocumentType(userData.documentType) || "N/A",
          },
          {
            label: "Document Number",
            value: userData.documentNumber?.toString() || "N/A",
          },
          {
            label: "Date of Birth",
            value: this.formatDateDisplay(userData.dateOfBirth) || "N/A",
          },
          {
            label: "Gender",
            value: this.formatGender(userData.gender) || "N/A",
          },
          { label: "Marital Status", value: userData.martialStatus }, // This field doesn't exist in API
          { label: "Contact Number", value: userData.phone || "N/A" },
          { label: "Email Address", value: userData.email || "N/A" },
          { label: "Legal Home Address", value: userData.legalAdress || "N/A" },
        ],
      },
      {
        section: "Education",
        fields: this.mapEducationData(userData.education),
      },
      {
        section: "Work Experience",
        fields: this.mapWorkExperienceData(userData.workExperience),
      },
      {
        section: "Bank Information",
        fields: [
          {
            label: "Account Holder Name",
            value: userData.accountHolderName || "N/A",
          },
          { label: "Account Number", value: userData.accountNumber || "N/A" },
          { label: "Bank Name", value: userData.bankName || "N/A" },
        ],
      },
      {
        section: "Emergency Contact",
        fields: [
          { label: "Full Name", value: userData.emergencyFullName || "N/A" },
          {
            label: "Relationship",
            value: userData.emergencyRelationship || "N/A",
          },
          {
            label: "Contact Number",
            value: userData.emergencyContactNumber || "N/A",
          },
          { label: "Address", value: userData.emergencyAddress || "N/A" },
        ],
      },
      {
        section: "Skills & Languages",
        fields: [
          { label: "Skill Rating", value: userData.skillRating || "N/A" },
          {
            label: "Computer Skills",
            value: this.formatArrayData(userData.computerSkills) || "N/A",
          },
          {
            label: "Administrative Skills",
            value: this.formatArrayData(userData.administrativeSkills) || "N/A",
          },
          {
            label: "Languages",
            value: this.formatLanguages(userData.languages) || "N/A",
          },
        ],
      },
      {
        section: "Work Status",
        fields: [
          {
            label: "Allowed to Work",
            value: userData.allowedToWork ? "Yes" : "No",
          },
        ],
      },
    ];
  }

  // Helper methods for data formatting
  private formatDocumentType(docType: string): string {
    const types: { [key: string]: string } = {
      residencePermit: "Residence Permit",
      passport: "Passport",
      idCard: "ID Card",
    };
    return types[docType] || docType;
  }

  private formatGender(gender: string): string {
    return gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "N/A";
  }

  private formatDateDisplay(dateString: string): string {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  }

  private mapEducationData(education: any[]): any[] {
    if (!education || education.length === 0) {
      return [{ label: "No education data available", value: "" }];
    }

    const fields: any = [];
    education.forEach((edu, index) => {
      if (index > 0) fields.push({ label: "", value: "---" }); // Separator for multiple entries

      fields.push(
        { label: "From (MM/YYYY)", value: edu.from || "N/A" },
        { label: "To (MM/YYYY)", value: edu.to || "N/A" },
        { label: "Institution", value: edu.institution || "N/A" },
        { label: "Qualification", value: edu.qualification || "N/A" },
        { label: "Notes", value: edu.notes || "N/A" },
        {
          label: "Currently Studying",
          value: edu.currentlyStudying ? "Yes" : "No",
        }
      );
    });

    return fields;
  }

  private mapWorkExperienceData(workExperience: any[]): any[] {
    if (!workExperience || workExperience.length === 0) {
      return [{ label: "No work experience data available", value: "" }];
    }

    const fields: any = [];
    workExperience.forEach((work, index) => {
      if (index > 0) fields.push({ label: "", value: "---" }); // Separator for multiple entries

      fields.push(
        { label: "Company Name", value: work.companyName || "N/A" },
        { label: "City, Country", value: work.cityCountry || "N/A" },
        { label: "Job Title / Position", value: work.jobTitle || "N/A" },
        {
          label: "Employment Period",
          value: `${work.from || "N/A"} → ${work.to || "N/A"}`,
        },
        {
          label: "Gross Salary",
          value: work.grossSalary ? `$${work.grossSalary} / month` : "N/A",
        },
        { label: "Reason for Leaving", value: work.reasonForLeaving || "N/A" },
        {
          label: "Still Working Here",
          value: work.stillWorking ? "Yes" : "No",
        },
        { label: "Additional Notes", value: work.notes || "N/A" }
      );
    });

    return fields;
  }

  private formatArrayData(arrayData: any[]): string {
    if (!arrayData || arrayData.length === 0) return "N/A";

    return arrayData
      .map((item) => {
        if (typeof item === "string") {
          try {
            const parsed = JSON.parse(item);
            return Array.isArray(parsed) ? parsed.join(", ") : parsed;
          } catch {
            return item;
          }
        }
        return item;
      })
      .filter((item) => item && item !== "[]" && item !== "[]")
      .join(", ");
  }

  private formatLanguages(languages: any[]): string {
    if (!languages || languages.length === 0) return "N/A";

    return languages
      .map((lang) => `${lang.language} (${lang.level})`)
      .join(", ");
  }

  closeDocs() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const panel = this.docsCanvas.nativeElement;

    this.renderer.removeClass(panel, "show");

    const onTransition = (e: TransitionEvent) => {
      if (e.target === panel && e.propertyName.includes("transform")) {
        // hide offcanvas
        this.renderer.setStyle(panel, "visibility", "hidden");
        this.renderer.removeAttribute(panel, "aria-modal");
        this.renderer.setAttribute(panel, "aria-hidden", "true");

        this.renderer.removeStyle(document.body, "overflow");

        if (this.docsBackdrop) {
          this.renderer.removeChild(document.body, this.docsBackdrop);
          this.docsBackdrop = undefined;
        }

        document
          .querySelectorAll(".offcanvas-backdrop.fade.show")
          .forEach((backdrop) =>
            this.renderer.removeChild(document.body, backdrop)
          );

        this.renderer.removeStyle(panel, "transform");

        panel.removeEventListener("transitionend", onTransition);
      }
    };

    panel.addEventListener("transitionend", onTransition);

    if (this.docsBackdrop) {
      this.renderer.removeChild(document.body, this.docsBackdrop);
      this.docsBackdrop = undefined;
    }

    this.renderer.removeStyle(document.body, "overflow");
  }

  selectedDoc: DocumentItem | null = null;
  showPreview: boolean = false;

  closePreview() {
    this.showPreview = false;
    this.selectedDoc = null;
  }
  approve(doc: any) {
    let payload: any = {
      applicationId: this.currentAppId,
      status: "approved",
    };

    if (doc.key.startsWith("additional[")) {
      const index = Number(doc.key.match(/\[(\d+)\]/)[1]);

      payload.documentKey = "additional";
      payload.index = index;
    } else {
      payload.documentKey = doc.key;
    }

    this.backend.updateDocStatus(payload).subscribe({
      next: (res: any) => {
        const msg = res?.meta?.message || "Document approved successfully";
        this.toastr.success(msg, "Success");

        this.currentUserDocs = this.currentUserDocs.map((d) =>
          d.key === doc.key ? { ...d, status: "approved" } : d
        );

        this.getTableData(this.skip, this.pageSize);
        this.closePreview();
      },
      error: (err) => {
        const errorMsg =
          err?.error?.meta?.message ||
          err?.error?.message ||
          "Something went wrong";
        this.toastr.error(errorMsg, "Error");
      },
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getBadgeClass(status: string) {
    return {
      pending: "badge bg-warning text-dark",
      approved: "badge bg-success",
      rejected: "badge bg-danger",
    }[status];
  }

  openPreview(doc: DocumentItem) {
    this.selectedDoc = doc;
    this.showPreview = true;
  }

  onRowClick(doc: DocumentItem) {
    this.openPreview(doc);
  }

  pendingCount() {
    return this.currentUserDocs.filter((d) => d.status === "pending").length;
  }
  approvedCount() {
    return this.currentUserDocs.filter((d) => d.status === "approved").length;
  }
  rejectedCount() {
    return this.currentUserDocs.filter((d) => d.status === "rejected").length;
  }

  toggleSection(i: number) {
    this.openedIndex = this.openedIndex === i ? null : i;
  }

  toggleDocs() {
    this.docsOpen = !this.docsOpen;
  }

  isTraineeApproved: boolean = false;

  allDocsApproved(): boolean {
    if (!this.currentUserDocs || this.currentUserDocs.length === 0)
      return false;
    return this.currentUserDocs.every((doc) => doc.status === "approved");
  }

  approveTrainee() {
    const payload = {
      applicationId: this.currentAppId,
      role: "TRAINEE",
    };

    this.backend.updateUser(payload).subscribe({
      next: (res: any) => {
        if (res?.status === "success" || res?.success === true) {
          this.isTraineeApproved = true;

          this.toastr.success(res.message || "Status updated");
          this.getTableData(this.skip, this.pageSize);
        } else {
          this.toastr.error(res?.message || "Failed to Update status");
        }
        this.closeDocs();
      },
      error: () => {
        this.toastr.error("Failed to toggle status");
        this.closeDocs();
      },
    });
  }

  // Documents status
  getDocumentsStatus(user: any): "uploaded" | "pending" {
    if (!user?.documents) return "pending";

    const docs = user.documents;

    const mainDocs = ["doc1", "doc2", "doc3", "doc4"];
    const hasEmptyMainDoc = mainDocs.some((key) => {
      const doc = docs[key];
      return !doc?.url || doc.url.trim() === "";
    });

    if (hasEmptyMainDoc) {
      return "pending";
    }

    if (
      docs.additional &&
      Array.isArray(docs.additional) &&
      docs.additional.length > 0
    ) {
      const hasEmptyAdditionalDoc = docs.additional.some(
        (doc: any) => !doc?.url || doc.url.trim() === ""
      );

      if (hasEmptyAdditionalDoc) {
        return "pending";
      }
    }

    return "uploaded";
  }

  // Reject reason modal
  showRejectModal = false;
  selectedReason: string = "";
  customReason: string = "";
  currentRejectDoc: any = null;

  selectReason(event: any) {
    this.selectedReason = event.target.value;
  }

  reject(doc: any) {
    this.currentRejectDoc = doc;
    this.selectedReason = "";
    this.customReason = "";
    this.showRejectModal = true;
  }

  submitRejectReason() {
    let finalReason = this.selectedReason;

    if (!finalReason) {
      this.toastr.error("Please select a reason.");
      return;
    }

    if (finalReason === "other") {
      if (!this.customReason.trim()) {
        this.toastr.error("Please type a comment.");
        return;
      }
      finalReason = this.customReason;
    }

    let payload: any = {
      applicationId: this.currentAppId,
      status: "rejected",
      remarks: finalReason,
    };

    if (this.currentRejectDoc.key.startsWith("additional[")) {
      const index = Number(this.currentRejectDoc.key.match(/\[(\d+)\]/)[1]);

      payload.documentKey = "additional";
      payload.index = index;
    } else {
      payload.documentKey = this.currentRejectDoc.key;
    }

    this.backend.updateDocStatus(payload).subscribe({
      next: (res: any) => {
        if (res?.status === "success" || res?.success === true) {
          this.currentRejectDoc.status = "rejected";

          this.toastr.success("Document rejected successfully");
          this.showRejectModal = false;
          this.getTableData(this.skip, this.pageSize);
        } else {
          this.toastr.error(res?.message || "Document not added!");
          this.showRejectModal = false;
        }
      },
      error: (err) => {
        this.showRejectModal = false;
        this.toastr.error(err?.error?.message || "Document not added!");
      },
    });
  }

  closeRejectModal() {
    this.showRejectModal = false;
    this.selectedReason = "";
    this.customReason = "";
  }

  // docData = [
  //   {
  //     section: 'Personal Information',
  //     fields: [
  //       { label: 'Given Name (English)', value: 'Areesh' },
  //       { label: 'Surname (Georgian)', value: 'ქართული' },
  //       { label: 'Citizenship', value: 'Georgia' },
  //       { label: 'Document Type ', value: 'Georgian ID Card' },
  //       { label: 'Document Number', value: '1997865' },
  //       { label: 'Date of Birth', value: '1998-06-15' },
  //       { label: 'Gender', value: 'Male' },
  //       { label: 'Marital Status ', value: 'Single' },
  //       { label: 'Contact Number', value: '+99556830' },
  //       { label: 'Email Address', value: 'areesh@gmail.com' },
  //       { label: 'Legal Home Address', value: '12 Rustaveli Avenue,Apartment 34,Tbilisi 0108,Georgia' },
  //     ]
  //   },

  //   {
  //     section: 'Education',
  //     entries: [
  //       {
  //         title: 'Education 1',
  //         fields: [
  //           { label: 'From (MM/YYYY)', value: '09/2018' },
  //           { label: 'To (MM/YYYY)', value: '06/2022' },
  //           { label: 'Institution', value: 'Tbilisi State University' },
  //           { label: 'Qualification', value: 'Bachelors in CS' },
  //           { label: 'Notes', value: 'Graduated with strong academic performance' },
  //           { label: 'Currently Studying', value: 'No' },
  //         ]
  //       },
  //       {
  //         title: 'Education 2',
  //         fields: [
  //           { label: 'From (MM/YYYY)', value: '09/2023' },
  //           { label: 'To (MM/YYYY)', value: 'Present' },
  //           { label: 'Institution', value: 'Ilia State University' },
  //           { label: 'Qualification', value: 'Masters in AI' },
  //           { label: 'Notes', value: 'Research on Machine Learning' },
  //           { label: 'Currently Studying', value: 'Yes' },
  //         ]
  //       }
  //     ]
  //   },

  //   {
  //     section: 'Work Experience',
  //     entries: [
  //       {
  //         title: 'Work Experience 1',
  //         fields: [
  //           { label: 'Company Name', value: 'TechSolutions LLC' },
  //           { label: 'City, Country', value: 'Tbilisi, Georgia' },
  //           { label: 'Job Title / Position', value: 'Frontend Developer' },
  //           { label: 'Employment Period', value: '08/2020 → 12/2023' },
  //           { label: 'Gross Salary', value: '$1200/month' },
  //           { label: 'Reason for Leaving', value: 'Career growth opportunity' },
  //           { label: 'Still Working Here', value: 'No' },
  //           { label: 'Additional Notes', value: 'Angular-based enterprise apps' },
  //         ]
  //       },
  //       {
  //         title: 'Work Experience 2',
  //         fields: [
  //           { label: 'Company Name', value: 'GlobalTech' },
  //           { label: 'City, Country', value: 'Batumi, Georgia' },
  //           { label: 'Job Title / Position', value: 'Senior Frontend Engineer' },
  //           { label: 'Employment Period', value: '01/2024 → Present' },
  //           { label: 'Gross Salary', value: '$1800/month' },
  //           { label: 'Reason for Leaving', value: '-' },
  //           { label: 'Still Working Here', value: 'Yes' },
  //           { label: 'Additional Notes', value: 'Leading Angular migration project' },
  //         ]
  //       }
  //     ]
  //   },

  //   {
  //     section: "Skills",
  //     entries: [
  //       {
  //         title: 'Computer Skills',
  //         fields: [
  //           { label: 'Microsoft Word', value: "Advance" },
  //           { label: 'Microsoft Excel', value: "Intermediate" },
  //         ]
  //       },
  //       {
  //         title: 'Administrative Skills',
  //         fields: [
  //           { label: 'Record Keeping', value: 'Advance' },
  //           { label: 'Office Management', value: 'Expert' },

  //         ]
  //       }
  //     ]
  //   },

  //   {
  //     section: "Bank Details",
  //     fields: [
  //       { label: 'Bank Name', value: 'TCB Bank' },
  //       { label: 'Account Number (IBAN)', value: 'GE08BG0000000586711374' },
  //       { label: 'Account Holder Name', value: 'Areesh' },
  //     ]
  //   },

  //   {
  //     section: "Emergency Contact",
  //     fields: [
  //       { label: 'Full Name', value: 'John Doe' },
  //       { label: 'Relationship', value: 'Brother' },
  //       { label: 'Address', value: 'Tbilisi, Georgia' },
  //       { label: 'Contact Number', value: '+995 555 123456' },
  //       { label: 'Notes (optional)', value: 'N/A' }
  //     ]
  //   },
  // ];
}
