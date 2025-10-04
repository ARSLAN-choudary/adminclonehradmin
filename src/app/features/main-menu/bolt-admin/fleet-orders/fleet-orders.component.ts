import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
  WritableSignal,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router, RouterLink } from "@angular/router";
import { routes } from "../../../../shared/routes/routes";

import {
  CountryISO,
  SearchCountryField,
  PhoneNumberFormat,
  NgxIntlTelInputModule,
} from "ngx-intl-tel-input";
import { ToastrService } from "ngx-toastr";
import { tap } from "rxjs";
import { BackendService } from "../../../../Services/backend.service";
import {
  PaginationService,
  tablePageSize,
} from "../../../../shared/custom-pagination/pagination.service";
import {
  BoltFleetDataTable,
  superadmincompanies,
} from "../../../../shared/model/pages.model";
import { CollapseHeaderComponent } from "../../../common/collapse-header/collapse-header.component";
import { SelectModule } from "primeng/select";
import { CommonModule } from "@angular/common";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SelectFilterIdDirective } from "../../../../shared/common/directives/select-filter-id.directive";
import { CustomPaginationComponent } from "../../../../shared/custom-pagination/custom-pagination.component";
import { DateRangePickerComponent } from "../../../common/date-range-picker/date-range-picker.component";
import { DataService } from "../../../../shared/data/data.service";
interface select {
  data: string;
}
@Component({
  selector: "app-fleet-orders",
  imports: [
    CollapseHeaderComponent,
    SelectModule,
    FormsModule,
    CommonModule,
    BsDatepickerModule,
    RouterLink,
    CustomPaginationComponent,
    MatSortModule,
    ReactiveFormsModule,
    SelectFilterIdDirective,
    NgxIntlTelInputModule,
    DateRangePickerComponent,
  ],
  templateUrl: "./fleet-orders.component.html",
  styleUrl: "./fleet-orders.component.scss",
})
export class FleetOrdersComponent implements OnInit, AfterViewInit {
  @ViewChild("addCompany", { static: true })
  addCompany!: ElementRef<HTMLElement>;
  @ViewChild("editUserCanvas", { static: true })
  editUserCanvas!: ElementRef<HTMLElement>;
  @ViewChild("deleteUserCanvas", { static: true })
  deleteUserCanvas!: ElementRef<HTMLElement>;
  @ViewChild("countrySelect", { read: ElementRef })
  countrySelectEl!: ElementRef;
  private collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });
  editForm!: FormGroup;
  private _filterIdCounter = 0;
  deleteCompanyId!: any;
  private editBackdrop?: HTMLElement;
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries = [CountryISO.Pakistan, CountryISO.UnitedArabEmirates];
  onlyCountries = [
    CountryISO.Pakistan,
    CountryISO.UnitedArabEmirates,
    CountryISO.SaudiArabia,
  ];
  deleteCompanyName: WritableSignal<string> = signal("");
  inActiveCompanies: WritableSignal<number> = signal(0);
  activeCompanies: WritableSignal<number> = signal(0);
  public routes = routes;
  public pageSize = 10;
  public skip = 0;
  public currentPage = 1;
  public totalData = 0;

  public tableData: BoltFleetDataTable[] = [];
  public serialNumberArray: number[] = [];
  currentEditingImageUrl?: string;
  editPreviewUrl?: string;
  private editPreviewObjectUrl?: string;
  public dataSource!: MatTableDataSource<BoltFleetDataTable>;
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
    private toastr: ToastrService,
    private dataService: DataService
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

  ngAfterViewInit() {}

  initEditForm() {
    this.editForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      phoneNO: ["", Validators.required],
      website: [
        "",
        [
          this.websiteUrlValidator({
            requireProtocol: false,
            requireTld: true,
          }),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      status: ["active", Validators.required],
      image: [null, [this.optionalPngValidator.bind(this)]],
    });
  }
  private getUnixRangeSeconds(
    startStr?: string,
    endStr?: string
  ): { start_ts: number; end_ts: number } {
    const now = new Date();

    // end: end of selected day, or now if not provided
    const end = endStr && endStr.trim() ? new Date(endStr) : now;
    if (endStr && endStr.trim()) end.setHours(23, 59, 59, 999);

    // start: start of selected day, or (end - 20 days) if not provided
    let start: Date;
    if (startStr && startStr.trim()) {
      start = new Date(startStr);
      start.setHours(0, 0, 0, 0);
    } else {
      start = new Date(end.getTime() - 20 * 24 * 60 * 60 * 1000); // last 20 days
      start.setHours(0, 0, 0, 0);
    }

    // safety: ensure start <= end
    if (start.getTime() > end.getTime()) {
      // swap or clamp; here we clamp start to 20 days before end
      start = new Date(end.getTime() - 20 * 24 * 60 * 60 * 1000);
      start.setHours(0, 0, 0, 0);
    }

    return {
      start_ts: Math.floor(start.getTime() / 1000), // seconds
      end_ts: Math.floor(end.getTime() / 1000),
    };
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
        address: [{ value: "", disabled: true }, Validators.required],
        website: [
          { value: "", disabled: true },
          [
            Validators.required,
            this.websiteUrlValidator({
              requireProtocol: false,
              requireTld: true,
            }),
          ],
        ],
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
      "address",
      "email",
      "website",
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
          ctrl.updateValueAndValidity({ emitEvent: false });
        });
      });
  }

  async onEditFilesSelected(evt: Event) {
    const input = evt.target as HTMLInputElement | null;
    const file = input?.files?.item(0) ?? null;

    const ctrl = this.editForm.get(
      "image"
    ) as import("@angular/forms").FormControl<File[] | null>;
    ctrl.setValue(file ? [file] : null);
    ctrl.markAsTouched();
    ctrl.updateValueAndValidity();

    if (this.editPreviewObjectUrl)
      URL.revokeObjectURL(this.editPreviewObjectUrl);
    this.editPreviewUrl = file
      ? (this.editPreviewObjectUrl = URL.createObjectURL(file))
      : undefined;

    if (input) input.value = "";
  }
  optionalPngValidator(control: AbstractControl): ValidationErrors | null {
    const files = control.value as File[] | null;
    if (!files || files.length === 0) return null;
    if (files.length !== 1) return { tooMany: true };
    const f = files[0]!;
    if (f.type !== "image/png") return { invalidType: true };
    if (f.size > 5 * 1024 * 1024) return { fileTooLarge: true };
    return null;
  }
  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  websiteUrlValidator(opts?: {
    requireProtocol?: boolean;
    allowedProtocols?: string[];
    requireTld?: boolean;
  }): ValidatorFn {
    const requireProtocol = opts?.requireProtocol ?? false;
    const allowedProtocols = opts?.allowedProtocols ?? ["http:", "https:"];
    const requireTld = opts?.requireTld ?? true;

    return (control: AbstractControl): ValidationErrors | null => {
      const raw = (control.value ?? "").toString().trim();
      if (!raw) return null;

      const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(raw);
      if (!hasScheme && requireProtocol) {
        return { url: { reason: "missingProtocol" } };
      }

      const test = hasScheme ? raw : `https://${raw}`;

      try {
        const u = new URL(test);

        if (!allowedProtocols.includes(u.protocol)) {
          return { url: { reason: "protocol" } };
        }

        const host = u.hostname;
        if (!host || host.startsWith(".") || host.endsWith(".")) {
          return { url: { reason: "invalidHostname" } };
        }

        if (requireTld && !host.includes(".")) {
          return { url: { reason: "tld" } };
        }

        return null;
      } catch {
        return { url: { reason: "syntax" } };
      }
    };
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
  readCompanyIds(): number[] {
    const raw = localStorage.getItem("bolt_companies");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      return arr
        .map((v) => (typeof v === "string" ? Number(v) : v))
        .filter((n): n is number => Number.isFinite(n));
    } catch {
      return [];
    }
  }
  private getTableData(skip: number, limit: number): void {
    const companyIds = this.readCompanyIds();
    const { start_ts, end_ts } = this.getUnixRangeSeconds(
      this.startDate,
      this.endDate
    );

    const payload: any = {
      offset: 0,
      limit: 20,
      company_ids: companyIds,
      company_id: companyIds[0],
      start_ts,
      end_ts,
      time_range_filter_type: "price_review",
    };

    this.backendService
      .getBoltFleetOrder(payload)
      .pipe(
        tap((apiRes: any) => {
          const arr = Array.isArray(apiRes?.data?.data) ? apiRes.data.data : [];
          this.updateCounts(arr);
        })
      )
      .subscribe((apiRes: any) => {
        this.dataService.setLoaderState(false);

        let arr: any[] = Array.isArray(apiRes?.data?.orders)
          ? apiRes.data.orders
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
        console.log(this.tableData);

        this.totalData = apiRes.data.total_orders;
        this.cdRef.markForCheck();

        this.serialNumberArray = this.tableData.map((_, i) => skip + i + 1);
        this.dataSource = new MatTableDataSource<BoltFleetDataTable>(
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
    const files = control.value as File[] | null;

    if (!files || files.length === 0) {
      return { required: true };
    }
    if (files.length !== 1) {
      return { tooMany: true };
    }

    const f = files[0]!;
    if (f.type !== "image/png") return { invalidType: true };
    if (f.size > 5 * 1024 * 1024) return { fileTooLarge: true };
    return null;
  }

  onFilesSelected(evt: Event) {
    const input = evt.target as HTMLInputElement | null;
    if (!input) return;

    const filesList = input.files;
    const file = filesList && filesList.length ? filesList.item(0)! : null;

    const filesCtrl = this.createNewCompanyForm.get(
      "files"
    ) as import("@angular/forms").FormControl<File[] | null>;

    filesCtrl.setValue(file ? [file] : null);
    filesCtrl.markAsTouched();
    filesCtrl.updateValueAndValidity();

    if (input) input.value = "";
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

  deleteUser(data: any) {
    this.deleteCompanyId = data._id;
    this.deleteCompanyName.set(data.name);
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
    this.deleteCompanyName.set("");
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
    if (this.searchDataValue.length >= 3) {
      this.getTableData(this.skip, this.pageSize);
    }
  }

  public selectAll(initChecked: boolean): void {
    this.tableData.forEach((f) => (f.isSelected = !initChecked));
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
    this.currentEditingImageUrl = user?.image || "";
    if (this.editPreviewObjectUrl) {
      URL.revokeObjectURL(this.editPreviewObjectUrl);
      this.editPreviewObjectUrl = undefined;
    }
    this.editPreviewUrl = undefined;

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
      id: user._id,
      name: user.name,
      phoneNO: this.toE164(user.phoneNO),
      website: user.website,
      email: user.email,
      status: user.status,
      image: null,
    });
  }

  onUpdateCompany() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const v = this.editForm.getRawValue();

    const fd = new FormData();
    fd.append("id", v.id);
    fd.append("name", v.name);
    fd.append("phoneNO", this.toE164(this.editForm.get("phoneNO")?.value));
    fd.append("website", v.website);
    fd.append("email", v.email);
    fd.append("status", v.status);

    const files = this.editForm.get("image")?.value as File[] | null;
    if (files?.length) {
      fd.append("image", files[0], files[0].name);
    }

    this.backendService.updateCompany(fd).subscribe({
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
  private toE164(val: any): string {
    if (!val) return "";
    if (typeof val === "string") return val.trim();
    return (
      val.e164Number ??
      val.internationalNumber ??
      val.number ??
      val.nationalNumber ??
      ""
    )
      .toString()
      .replace(/\s+/g, "");
  }
}
