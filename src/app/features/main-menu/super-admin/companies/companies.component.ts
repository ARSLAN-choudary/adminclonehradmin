import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  signal,
  ViewChild,
  WritableSignal,
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
  companiesDataTable,
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
import { tap } from "rxjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ToastrService } from "ngx-toastr";

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
  @ViewChild("addCompany", { static: true })
  addCompany!: ElementRef<HTMLElement>;
  @ViewChild("editUserCanvas", { static: true })
  editUserCanvas!: ElementRef<HTMLElement>;
  @ViewChild("deleteUserCanvas", { static: true })
  deleteUserCanvas!: ElementRef<HTMLElement>;
  editForm!: FormGroup;

  deleteCompanyId!: any;
  private editBackdrop?: HTMLElement;

  inActiveCompanies: WritableSignal<number> = signal(0);
  activeCompanies: WritableSignal<number> = signal(0);
  public routes = routes;
  public pageSize = 10;
  public skip = 0;
  public currentPage = 1;
  public totalData = 0;

  public tableData: companiesDataTable[] = [];
  public serialNumberArray: number[] = [];

  public dataSource!: MatTableDataSource<companiesDataTable>;
  public searchDataValue = "";
  public row = true;
  startDate: string = "";
  endDate: string = "";
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
  password: boolean[] = [false];
  public tableDataCopy: any[] = [];
  public actualData: any[] = [];
  isMalta: any;

  initChecked = false;
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
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getTableData(this.skip, this.pageSize);
    //
    // When pagination emits new page info
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      // if (this.router.url === this.routes.dataTable) {
      this.pageSize = res.pageSize;
      this.skip = res.skip;
      this.getTableData(res.skip, res.pageSize);
      // }
    });

    this.initCreateNewCompanyForm();
    this.initEditForm();
  }

  initEditForm() {
    this.editForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      registrationNo: ["", Validators.required],
      vatNo: ["", Validators.required],
      website: [""],
      incorporatonDate: ["", Validators.required],
      status: ["active", Validators.required],
    });
  }

  initCreateNewCompanyForm() {
    this.createNewCompanyForm = this.fb.group(
      {
        files: [
          null,
          [Validators.required, this.fileTypeAndSizeValidator.bind(this)],
        ],

        country: ["", Validators.required],

        // all other fields start disabled
        name: [{ value: "", disabled: true }, Validators.required],
        registrationNo: [{ value: "", disabled: true }, Validators.required],
        vatNo: [{ value: "", disabled: true }, Validators.required],
        peNo: [{ value: "", disabled: true }, Validators.required],
        jobplusemployeryno: [
          { value: "", disabled: true },
          Validators.required,
        ],
        currency: [{ value: "", disabled: true }, Validators.required],
        phoneNO: [{ value: "", disabled: true }, Validators.required],
        email: [""],
        address: [""],
        website: [""],
        incorporatonDate: [{ value: "", disabled: true }, Validators.required],
        password: [
          { value: "", disabled: true },
          [Validators.required, Validators.minLength(8)],
        ],
        confirmPassword: [{ value: "", disabled: true }, Validators.required],
        status: [{ value: "active", disabled: true }, Validators.required],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
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
      "confirmPassword",
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

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pw = group.get("password")?.value;
    const cp = group.get("confirmPassword")?.value;
    if (!pw || !cp) return { mismatch: true };
    return pw === cp ? null : { mismatch: true };
  }
  private updateCounts(data: any[] = []) {
    const active = data.filter((c) => c.status === "active").length;
    this.activeCompanies.set(active);
    this.inActiveCompanies.set(data.length - active);
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
      .getCompany(payload)
      .pipe(
        tap((apiRes: any) => {
          const arr = Array.isArray(apiRes?.data?.data) ? apiRes.data.data : [];
          this.updateCounts(arr);
        })
      )
      .subscribe((apiRes: any) => {
        let arr: any[] = Array.isArray(apiRes?.data?.data)
          ? apiRes.data.data
          : [];

        arr = arr.map((d) => ({ ...d, isDeleted: !!d.isDeleted }));
        arr.sort((a, b) => {
          if (a.isDeleted === b.isDeleted) {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
          return a.isDeleted ? 1 : -1;
        });

        const countsSource = arr.filter((c) => !c.isDeleted);
        this.updateCounts(countsSource);

        this.tableData = arr;
        this.totalData = apiRes.data.recordsTotal;
        this.cdRef.markForCheck();

        this.serialNumberArray = this.tableData.map((_, i) => skip + i + 1);
        this.dataSource = new MatTableDataSource<companiesDataTable>(
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

  fileTypeAndSizeValidator(control: AbstractControl): ValidationErrors | null {
    const files: File[] = control.value as File[];
    if (!files || files.length === 0) {
      return { required: true };
    }
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];
    for (let f of files) {
      if (!allowedTypes.includes(f.type)) {
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
    this.passwordsDoNotMatch = !confirmValue || pw !== confirmValue;
  }

  onSubmit() {
    if (this.createNewCompanyForm.invalid || this.passwordsDoNotMatch) {
      this.createNewCompanyForm.markAllAsTouched();
      this.confirmTouched = true;
      return;
    }

    const formData = new FormData();
    const v = this.createNewCompanyForm.value;

    Object.entries(v).forEach(([key, val]) => {
      if (key === "confirmPassword") return;
      if (key === "files" && Array.isArray(val)) {
        val.forEach((file: File) => {
          formData.append("image", file, file.name);
        });
      } else {
        formData.append(key, String(val));
      }
    });

    this.backendService.addCompany(formData).subscribe({
      next: () => {
        this.getTableData(this.skip, this.pageSize);

        this.closeAddCompany();
      },
      error: (err) => {
        console.error("upload error", err);
        this.toastr.error("Upload failed");
      },
    });
  }

  toggleStatus(data: any) {
    const newStatus = data.status === "active" ? "inactive" : "active";
    const payload = {
      id: data._id ?? data.id,
      status: newStatus,
    };

    this.backendService.updateCompany(payload).subscribe({
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

  control(name: string) {
    return this.createNewCompanyForm.get(name)!;
  }

  togglePassword(i: number): void {
    this.password[i] = !this.password[i];
  }

  onClickStar(item: superadmincompanies) {
    item.isStarActive = !item.isStarActive;
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

  deleteUser(id: any) {
    this.deleteCompanyId = id;
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
    this.deleteCompanyId = undefined;
  }

  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.skip = 0;
    this.getTableData(this.skip, this.pageSize);
  }

  public sortData(sort: Sort): void {
    this.getTableData(this.skip, this.pageSize);
  }

  public selectAll(initChecked: boolean): void {
    this.tableData.forEach((f) => (f.isSelected = !initChecked));
  }
  exportAsPDF(): void {
    if (!this.tableData?.length) return;
    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = { left: 20, right: 20 };

    doc.setFontSize(18);
    doc.text("Companies List", pageWidth / 2, 40, { align: "center" });

    const headers = [
      ["Name", "Registration No", "VAT No", "Website", "Inc Date", "Status"],
    ];
    const body = this.tableData.map((d) => [
      d.name,
      d.registrationNo,
      d.vatNo,
      d.website,
      new Date(d.incorporatonDate).toLocaleDateString(),
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

    doc.save("CompaniesList.pdf");
  }

  exportAsExcel(): void {
    if (!this.tableData?.length) return;

    const exportData = this.tableData.map((d) => ({
      name: d.name,
      registrationNo: d.registrationNo,
      vatNo: d.vatNo,
      website: d.website,
      incorporatonDate: new Date(d.incorporatonDate).toLocaleDateString(), // or d.incorporatonDate
      status: d.status,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData, {
      header: [
        "name",
        "registrationNo",
        "vatNo",
        "website",
        "incorporatonDate",
        "status",
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
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 25 },
      { wch: 20 },
      { wch: 10 },
    ];

    const wb: XLSX.WorkBook = {
      Sheets: { CompaniesList: ws },
      SheetNames: ["CompaniesList"],
    };
    const buf = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    const blob = new Blob([buf], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `CompaniesList_${Date.now()}.xlsx`);
  }

  closeAddCompany() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const panel = this.addCompany.nativeElement;

    this.renderer.removeClass(panel, "show");
    const onTransition = (e: TransitionEvent) => {
      if (e.target === panel && e.propertyName.includes("transform")) {
        this.renderer.setStyle(panel, "visibility", "hidden");
        this.renderer.removeAttribute(panel, "aria-modal");
        this.renderer.setAttribute(panel, "aria-hidden", "true");
        this.renderer.removeStyle(document.body, "overflow");

        document
          .querySelectorAll(".offcanvas-backdrop.fade.show")
          .forEach((backdrop) =>
            this.renderer.removeChild(document.body, backdrop)
          );
        this.renderer.removeStyle(panel, "transform");
        this.createNewCompanyForm.reset();

        panel.removeEventListener("transitionend", onTransition);
      }
    };

    if (this.editBackdrop) {
      this.renderer.removeChild(document.body, this.editBackdrop);
      this.editBackdrop = undefined;
    }
    this.renderer.removeStyle(document.body, "overflow");

    this.createNewCompanyForm.reset();
  }

  openAddCompany(): void {
    const panel = this.addCompany.nativeElement;
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
        this.closeEditCompany()
      );
    }
    this.renderer.appendChild(document.body, this.editBackdrop);
  }

  closeEditCompany() {
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

        document
          .querySelectorAll(".offcanvas-backdrop.fade.show")
          .forEach((backdrop) =>
            this.renderer.removeChild(document.body, backdrop)
          );
        this.renderer.removeStyle(panel, "transform");
        this.createNewCompanyForm.reset();

        panel.removeEventListener("transitionend", onTransition);
      }
    };

    if (this.editBackdrop) {
      this.renderer.removeChild(document.body, this.editBackdrop);
      this.editBackdrop = undefined;
    }
    this.renderer.removeStyle(document.body, "overflow");
    this.editForm.reset();
  }

  onEditCompany(user: any): void {
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
      this.editBackdrop.addEventListener("click", () =>
        this.closeEditCompany()
      );
    }
    this.renderer.appendChild(document.body, this.editBackdrop);

    this.editForm.patchValue({
      id: user._id ?? user.id,
      name: user.name,
      registrationNo: user.registrationNo,
      vatNo: user.vatNo,
      website: user.website,
      incorporatonDate: this.toDateInputString(user.incorporatonDate),
      status: user.status,
    });
  }

  onUpdateCompany() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.editForm.value,
    };
    console.log(payload);

    this.backendService.updateCompany(payload).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.closeEditCompany();
        this.getTableData(this.skip, this.pageSize);
        this.editForm.reset();
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
  confirmDelete(event: MouseEvent) {
    (event.target as HTMLElement).blur();
    if (this.deleteCompanyId) {
      this.backendService
        .deleteCompany(this.deleteCompanyId)
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

  private toDateInputString(raw: any): string {
    if (!raw) return "";
    const d = new Date(raw);
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10);
  }
}
