import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
import { MatInput } from "@angular/material/input";
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
  @ViewChild("addCanvas", { static: true }) addCanvas!: ElementRef<HTMLElement>;
  addNewApplicationForm!: FormGroup;
  public routes = routes;
  editUserData!: any;
  companies: { label: string; value: string }[] = [];
  resendApplicationData!: any;

  public tableData: any[] = [];
  public tableDataCopy: manageUsers[] = [];
  public actualData: manageUsers[] = [];
  public dataSource!: MatTableDataSource<manageUsers>;

  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  public searchDataValue = "";
  public row = true;
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
    private fb: FormBuilder
  ) {
    this.data.getNewApplication().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data ?? [];
      this.totalData = apiRes.totalData ?? this.actualData.length;

      this.initDataSource(this.actualData);

      this.tableData = [...this.actualData];
      this.serialNumberArray = this.tableData.map((_, i) => i + 1);

      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });

      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.manageUsers) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
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
      console.log("companies payload:", res.data.data);
      this.companies = res.data.data.map((c: any) => ({
        label: c.name,
        value: c._id,
      }));
    });
  }

  control(name: string) {
    return this.addNewApplicationForm.get(name)!;
  }

  private initDataSource(data: manageUsers[]): void {
    this.dataSource = new MatTableDataSource<manageUsers>(data);
    this.dataSource.filterPredicate = (row: manageUsers, filter: string) => {
      const term = filter.trim().toLowerCase();

      return [
        row.customer_name,
        row.customer_no,
        row.phone,
        row.email,
        row.status,
        (row as any).created,
        (row as any).last_activity,
      ]
        .map((v) => (v ?? "").toString().toLowerCase())
        .some((v) => v.includes(term));
    };
  }

  private getTableData(pageOption: pageSelection): void {
    this.tableData = [];
    this.tableDataCopy = [];
    this.serialNumberArray = [];

    this.actualData.forEach((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
        (res as any).id = serialNumber;
        this.tableData.push(res);
        this.tableDataCopy.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });

    this.row = this.tableData.length > 0;

    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      tableDataCopy: this.tableDataCopy,
      serialNumberArray: this.serialNumberArray,
    });
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === "") {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === "asc" ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.dataSource.filter = this.searchDataValue;

    this.tableData = this.dataSource.filteredData;
    this.row = this.tableData.length > 0;
    if (this.searchDataValue !== "") {
      this.pagination.calculatePageSize.next({
        totalData: this.tableData.length,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.tableData.map((_, i) => i + 1),
      });
    } else {
      this.getTableData({ skip: 0, limit: this.pageSize });
    }
  }

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  onClickStar(item: manageUsers) {
    item.isStarActive = !item.isStarActive;
  }

  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => (f.isSelected = true));
    } else {
      this.tableData.forEach((f) => (f.isSelected = false));
    }
  }

  trackById(_: number, item: manageUsers) {
    return (item as any).id ?? item.customer_no ?? item.email;
  }

  gotoLink() {
    const baseUrl = window.location.origin;
    window.open(`${baseUrl}/goto`, "_blank");
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
      
        this.addNewApplicationForm.reset();
      } else {
        this.toastr.error("User Not Created, Please Try Again Later");
      }
    });
  }
}
