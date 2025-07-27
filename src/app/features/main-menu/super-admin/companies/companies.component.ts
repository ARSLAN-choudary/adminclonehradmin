import {Component} from '@angular/core';
import {CollapseHeaderComponent} from '../../../common/collapse-header/collapse-header.component';
import {DateRangePickerComponent} from '../../../common/date-range-picker/date-range-picker.component';
import {SelectModule} from 'primeng/select';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {routes} from '../../../../shared/routes/routes';
import {Router, RouterLink} from '@angular/router';
import {apiResultFormat, superadmincompanies} from '../../../../shared/model/pages.model';
import {MatTableDataSource} from '@angular/material/table';
import {DataService} from '../../../../shared/data/data.service';
import {pageSelection, PaginationService, tablePageSize} from '../../../../shared/custom-pagination/pagination.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatSortModule, Sort} from '@angular/material/sort';
import {CustomPaginationComponent} from '../../../../shared/custom-pagination/custom-pagination.component';
import {Validators} from "ngx-editor";
import {HttpClient} from "@angular/common/http";

interface select {
    data: string;
}

@Component({
    selector: 'app-companies',
    imports: [CollapseHeaderComponent, DateRangePickerComponent, SelectModule, FormsModule, CommonModule, BsDatepickerModule, RouterLink, CustomPaginationComponent, MatSortModule, ReactiveFormsModule],

    templateUrl: './companies.component.html',
    styleUrl: './companies.component.scss'
})
export class CompaniesComponent {
    routes = routes
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
    selectedCountry: any = 'Malta';
    form: FormGroup;
    currencies: any[] = [];
    countries: any;

    constructor(
        private data: DataService,
        private pagination: PaginationService,
        private router: Router,
        private sanitizer: DomSanitizer,
        private fb: FormBuilder,
        private http: HttpClient,
    ) {

        this.data.getSuperAdminCompanies().subscribe((apiRes: apiResultFormat) => {
            this.actualData = apiRes.data;
            this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
                if (this.router.url == this.routes.superAdminCompanies) {
                    this.getTableData({skip: res.skip, limit: res.limit});
                    this.pageSize = res.pageSize;
                }
            });
        });
        this.form = this.fb.group({
                files: [[] as File[]],  // will store the selected PDFs
                country: ['', Validators.required],
                companyName: ['', Validators.required],
                registrationNumber: ['', Validators.required],
                vatNumber: ['', Validators.required],
                peNumber: ['', Validators.required],
                jobsPlusEmployerNumber: ['', Validators.required],
                currency: ['', Validators.required],
                phoneNumber: ['', [Validators.required,]],
                email: [''],
                address: [''],
                website: [''],

                incorporationDate: ['', Validators.required],

                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: [''],

                status: ['active', Validators.required],
            },
            {validators: passwordMatchValidator}
        );

    }


    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        // If you want to send JSON (no files):
        // const payload = this.form.getRawValue();
        // delete payload.confirmPassword;

        // Because you have files -> use FormData:
        const formData = new FormData();
        const value = this.form.getRawValue();
        const {files, confirmPassword, ...rest} = value;

        // append scalar fields
        Object.entries(rest).forEach(([k, v]) => formData.append(k, String(v ?? '')));

        // append files
        files?.forEach((f: any, i: any) => formData.append('files', f, f.name));

        this.http.post('/api/companies', formData).subscribe({
            next: (res) => {
                console.log('Created!', res);
                // reset or close modal/offcanvas here
            },
            error: (err) => console.error(err),
        });
    }

    // quick access in template for errors
    control(name: string) {
        return this.form.get(name)!;
    }


// -------- Validators ----------


    onFilesSelected(evt: Event) {
        const input = evt.target as HTMLInputElement;
        if (!input.files?.length) return;

        const files = Array.from(input.files);
        // (optional) validate file type/size here
        this.form.patchValue({files});
        this.form.get('files')?.updateValueAndValidity();
    }

    ngOnInit(): void {
        this.select = [
            {data: 'Select'},
            {data: 'NovaWave LLC'},
            {data: 'BlueSky Industries'},
            {data: 'Summit Peak'},
            {data: 'RiverStone Ventur'}
        ];
        this.select2 = [
            {data: 'Select'},
            {data: 'Monthly'},
            {data: 'Yearly'}
        ];
        this.currencies = [

            {label: 'EURO', value: 'EURO'},
            {label: 'AED', value: 'AED'},
            {label: 'USD', value: 'USD'},
            {label: 'POUND', value: 'POUND'},
        ];
        this.select4 = [
            {data: 'Choose'},
            {data: 'English'},
            {data: 'Arabic'},
            {data: 'French'},
            {data: 'German'}
        ];
        this.countries = [
            {label: 'United Arab Emirates', value: 'uae'},
            {label: 'Georgia', value: 'georgia'},
            {label: 'Malta', value: 'malta'},
            {label: 'United Kingdom', value: 'uk'},
            {label: 'USA', value: 'usa'},
            {label: 'Netherlands', value: 'netherlands'},
            {label: 'Serbia', value: 'serbia'}
        ];

    }

    getSelectedCountry() {
        console.log(this.selectedCountry); // full object
        console.log(this.selectedCountry?.data); // just the label like 'Pakistan'
        console.log(this.selectedCountry?.code); // the value/code like 'PK'
    }

    password: boolean[] = [false];

    togglePassword(i: number): void {
        this.password[i] = !this.password[i]
    }

// pagination variables
    public tableData: superadmincompanies[] = [];
    public pageSize = 10;
    public serialNumberArray: number[] = [];
    public totalData = 0;
    showFilter = false;
    dataSource!: MatTableDataSource<superadmincompanies>;
    public searchDataValue = '';
    public tableDataCopy: superadmincompanies[] = [];
    public actualData: superadmincompanies[] = [];
    //** pagination variables

    initChecked = false;


    onClickStar(item: superadmincompanies) {
        item.isStarActive = !item.isStarActive;
    }


    private getTableData(pageOption: pageSelection): void {
        this.data.getSuperAdminCompanies().subscribe((apiRes: apiResultFormat) => {
            this.tableData = [];
            this.tableDataCopy = [];
            this.serialNumberArray = [];
            this.totalData = apiRes.totalData;
            apiRes.data.map((res: superadmincompanies, index: number) => {
                const serialNumber = index + 1;
                if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
                    res.id = serialNumber;
                    this.tableData.push(res);
                    this.serialNumberArray.push(serialNumber);
                    this.tableDataCopy.push(res);
                }
            });
            this.dataSource = new MatTableDataSource<superadmincompanies>(this.actualData);
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
        if (!sort.active || sort.direction === '') {
            this.tableData = data;
        } else {
            this.tableData = data.sort((a, b) => {
                const aValue = (a as never)[sort.active];
                const bValue = (b as never)[sort.active];
                return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
            });
        }
    }

    public row = true;

    public searchData(value: string): void {
        this.searchDataValue = value.trim().toLowerCase();
        this.dataSource.filter = this.searchDataValue;
        this.tableData = this.dataSource.filteredData;
        this.row = this.tableData.length > 0;

        if (this.searchDataValue !== '') {
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

export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password && confirm && password !== confirm
        ? {passwordMismatch: true}
        : null;
}