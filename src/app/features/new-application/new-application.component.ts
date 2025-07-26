import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxEditorModule } from 'ngx-editor';
import { CustomPaginationComponent } from '../../shared/custom-pagination/custom-pagination.component';
import { MatSortModule, Sort } from '@angular/material/sort';
import { CollapseHeaderComponent } from '../common/collapse-header/collapse-header.component';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from '../../shared/routes/routes';
import { apiResultFormat, pageSelection, manageUsers } from '../../shared/model/pages.model';
import { PaginationService, tablePageSize } from '../../shared/custom-pagination/pagination.service';
import { DataService } from '../../shared/data/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DateRangePickerComponent } from '../common/date-range-picker/date-range-picker.component';

import {
    CountryISO,
    NgxIntlTelInputModule,
    SearchCountryField,
    PhoneNumberFormat
} from 'ngx-intl-tel-input';
import {MatInput} from "@angular/material/input";

@Component({
    selector: 'app-new-application',
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
    ],
    templateUrl: './new-application.component.html',
    styleUrl: './new-application.component.scss'
})
export class NewApplicationComponent {
    public routes = routes;

    public tableData: any[] = [];
    public tableDataCopy: manageUsers[] = [];
    public actualData: manageUsers[] = [];
    public dataSource!: MatTableDataSource<manageUsers>;

    public pageSize = 10;
    public serialNumberArray: number[] = [];
    public totalData = 0;
    public searchDataValue = '';
    public row = true;
    initChecked = false;

    CountryISO = CountryISO;
    SearchCountryField = SearchCountryField;
    PhoneNumberFormat = PhoneNumberFormat;
    preferredCountries = [CountryISO.Pakistan, CountryISO.UnitedArabEmirates];
    onlyCountries = [CountryISO.Pakistan, CountryISO.UnitedArabEmirates, CountryISO.SaudiArabia];

    form: FormGroup = new FormGroup({
        phone: new FormControl(undefined, Validators.required),
    });

    public sidebarPopup = false;
    public sidebarPopup2 = false;
    public password: boolean[] = [false];

    constructor(
        private data: DataService,
        private pagination: PaginationService,
        private router: Router,
        private sanitizer: DomSanitizer,
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
                (row as any).last_activity
            ]
                .map(v => (v ?? '').toString().toLowerCase())
                .some(v => v.includes(term));
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
        if (!sort.active || sort.direction === '') {
            this.tableData = data;
        } else {
            this.tableData = data.sort((a, b) => {
                const aValue = (a as any)[sort.active];
                const bValue = (b as any)[sort.active];
                return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
            });
        }
    }

    public searchData(value: string): void {
        this.searchDataValue = value.trim().toLowerCase();
        this.dataSource.filter = this.searchDataValue;

        this.tableData = this.dataSource.filteredData;
        this.row = this.tableData.length > 0;

        if (this.searchDataValue !== '') {
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
        window.open(`${baseUrl}/goto`, '_blank');
    }
}