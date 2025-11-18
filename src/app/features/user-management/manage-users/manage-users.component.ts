import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
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
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DateRangePickerComponent } from "../../common/date-range-picker/date-range-picker.component";
import { ReplaySubject, Subject, takeUntil, tap } from "rxjs";
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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { SelectFilterIdDirective } from "../../../shared/common/directives/select-filter-id.directive";
interface Country {
  id: number;
  name: string;
}

interface DocumentItem {
  id: number;
  name: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  previewUrl: string;
  fileType: 'pdf' | 'image';
}
interface PhoneInputValue {
  number: string;
  nationalNumber: string;
  internationalNumber: string;
  e164Number: string;
  countryCode: string;
  dialCode: string;
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
    CollapseHeaderComponent,
    ReactiveFormsModule,
    MatSortModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    NgxIntlTelInputModule,
    Select,
    SelectFilterIdDirective,
  ],
  templateUrl: "./manage-users.component.html",
  styleUrl: "./manage-users.component.scss",
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  @ViewChild("deleteUserCanvas", { static: true })
  deleteUserCanvas!: ElementRef<HTMLElement>;
  private collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });
  startDate: string = "";
  endDate: string = "";
  currentUserId: string = '';
  currentUserDocs: any[] = [];
  limit: number = 10;

  inActiveUsers: WritableSignal<number> = signal(0);
  activeUsers: WritableSignal<number> = signal(0);

  public pageSize = 10;
  public skip = 0;
  public currentPage = 1;
  public totalData = 0;
  private _filterIdCounter = 0;
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
  @ViewChild("docsCanvas") docsCanvas!: ElementRef;
  docsBackdrop: any;


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
    private renderer: Renderer2,

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
        this.toastr.error(err.error.message);
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
    const raw = user.phone || "";

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
    this.editUserForm.patchValue({
      userName: user.userName,
      email: user.email,
      role: user.role,
      phone: phoneObj,
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

  onEditSubmit() {
    // debugger;
    // if (this.editUserForm.invalid) return;

    const payload = {
      ...this.editUserForm.value,
      phone: this.editUserForm.get("phone")?.value?.e164Number,
      id: this.selectedUser._id,
    };
    this.backend.updateUser(payload).subscribe({
      next: (res) => {
        this.toastr.success("User updated");
        this.closeEditUser();
        this.getTableData(this.skip, this.pageSize);
      },
      error: (err) => {
        this.toastr.error("Update failed");
      },
    });
  }

  deleteUser(id: any) {
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

    this.deleteUserId = id;
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

    this.renderer.removeClass(panel, "show");
    const onTransition = (e: TransitionEvent) => {
      if (e.target === panel && e.propertyName.includes("transform")) {
        this.renderer.setStyle(panel, "visibility", "hidden");
        this.renderer.removeAttribute(panel, "aria-modal");
        this.renderer.setAttribute(panel, "aria-hidden", "true");
        this.renderer.removeStyle(document.body, "overflow");

        if (this.addBackdrop) {
          this.renderer.removeChild(document.body, this.addBackdrop);
          this.addBackdrop = undefined;
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
    if (this.addBackdrop) {
      this.renderer.removeChild(document.body, this.addBackdrop);
      this.addBackdrop = undefined;
    }
    this.renderer.removeStyle(document.body, "overflow");

    this.userForm.reset();
  }

  closeEditUser() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const panel = this.editUserCanvas.nativeElement;

    this.renderer.removeClass(panel, "show");
    const onTransition = (e: TransitionEvent) => {
      if (e.target === panel && e.propertyName.includes("transform")) {
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

        panel.removeEventListener("transitionend", onTransition);
      }
    };
    if (this.editBackdrop) {
      this.renderer.removeChild(document.body, this.editBackdrop);
      this.editBackdrop = undefined;
    }
    this.renderer.removeStyle(document.body, "overflow");

    this.editUserForm.reset();
  }

  private updateCounts(data: any[] = []) {
    const active = data.filter((c) => c.status === "active").length;
    this.activeUsers.set(active);
    this.inActiveUsers.set(data.length - active);
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
    this.backend
      .getManageUsers(payload)
      .pipe(
        tap((apiRes: any) => {
          const arr = Array.isArray(apiRes?.data?.data) ? apiRes.data.data : [];
          this.updateCounts(arr);
        })
      )
      .subscribe((apiRes: any) => {
        let arr: usersDataTable[] = apiRes.data.data || [];

        arr = arr.sort((a, b) => {
          if (a.status === b.status) return 0;
          return a.status === "inactive" ? 1 : -1;
        });

        this.tableData = arr;
        this.totalData = apiRes.totalData;
        this.serialNumberArray = this.tableData.map((_, i) => skip + i + 1);
        this.dataSource = new MatTableDataSource<usersDataTable>(
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
    if (this.searchDataValue.length >= 3) {
      this.getTableData(this.skip, this.pageSize);
    }
  }

  public selectAll(initChecked: boolean): void {
    this.tableData.forEach((f) => (f.isSelected = !initChecked));
  }

  exportAsPDF(): void {
    if (!this.tableData?.length) return;

    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);
    doc.text("Manage Users", pageWidth / 2, 40, { align: "center" });

    autoTable(doc, {
      startY: 60,
      head: [["Name", "Phone", "Email", "Created", "Role", "Status"]],
      body: this.tableData.map((u) => [
        u.userName,
        u.phone,
        u.email,
        new Date(u.createdAt).toLocaleDateString(),
        u.role,
        u.status,
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 4,
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 20, right: 20 },
      theme: "striped",
    });

    doc.save(`UserList_${Date.now()}.pdf`);
  }

  exportAsExcel(): void {
    if (!this.tableData?.length) return;

    const exportData = this.tableData.map((u) => ({
      Name: u.userName,
      Phone: u.phone,
      Email: u.email,
      Created: new Date(u.createdAt).toLocaleDateString(),
      Role: u.role,
      Status: u.status,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData, {
      header: ["Name", "Phone", "Email", "Created", "Role", "Status"],
    });

    // style header
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
      { wch: 20 },
      { wch: 20 },
      { wch: 25 },
      { wch: 20 },
      { wch: 15 },
      { wch: 10 },
    ];

    const wb: XLSX.WorkBook = {
      Sheets: { Users: ws },
      SheetNames: ["Users"],
    };
    const buf = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    saveAs(
      new Blob([buf], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `UserList_${Date.now()}.xlsx`
    );
  }
  toggleStatus(data: any) {
    const newStatus = data.status === "active" ? "inactive" : "active";
    const payload = {
      id: data._id ?? data.id,
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

  private valueOf(row: any, key: string): any {
    switch (key) {
      case "createdAt":
        return new Date(row.createdAt).getTime() || 0;
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


  // DOCS OFFCANVAS
  openDocs(user: any) {

    this.currentUserId = user._id;

    this.currentUserDocs = Object.entries(user.documents).map(
      ([key, value]: any, index) => ({
        id: index + 1,
        name: key.toUpperCase(),
        uploadDate: user.createdAt,
        previewUrl: value.url,
        status: value.status,
        fileType: value.url ? 'image' : 'unknown',
        key: key
      })
    );

    const panel = this.docsCanvas.nativeElement;

    this.renderer.addClass(panel, "show");
    this.renderer.setStyle(panel, "visibility", "visible");
    this.renderer.setAttribute(panel, "aria-modal", "true");
    this.renderer.removeAttribute(panel, "aria-hidden");

    this.renderer.setStyle(document.body, "overflow", "hidden");

    this.docsBackdrop = this.renderer.createElement("div");
    this.renderer.addClass(this.docsBackdrop, "offcanvas-backdrop");
    this.renderer.addClass(this.docsBackdrop, "fade");
    this.renderer.addClass(this.docsBackdrop, "show");

    if (this.docsBackdrop) {
      this.docsBackdrop.addEventListener("click", () => this.closeDocs());
    }

    this.renderer.appendChild(document.body, this.docsBackdrop);
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
  const payload = {
    userId: this.currentUserId,
    documentKey: doc.key,
    status: 'approved'
  };

  this.backend.updateDocStatus(payload).subscribe({
    next: (res: any) => {

      const msg =
        res?.meta?.message ||
        res?.message ||
        res?.data?.message ||
        "Document approved successfully";

      this.toastr.success(msg, "Success");

      this.currentUserDocs = this.currentUserDocs.map(d =>
        d.key === doc.key ? { ...d, status: 'approved' } : d
      );

      this.getTableData(this.skip, this.limit);
      this.closePreview();
    },
    error: (err) => {
      const errorMsg = err?.error?.meta?.message || 
                       err?.error?.message || 
                       "Something went wrong";
      this.toastr.error(errorMsg, "Error");
    }
  });
}

reject(doc: any) {
  const payload = {
    userId: this.currentUserId,
    documentKey: doc.key,
    status: 'rejected'
  };

  this.backend.updateDocStatus(payload).subscribe({
    next: (res: any) => {

      const msg = 
        res?.meta?.message || 
        res?.message || 
        res?.data?.message || 
        "Document rejected successfully";
        
      this.toastr.info(msg, "Updated");

      this.currentUserDocs = this.currentUserDocs.map(d =>
        d.key === doc.key ? { ...d, status: 'rejected' } : d
      );

      this.getTableData(this.skip, this.limit);
      this.closePreview();
    },
    error: (err) => {
      const errorMsg = err?.error?.meta?.message || 
                       err?.error?.message || 
                       "Something went wrong";
      this.toastr.error(errorMsg, "Error");
    }
  });
}


  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getBadgeClass(status: string) {
    return {
      pending: 'badge bg-warning text-dark',
      approved: 'badge bg-success',
      rejected: 'badge bg-danger'
    }[status];
  }

  openPreview(doc: DocumentItem) {
    this.selectedDoc = doc;
    this.showPreview = true;
  }

  onRowClick(doc: DocumentItem) {
    this.openPreview(doc);
  }


  pendingCount() { return this.currentUserDocs.filter(d => d.status === 'pending').length; }
  approvedCount() { return this.currentUserDocs.filter(d => d.status === 'approved').length; }
  rejectedCount() { return this.currentUserDocs.filter(d => d.status === 'rejected').length; }

docData = [
  {
    section: 'Personal Information',
    fields: [
      { label: 'Given Name (English)', value: 'Areesh' },
      { label: 'Surname (Georgian)', value: 'ქართული' },
      { label: 'Citizenship', value: 'Georgia' },
      { label: 'Document Type ', value: 'Georgian ID Card' },
      { label: 'Document Number', value: '1997865' },
      { label: 'Date of Birth', value: '1998-06-15' },
      { label: 'Gender', value: 'Male' },
      { label: 'Marital Status ', value: 'Single' },
       { label: 'Contact Number', value: '+99556830' },
      { label: 'Email Address', value: 'areesh@gmail.com' },
      { label: 'Legal Home Address', value: '12 Rustaveli Avenue,Apartment 34,Tbilisi 0108,Georgia' },
    ]
  },
 {
  section: 'Education',
  fields: [
    { label: 'From (MM/YYYY)', value: '09/2018' },
    { label: 'To (MM/YYYY)', value: '06/2022' },
    { label: 'Institution', value: 'Tbilisi State University' },
    { label: 'Qualification', value: 'Bachelor of Computer Science' },
    { label: 'Notes', value: 'Graduated with strong academic performance' },
    { label: 'Currently Studying', value: 'No' },
  ]
},
{
  section: 'Work Experience',
  fields: [
    { label: 'Work Experience', value: '1' },
    { label: 'Company Name', value: 'TechSolutions LLC' },
    { label: 'City, Country', value: 'Tbilisi, Georgia' },
    { label: 'Job Title / Position', value: 'Frontend Developer' },
    { label: 'Employment Period', value: '08/2020 → 12/2023' },
    { label: 'Gross Salary (optional)', value: '$1,200 / month' },
    { label: 'Reason for Leaving', value: 'Career growth opportunity' },
    { label: 'Still Working Here', value: 'No' },
    { label: 'Additional Notes', value: 'Worked on Angular-based enterprise apps' },
  ]
}
];
}