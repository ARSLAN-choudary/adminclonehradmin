import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";
import { CollapseHeaderComponent } from "../../../common/collapse-header/collapse-header.component";
import { DateRangePickerComponent } from "../../../common/date-range-picker/date-range-picker.component";
import { SelectModule } from "primeng/select";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { routes } from "../../../../shared/routes/routes";
import { Router, RouterLink } from "@angular/router";
import {
  apiResultFormat,
  superadmincompanies,
} from "../../../../shared/model/pages.model";
import { MatTableDataSource } from "@angular/material/table";
import { DataService } from "../../../../shared/data/data.service";
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from "../../../../shared/custom-pagination/pagination.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MatSortModule, Sort } from "@angular/material/sort";
import { CustomPaginationComponent } from "../../../../shared/custom-pagination/custom-pagination.component";
import { HttpClient } from "@angular/common/http";
import { BackendService } from "../../../../Services/backend.service";

BackendService;

interface select {
  data: string;
}

@Component({
  selector: "app-companies",
  imports: [
    CollapseHeaderComponent,
    DateRangePickerComponent,
    SelectModule,
    FormsModule,
    CommonModule,
    BsDatepickerModule,
    RouterLink,
    CustomPaginationComponent,
    MatSortModule,
    ReactiveFormsModule,
  ],

  templateUrl: "./companies.component.html",
  styleUrl: "./companies.component.scss",
})
export class CompaniesComponent {
  startDate: string = "";
  endDate: string = "";
  routes = routes;
  select!: select[];
  select2!: select[];
  select3!: select[];
  select4!: select[];
  select5: any[] = [];
  selected!: select[];
  selected2!: select[];
  selected3!: select[];
  selected4!: select[];
  check: boolean = false;
  selectedCountry: any = "Malta";
  createNewCompanyForm!: FormGroup;
  // currencies: any[] = [];
  // countries: any;
  passwordsDoNotMatch = false;
  confirmTouched = false;
  currencies = [
    { label: "EURO", value: "EURO" },
    { label: "AED", value: "AED" },
    { label: "USD", value: "USD" },
    { label: "POUND", value: "POUND" },
  ];

  countries = [
    { label: "United Arab Emirates", value: "uae" },
    { label: "Georgia", value: "georgia" },
    { label: "Malta", value: "malta" },
    { label: "United Kingdom", value: "uk" },
    { label: "USA", value: "usa" },
    { label: "Netherlands", value: "netherlands" },
    { label: "Serbia", value: "serbia" },
  ];
  constructor(
    private pagination: PaginationService,
    private router: Router,
    private fb: FormBuilder,
    private backendService: BackendService,
    private cdRef: ChangeDetectorRef
  ) {
    let req: any = {
      startDate: "",
      endDate: "",
      draw: 1,
      start: 0,
      length: 100,
      columns: [],
      order: [],
      search: {
        value: "",
      },
    };
    this.getCompanyList(req);
  }
  ngOnInit(): void {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      this.pageSize = res.pageSize;
      this.getTableData({ skip: res.skip, limit: res.limit });
    });

    this.initCreateNewCompanyForm();
  }

  initCreateNewCompanyForm() {
    this.createNewCompanyForm = this.fb.group({
      files: [null, [Validators.required, this.pdfAndSizeValidator]],
      country: ["", Validators.required],

      // all other fields start disabled
      name: [{ value: "", disabled: true }, Validators.required],
      registrationNo: [{ value: "", disabled: true }, Validators.required],
      vatNo: [{ value: "", disabled: true }, Validators.required],
      peNo: [{ value: "", disabled: true }, Validators.required],
      jobplusemployeryno: [{ value: "", disabled: true }, Validators.required],
      currency: [{ value: "", disabled: true }, Validators.required],
      phoneNO: [{ value: "", disabled: true }, Validators.required],
      email: [""],
      address: [""],
      website: ["", Validators.pattern(/^https?:\/\//)],
      incorporatonDate: [{ value: "", disabled: true }, Validators.required],
      password: [
        { value: "", disabled: true },
        [Validators.required, Validators.minLength(8)],
      ],
      status: [{ value: "active", disabled: true }, Validators.required],
    });
    const maltaFields = [
      "name",
      "registrationNo",
      "vatNo",
      "peNo",
      "jobplusemployeryno",
      "currency",
      "phoneNO",
      "incorporatonDate",
      "password",
      "status",
    ];

    this.createNewCompanyForm
      .get("country")!
      .valueChanges.subscribe((country) => {
        const isMalta = country === "malta";
        this.isMalta = isMalta;

        maltaFields.forEach((field) => {
          const ctrl = this.createNewCompanyForm.get(field)!;
          if (country === "malta") {
            ctrl.enable({ emitEvent: false });
          } else {
            ctrl.disable({ emitEvent: false });
            ctrl.reset("", { emitEvent: false });
          }
          // leave the original validators in place
          ctrl.updateValueAndValidity({ emitEvent: false });
        });
      });
  }
  getCompanyList(data: any) {
    this.backendService.getCompany(data).subscribe((apiRes: any) => {
      this.actualData = apiRes.data.data;
      this.totalData = apiRes.recordsTotal;

      this.pagination.tablePageSize.subscribe((res: any) => {
        if (this.router.url === this.routes.superAdminCompanies) {
          this.pageSize = res.pageSize;
          this.getTableData({ skip: res.skip, limit: res.limit });
        }
      });
    });
  }
  pdfAndSizeValidator(control: AbstractControl): ValidationErrors | null {
    const files: File[] = control.value as File[];
    if (!files || files.length === 0) {
      return { required: true };
    }
    for (let f of files) {
      if (f.type !== "application/pdf") {
        return { invalidType: true };
      }
      if (f.size > 5 * 1024 * 1024) {
        return { fileTooLarge: true };
      }
    }
    return null;
  }

  onFilesSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files) return;
    const arr = Array.from(input.files);
    this.control("files").setValue(arr);
    this.control("files").markAsTouched();
    input.value = "";
  }
  checkMatch(confirmValue: string) {
    const pw = this.control("password").value;
    this.passwordsDoNotMatch = pw !== confirmValue;
  }

  onSubmit() {
    if (this.createNewCompanyForm.invalid || this.passwordsDoNotMatch) {
      console.log(this.createNewCompanyForm.value);
      this.createNewCompanyForm.markAllAsTouched();
      this.confirmTouched = true;
      return;
    }

    const formData = new FormData();
    const v = this.createNewCompanyForm.value;

    Object.entries(v).forEach(([key, val]) => {
      if (key === "files" && Array.isArray(val)) {
        val.forEach((file: File) => formData.append("files", file, file.name));
      } else {
        formData.append(key, String(val));
      }
    });

    this.backendService.addCompany(formData).subscribe({
      next: () => {},
      error: console.error,
    });
  }

  control(name: string) {
    return this.createNewCompanyForm.get(name)!;
  }

  password: boolean[] = [false];

  togglePassword(i: number): void {
    this.password[i] = !this.password[i];
  }

  public tableData: any[] = [];
  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<superadmincompanies>;
  public searchDataValue!: any;
  public tableDataCopy: any[] = [];
  public actualData: any[] = [];

  initChecked = false;

  onClickStar(item: superadmincompanies) {
    item.isStarActive = !item.isStarActive;
  }

  private getTableData(pageOption: pageSelection): void {
    const { skip, limit } = pageOption;
    this.tableData = [];
    this.serialNumberArray = [];

    const slicedData = this.actualData.slice(0, limit);

    slicedData.forEach((res, index) => {
      const serialNumber = skip + index + 1;
      res.id = serialNumber;
      this.tableData.push(res);
      this.serialNumberArray.push(serialNumber);
    });

    this.tableDataCopy = [...this.tableData];
    this.dataSource = new MatTableDataSource<any>(this.tableData);

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
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === "asc" ? 1 : -1);
      });
    }
  }

  public row = true;
  isMalta: any;

  // public searchData(value: string): void {
  //   this.searchDataValue = value.trim().toLowerCase();

  //   let req = {
  //     startDate: "2025-07-01",
  //     endDate: "2025-07-27",
  //     draw: 1,
  //     start: 0,
  //     length: 10,
  //     columns: [],
  //     order: [],
  //     search: {
  //       value: this.searchDataValue,
  //     },
  //   };
  //   this.backendService.getCompany(req).subscribe((apiRes: any) => {
  //     this.actualData = apiRes.data.data;
  //     this.totalData = apiRes.totalData;

  //     this.pagination.tablePageSize.subscribe((res: any) => {
  //       if (this.router.url === this.routes.superAdminCompanies) {
  //         this.pageSize = res.pageSize;
  //         this.getTableData({ skip: res.skip, limit: res.limit });
  //       }
  //     });
  //   });

  //   this.dataSource.filter = this.searchDataValue;
  //   this.tableData = this.dataSource.filteredData;
  //   this.row = this.tableData.length > 0;

  //   if (this.searchDataValue !== "") {
  //     // Handle filtered data
  //     this.pagination.calculatePageSize.next({
  //       totalData: this.tableData.length,
  //       pageSize: this.pageSize,
  //       tableData: this.tableData,
  //       serialNumberArray: this.tableData.map((_, i) => i + 1),
  //     });
  //   } else {
  //     // Handle reset to full data
  //     this.pagination.calculatePageSize.next({
  //       totalData: this.totalData,
  //       pageSize: this.pageSize,
  //       tableData: this.tableData,
  //       serialNumberArray: this.serialNumberArray,
  //     });
  //   }
  // }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  onDateRangeChange(event: { startDate: Date; endDate: Date }) {
    this.startDate = this.formatDate(event.startDate);
    this.endDate = this.formatDate(event.endDate);

    this.searchData(this.searchDataValue || "");
  }

  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();

    const paginationSettings = { skip: 0, limit: this.pageSize };

    const req = {
      startDate: this.startDate || "2025-07-01",
      endDate: this.endDate || "2025-07-27",
      draw: 1,
      start: paginationSettings.skip,
      length: paginationSettings.limit,
      columns: [],
      order: [],
      search: { value: this.searchDataValue },
    };

    this.backendService.getCompany(req).subscribe((apiRes: any) => {
      this.actualData = apiRes.data.data;
      this.totalData = apiRes.totalData;
      this.getTableData(paginationSettings);

      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }
}
