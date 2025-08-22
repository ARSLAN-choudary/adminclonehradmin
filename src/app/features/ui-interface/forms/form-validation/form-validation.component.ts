import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-form-validation',
    templateUrl: './form-validation.component.html',
    styleUrls: ['./form-validation.component.scss'],
    imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink]
})
export class FormValidationComponent {
  routes=routes
  myForm!: FormGroup;
  myForm1!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      agree: [false, Validators.requiredTrue]
    });
    this.myForm1 = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      agree: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
    } else {
      this.myForm.markAllAsTouched();
    }
  }
  onSubmit1(): void {
    if (this.myForm1.valid) {
    } else {
      this.myForm1.markAllAsTouched(); 
    }
  }
 
}
