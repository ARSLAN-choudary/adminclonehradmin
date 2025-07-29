import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
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
  @ViewChild("addCanvas", { static: true })
  addCanvas!: ElementRef<HTMLElement>;
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

  editForm = new FormGroup({
    mobile: new FormControl<PhoneInputValue | null>(null, Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  editApplication(data: any) {
    const phoneObj: PhoneInputValue = {
      number: data.mobile,
      nationalNumber: data.mobile,
      internationalNumber: `+92 ${data.mobile}`,
      e164Number: `+92${data.mobile}`,
      countryCode: "pk",
      dialCode: "92",
    };

    this.editForm.patchValue({
      mobile: phoneObj,
      email: data.email,
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
    private renderer: Renderer2
  ) {}

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
    //
    // When pagination emits new page info
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url === this.routes.dataTable) {
        this.pageSize = res.pageSize;
        this.skip = res.skip;
        this.getTableData(res.skip, res.pageSize);
      }
    });
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

    this.backendService.getApplications(payload).subscribe((apiRes: any) => {
      this.actualData = apiRes.data.data ?? [];
      this.totalData = apiRes.totalData ?? this.actualData.length;
      this.tableData = [...this.actualData];
      console.log(this.tableData);

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

  trackById(_: number, item: manageUsers) {
    return (item as any).id ?? item.customer_no ?? item.email;
  }

  gotoLink() {
    const baseUrl = window.location.origin;
    window.open(`${baseUrl}/userDetails`, "_blank");
  }

  passResendApplicationData(data: any) {
    this.resendApplicationData = data;
  }

  onResendConfirm() {}

  onSaveChanges() {
    if (this.editForm.invalid) return;
    const updated = this.editForm.value;

    console.log("Saving changes for", updated);
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

        this.getTableData(this.skip, this.pageSize);

        this.addNewApplicationForm.reset();
      } else {
        this.toastr.error("User Not Created, Please Try Again Later");
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
    const el = this.addCanvas.nativeElement;

    // 1) hide the panel
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
}
