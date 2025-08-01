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
import { DomSanitizer } from "@angular/platform-browser";
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

interface PhoneInputValue {
  number: string;
  nationalNumber: string;
  internationalNumber: string;
  e164Number: string;
  countryCode: string;
  dialCode: string;
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
  ],
  templateUrl: "./new-application.component.html",
  styleUrl: "./new-application.component.scss",
})
export class NewApplicationComponent implements OnInit {
  @ViewChild("deleteUserCanvas", { static: true })
  deleteUserCanvas!: ElementRef<HTMLElement>;
  @ViewChild("editCanvas", { static: true })
  editCanvas!: ElementRef<HTMLElement>;
  @ViewChild("addCanvas", { static: true })
  addCanvas!: ElementRef<HTMLElement>;

  @ViewChild("resendCanvas", { static: true })
  resendCanvas!: ElementRef<HTMLElement>;
  editForm: FormGroup;
  inActiveApplications: WritableSignal<number> = signal(0);
  activeApplications: WritableSignal<number> = signal(0);
  private editBackdrop?: HTMLElement;
  @ViewChild("offcanvas_view", { static: true })
  offcanvas_view!: ElementRef<HTMLElement>;

  deleteApplicationId!: any;
  @ViewChild("appSubmittedCanvas", { static: true })
  appSubmittedCanvas!: ElementRef<HTMLElement>;
  applicationDetails!: any;

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
      // console.log("companies payload:", res.data.data);
      this.companies = res.data.data.map((c: any) => ({
        label: c.name,
        value: c._id,
      }));
    });

    this.getTableData(this.skip, this.pageSize);

    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url === this.routes.dataTable) {
        this.pageSize = res.pageSize;
        this.skip = res.skip;
        this.getTableData(res.skip, res.pageSize);
      }
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
    this.skip = 0; // Reset to first page
    this.getTableData(this.skip, this.pageSize);
  }

  public sortData(sort: Sort): void {
    this.getTableData(this.skip, this.pageSize);
  }

  // public selectAll(initChecked: boolean): void {
  //   this.tableData.forEach((f) => (f.isSelected = !initChecked));
  // }

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

        // if (res.data) {
        //   const id = res.data._id;
        //   this.router.navigate(["/userDetails", id]);
        // }

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
    // if (this.resendApplicationData) {
    //   this.backend
    //     .deleteApplication(this.deleteApplicationId)
    //     .subscribe((res: any) => {
    //       if (res.status === "success") {
    //         this.toastr.success(res.message);
    //         this.getTableData(this.skip, this.pageSize);
    //         this.closeDeleteModal();
    //       } else {
    //         this.toastr.error("Please Try Again Later");
    //       }
    //     });
    // }
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
  toggleStatus(data: any) {
    const newStatus = data.status === "active" ? "inactive" : "active";
    const payload = {
      _id: data._id ?? data.id,
      status: newStatus,
    };

    this.backend.updateApplication(payload).subscribe({
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
}
