import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {Validators} from "ngx-editor";
import {BsDatepickerDirective} from "ngx-bootstrap/datepicker";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-link-for',
    standalone: true,
    imports: [
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        MatLabel,
        MatFormField,
        MatOption,
        MatSelect,
        MatDatepickerToggle,
        MatDatepicker,
        MatButton,
        MatDatepickerInput,

    ],

    templateUrl: './link-for.component.html',
    styleUrl: './link-for.component.scss'
})
export class LinkForComponent implements OnInit {
    formGroup!: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            regNo: ['', Validators.required],
            lastName: ['', Validators.required],
            firstName: ['', Validators.required],
            currentNationality: ['', Validators.required],
            birthNationality: ['', Validators.required],
            birthCountry: ['', Validators.required],
            birthPlace: ['', Validators.required],
            dob: ['', Validators.required],
            gender: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            passportNo: ['', Validators.required],
            countryOfIssue: ['', Validators.required],
            dateOfIssue: ['', Validators.required],
            validUntil: ['', Validators.required],
            residingIn: ['', Validators.required],
            residingSince: ['', Validators.required]
        });
    }

    onSubmit() {

    }

    onFileChange($event: Event, additionalDocs: string) {
        
    }
}
