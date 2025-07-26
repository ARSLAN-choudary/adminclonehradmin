import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatOption } from "@angular/material/core";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { Validators } from "ngx-editor";
import { BsDatepickerDirective } from "ngx-bootstrap/datepicker";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import { MatButton } from "@angular/material/button";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReplaySubject, Subject, takeUntil } from "rxjs";
import { CommonModule } from "@angular/common";

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
  constructor(private fb: FormBuilder) {}

  private _onDestroy = new Subject<void>();
  countries: Country[] = [
    { id: 1, name: "Germany" },
    { id: 2, name: "USA" },
    { id: 3, name: "Canada" },
    { id: 4, name: "India" },
    { id: 5, name: "China" },
  ];

  ngOnInit() {
    this.formGroup = this.fb.group({
      regNo: ["", Validators.required],
      lastName: ["", Validators.required],
      firstName: ["", Validators.required],
      currentNationality: ["", Validators.required],
      birthNationality: ["", Validators.required],
      birthCountry: ["", Validators.required],
      birthPlace: ["", Validators.required],
      dob: ["", Validators.required],
      gender: ["", Validators.required],
      maritalStatus: ["", Validators.required],
      passportNo: ["", Validators.required],
      countryOfIssue: ["", Validators.required],
      dateOfIssue: ["", Validators.required],
      validUntil: ["", Validators.required],
      residingIn: ["", Validators.required],
      residingSince: ["", Validators.required],
    });

    this.filteredCurrentNationality.next(this.countries.slice());
    this.filteredBirthNationality.next(this.countries.slice());
    this.filteredBirthCountry.next(this.countries.slice());

    // when the user types into any filter box, re‑filter the corresponding list
    this.currentNationalityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((search) =>
        this._filterList(search, this.filteredCurrentNationality)
      );

    this.birthNationalityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((search) =>
        this._filterList(search, this.filteredBirthNationality)
      );

    this.birthCountryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((search) =>
        this._filterList(search, this.filteredBirthCountry)
      );
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

  onSubmit() {}

  onFileChange($event: Event, additionalDocs: string) {}
}
