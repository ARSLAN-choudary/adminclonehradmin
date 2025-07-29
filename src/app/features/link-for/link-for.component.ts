import {Component, OnInit} from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {Validators} from "ngx-editor";
import {BsDatepickerDirective} from "ngx-bootstrap/datepicker";
import {
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {CommonModule} from "@angular/common";
import {BackendService} from "../../Services/backend.service";
import {ToastrService} from "ngx-toastr";

interface Country {
    id: number;
    name: string;
}

@Component({
    selector: "app-link-for",
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxMatSelectSearchModule,
        MatFormFieldModule,
        MatSelectModule,

        MatOption,
        MatSelect,
    ],

    templateUrl: "./link-for.component.html",
    styleUrl: "./link-for.component.scss",
})
export class LinkForComponent implements OnInit {
    formGroup!: FormGroup;
    employeeForm!: FormGroup;
    countryCtrl = new FormControl();
    currentNationalityCtrl = new FormControl<number | null>(null);
    birthNationalityCtrl = new FormControl<number | null>(null);
    birthCountryCtrl = new FormControl<number | null>(null);

    currentNationalityFilterCtrl = new FormControl<string>("");
    birthNationalityFilterCtrl = new FormControl<string>("");
    birthCountryFilterCtrl = new FormControl<string>("");

    filteredCurrentNationality = new ReplaySubject<Country[]>(1);
    filteredBirthNationality = new ReplaySubject<Country[]>(1);
    filteredBirthCountry = new ReplaySubject<Country[]>(1);

    constructor(private fb: FormBuilder,
                private toastr: ToastrService,
                private backend: BackendService) {
    }

    private _onDestroy = new Subject<void>();
    countries: Country[] = [
        {id: 1, name: "Germany"},
        {id: 2, name: "USA"},
        {id: 3, name: "Canada"},
        {id: 4, name: "India"},
        {id: 5, name: "China"},
    ];

    ngOnInit(): void {
        this.employeeForm = this.fb.group({
            // Personal Details
            malteseRegistrationNo: ['', Validators.required],
            lastName: ['', Validators.required],
            firstName: ['', Validators.required],
            currentNationality: ['', Validators.required],
            birthNationality: ['', Validators.required],
            countryOfBirth: ['', Validators.required],
            placeOfBirth: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            gender: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            passportNo: ['', Validators.required],
            countryOfIssue: ['', Validators.required],
            dateOfIssue: ['', Validators.required],
            validUntil: ['', Validators.required],
            currentlyResidingIn: ['', Validators.required],
            residingSince: ['', Validators.required],

            // Address in Malta
            addressInMalta: this.fb.group({
                locality: ['', Validators.required],
                street: ['', Validators.required],
                property: ['', Validators.required],
                buildingInfo: [''],
                postCode: ['', Validators.required],
            }),

            // Permanent Address Abroad
            permanentAddressAbroad: this.fb.group({
                doorNo: [''],
                street: ['', Validators.required],
                locality: ['', Validators.required],
                postCode: ['', Validators.required],
                country: ['', Validators.required],
            }),

            // Document Uploads (optional fields for now)
            passportScan: [null],
            residenceIdCard: [null],
            drivingLicense: [null],
            curriculumVitae: [null],
            additionalDocuments: [null],
        });
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    private _filterList(
        search: string | null,
        outputStream: ReplaySubject<Country[]>
    ) {
        const term = (search || "").toLowerCase();
        const filtered = this.countries.filter((c) =>
            c.name.toLowerCase().includes(term)
        );
        outputStream.next(filtered);
    }

    onSubmit(): void {
        debugger
        console.log(this.employeeForm.value)
        // if (this.employeeForm.invalid) {
        //     this.employeeForm.markAllAsTouched();
        //     return;
        // }
        console.log(this.employeeForm.value);
        this.employeeForm.markAllAsTouched();
        this.backend.addUserDetails(this.employeeForm.value).subscribe({
            next: (res: any) => {
                this.toastr.success(res.message);
                this.employeeForm.reset();
            },
            error: (err) => {
                this.toastr.success(err.message);
            },
        })
    }

    onFileChange($event:
                 Event, additionalDocs
                 :
                 string
    ) {
    }
}
