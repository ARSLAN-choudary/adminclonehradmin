import { Component } from "@angular/core";
import { routes } from "../../shared/routes/routes";
import { Router, RouterLink } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-forgot-password",
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent {
  forgotForm!: FormGroup;
  public routes = routes;
  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotForm.get("email")!;
  }

  onSubmit() {
    console.log(this.forgotForm.value);

    this.forgotForm.markAllAsTouched();
    if (this.forgotForm.invalid) return;

    this.router.navigate([routes.emailVerification]);
  }
}
