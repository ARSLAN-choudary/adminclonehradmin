import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import {
  MatOption,
  MatSelect,
  MatSelectModule,
} from "@angular/material/select";
import { Router, RouterLink } from "@angular/router";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgxEditorModule } from "ngx-editor";
import { CustomPaginationComponent } from "../../../shared/custom-pagination/custom-pagination.component";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { CollapseHeaderComponent } from "../../common/collapse-header/collapse-header.component";
import { MatTableDataSource } from "@angular/material/table";
import { routes } from "../../../shared/routes/routes";
import {
  apiResultFormat,
  pageSelection,
  manageUsers,
} from "../../../shared/model/pages.model";
import {
  PaginationService,
  tablePageSize,
} from "../../../shared/custom-pagination/pagination.service";
import { DataService } from "../../../shared/data/data.service";
import { DomSanitizer } from "@angular/platform-browser";
import { DateRangePickerComponent } from "../../common/date-range-picker/date-range-picker.component";
import { ReplaySubject, Subject, takeUntil } from "rxjs";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BackendService } from "../../../Services/backend.service";
import {
  CountryISO,
  NgxIntlTelInputModule,
  SearchCountryField,
} from "ngx-intl-tel-input";
import { Select } from "primeng/select";
import { ToastrService } from "ngx-toastr";
import { Offcanvas } from "bootstrap";
interface Country {
  id: number;
  name: string;
}

@Component({
  selector: "app-manage-users",
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
    MatSort,
    DateRangePickerComponent,
    CollapseHeaderComponent,
    ReactiveFormsModule,
    MatSortModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    NgxIntlTelInputModule,
    Select,
  ],
  templateUrl: "./manage-users.component.html",
  styleUrl: "./manage-users.component.scss",
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  currentNationalityFilterCtrl = new FormControl<string>("");
  preferredCountries = [CountryISO.Pakistan, CountryISO.UnitedArabEmirates];
  onlyCountries = [
    CountryISO.Pakistan,
    CountryISO.UnitedArabEmirates,
    CountryISO.SaudiArabia,
  ];
  filteredCurrentNationality = new ReplaySubject<Country[]>(1);
  userForm!: FormGroup;
  editUserForm!: FormGroup;

  bootstrap: any;

  public routes = routes;
  // pagination variables
  public tableData: any[] = [];
  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<manageUsers>;
  public searchDataValue = "";
  public tableDataCopy: manageUsers[] = [];
  public actualData: manageUsers[] = [];
  //** pagination variables
  private _onDestroy = new Subject<void>();
  public sidebarPopup = false;
  public sidebarPopup2 = false;
  public password: boolean[] = [false];

  initChecked = false;
  countries: any[] = [];
  selectedUser: any;

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  onClickStar(item: manageUsers) {
    item.isStarActive = !item.isStarActive;
  }

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private backend: BackendService,
    private toastr: ToastrService,
    private toaster: ToastrService
  ) {
    this.backend.getManageUsers("").subscribe((apiRes: any) => {
      this.actualData = apiRes.data.data;
      this.totalData = apiRes.totalData;

      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url === this.routes.manageUsers) {
          this.pageSize = res.pageSize;
          this.getTableData({ skip: res.skip, limit: res.limit });
        }
      });
    });
    this.countries = [
      { label: "United Arab Emirates", value: "uae" },
      { label: "Georgia", value: "georgia" },
      { label: "Malta", value: "malta" },
      { label: "United Kingdom", value: "uk" },
      { label: "USA", value: "usa" },
      { label: "Netherlands", value: "netherlands" },
      { label: "Serbia", value: "serbia" },
    ];
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
      phone: ["", Validators.required],
      location: ["", Validators.required],
    });
    this.editUserForm = this.fb.group({
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
      phone: [null, Validators.required],
      location: [null, Validators.required],
    });

    this.filteredCurrentNationality.next(this.countries.slice());

    this.currentNationalityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((search) => this._filterCountries(search));
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  get f() {
    return this.userForm.controls;
  }

  private _filterCountries(search: string | null) {
    const term = (search || "").toLowerCase();
    this.filteredCurrentNationality.next(
      this.countries.filter((c) => c.name.toLowerCase().includes(term))
    );
  }

  onSubmit() {
    debugger;
    this.userForm.markAllAsTouched();
    this.userForm
      .get("phone")
      ?.setValue(this.userForm.get("phone")?.value?.e164Number);
    this.backend.addUser(this.userForm.value).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.userForm.reset();
        this.closeAddUser();
      
      },
      error: (err) => {
        this.toastr.success(err.message);
      },
    });
  }

  // private _filterList(
  //   search: string | null,
  //   outputStream: ReplaySubject<Country[]>
  // ) {
  //   const term = (search || "").toLowerCase();
  //   const filtered = this.countries.filter((c) =>
  //     c.name.toLowerCase().includes(term)
  //   );
  //   outputStream.next(filtered);
  // }

  closeAddUser() {
    const el = document.getElementById("offcanvas_add");
    if (!el) return;

    const offcanvas = Offcanvas.getInstance(el) ?? new Offcanvas(el);

    offcanvas.hide();
    document
    .querySelectorAll(".offcanvas-backdrop")
    .forEach((el) => el.remove());
  }

  private getTableData(pageOption: pageSelection): void {
    this.tableData = [];
    this.tableDataCopy = [];
    this.serialNumberArray = [];

    this.actualData.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
        res.id = serialNumber;
        this.tableData.push(res);
        this.serialNumberArray.push(serialNumber);
        this.tableDataCopy.push(res);
      }
    });

    this.dataSource = new MatTableDataSource<manageUsers>(this.actualData);

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

  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.dataSource.filter = this.searchDataValue;
    this.tableData = this.dataSource.filteredData;
    this.row = this.tableData.length > 0;

    if (this.searchDataValue !== "") {
      // Handle filtered data
      this.pagination.calculatePageSize.next({
        totalData: this.tableData.length,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.tableData.map((_, i) => i + 1),
      });
    } else {
      // Handle reset to full data
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });
    }
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

  protected readonly CountryISO = CountryISO;
  protected readonly SearchCountryField = SearchCountryField;

  onEditUser(user: any): void {
    this.selectedUser = user;
    this.editUserForm.patchValue({
      userName: user.userName,
      email: user.email,
      role: user.role,
      phone: {
        number: user.phone,
        internationalNumber: user.phone,
        nationalNumber: user.phone,
        e164Number: user.phone,
        countryCode: "PK",
        dialCode: "+92",
      },
      location: user.location,
    });
    console.log(this.editUserForm.value);
  }

  onUpdateUser() {
    if (this.editUserForm.invalid) return;

    this.editUserForm
      .get("phone")
      ?.setValue(this.editUserForm.get("phone")?.value?.e164Number);

    this.backend.updateUser(this.editUserForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        // Close offcanvas
        const offcanvas = document.getElementById("offcanvas_edit");
        // if (offcanvas) {
        //     const instance = bootstrap.Offcanvas.getInstance(offcanvas);
        //     instance?.hide();
        // }
        this.getTableData({ skip: 0, limit: this.pageSize });
      },
      error: (err: any) => {
        this.toastr.error(err.message);
      },
    });
  }

  onEditSubmit() {
    if (this.editUserForm.invalid) return;

    const payload = {
      ...this.editUserForm.value,
      phone: this.editUserForm.get("phone")?.value?.e164Number,
    };

    this.backend.updateUser("").subscribe({
      next: (res) => {
        this.toastr.success("User updated");
      },
      error: (err) => {
        this.toastr.error("Update failed");
      },
    });
  }

  deleteUser(id: any) {
    this.backend.deleteUser(id).subscribe((res: any) => {
      if (res.status === "success") {
        this.toaster.success(res.message);
      } else {
        this.toaster.error("Please Try Again Later");
      }
    });
  }
}
