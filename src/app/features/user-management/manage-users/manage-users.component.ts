import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
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
  usersDataTable,
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
  @ViewChild("deleteUserCanvas", { static: false })
  deleteContactModal!: ElementRef<HTMLDivElement>;

  startDate: string = "";
  endDate: string = "";

  public pageSize = 10;
  public skip = 0;
  public currentPage = 1;
  public totalData = 0;

  public tableData: usersDataTable[] = [];
  public serialNumberArray: number[] = [];

  public dataSource!: MatTableDataSource<usersDataTable>;
  public searchDataValue = "";
  public row = true;

  deleteUserId!: any;
  @ViewChild("addUserCanvas", { static: true })
  addUserCanvas!: ElementRef<HTMLElement>;
  @ViewChild("editUserCanvas", { static: true })
  editUserCanvas!: ElementRef<HTMLElement>;

  private addBackdrop?: HTMLElement;
  private editBackdrop?: HTMLElement;
  private deleteBackdrop?: HTMLElement;
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
  showFilter = false;
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
    private toaster: ToastrService,
    private renderer: Renderer2
  ) {
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
        this.getTableData(this.skip, this.pageSize);
      },
      error: (err) => {
        this.toastr.success(err.message);
      },
    });
  }

  protected readonly CountryISO = CountryISO;
  protected readonly SearchCountryField = SearchCountryField;

  onEditUser(user: any): void {
    const panel = this.editUserCanvas.nativeElement;
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
      this.editBackdrop.addEventListener("click", () => this.closeEditUser());
    }
    this.renderer.appendChild(document.body, this.editBackdrop);

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
        this.getTableData(this.skip, this.pageSize);
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
    const panel = this.deleteContactModal.nativeElement;
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

    this.deleteUserId = id;
  }

  closeDeleteModal() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const panel = this.deleteContactModal.nativeElement;

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
  }

  cancelDelete(event: MouseEvent) {
    (event.target as HTMLElement).blur();
    this.deleteUserId = undefined;
    this.closeDeleteModal();
  }

  confirmDelete(event: MouseEvent) {
    (event.target as HTMLElement).blur();
    if (this.deleteUserId) {
      this.backend.deleteUser(this.deleteUserId).subscribe((res: any) => {
        if (res.status === "success") {
          this.toaster.success(res.message);
          this.getTableData(this.skip, this.pageSize);
          this.closeDeleteModal();
        } else {
          this.toaster.error("Please Try Again Later");
        }
      });
    }
  }

  openAddUser() {
    const panel = this.addUserCanvas.nativeElement;
    // show
    this.renderer.addClass(panel, "show");
    this.renderer.setStyle(panel, "visibility", "visible");
    this.renderer.setAttribute(panel, "aria-modal", "true");
    this.renderer.removeAttribute(panel, "aria-hidden");
    this.renderer.setStyle(document.body, "overflow", "hidden");
    this.addBackdrop = this.renderer.createElement("div");
    this.renderer.addClass(this.addBackdrop, "offcanvas-backdrop");
    this.renderer.addClass(this.addBackdrop, "fade");
    this.renderer.addClass(this.addBackdrop, "show");
    if (this.addBackdrop) {
      this.addBackdrop.addEventListener("click", () => this.closeAddUser());
    }
    this.renderer.appendChild(document.body, this.addBackdrop);
  }

  closeAddUser() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const panel = this.addUserCanvas.nativeElement;
    // hide
    this.renderer.removeClass(panel, "show");
    this.renderer.setStyle(panel, "visibility", "hidden");
    this.renderer.removeAttribute(panel, "aria-modal");
    this.renderer.setAttribute(panel, "aria-hidden", "true");
    this.renderer.removeStyle(document.body, "overflow");
    if (this.addBackdrop) {
      this.renderer.removeChild(document.body, this.addBackdrop);
      this.addBackdrop = undefined;
    }
  }

  closeEditUser() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const panel = this.editUserCanvas.nativeElement;

    // … your existing hide logic …
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
    this.backend.getManageUsers(payload).subscribe((apiRes: any) => {
      // this.actualData = apiRes.data.data;
      this.tableData = apiRes.data.data;
      this.totalData = apiRes.data.recordsTotal;
      this.serialNumberArray = this.tableData.map((_, i) => skip + i + 1);
      this.dataSource = new MatTableDataSource<usersDataTable>(this.tableData);
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

  public selectAll(initChecked: boolean): void {
    this.tableData.forEach((f) => (f.isSelected = !initChecked));
  }
}
