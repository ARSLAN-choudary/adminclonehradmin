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
    MatOption,
    MatInputModule,
  ],
  templateUrl: "./manage-users.component.html",
  styleUrl: "./manage-users.component.scss",
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  currentNationalityFilterCtrl = new FormControl<string>("");

  filteredCurrentNationality = new ReplaySubject<Country[]>(1);
  userForm!: FormGroup;

  countries: Country[] = [
    { id: 1, name: "Germany" },
    { id: 2, name: "USA" },
    { id: 3, name: "Canada" },
    { id: 4, name: "India" },
    { id: 5, name: "China" },
  ];
  public routes = routes;
  // pagination variables
  public tableData: manageUsers[] = [];
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
    private fb: FormBuilder
  ) {
    this.data.getManageUsers().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.manageUsers) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
      mobileNo: ["", Validators.required],
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
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;

    console.log("Create user payload:", this.userForm.value);
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

  private getTableData(pageOption: pageSelection): void {
    this.data.getManageUsers().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: manageUsers, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<manageUsers>(this.actualData);
      // debugger
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
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
}
