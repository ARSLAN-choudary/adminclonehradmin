import { Component } from "@angular/core";
import { routes } from "../../shared/routes/routes";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-login",
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword: boolean = true;
  routes = routes;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      rememberMe: [false],
    });
  }

  public navigate() {
    this.router.navigate([routes.index]);
  }

  public togglePassword(index: any) {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    // mark controls so errors show
    console.log(this.loginForm.value);

    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    // this.router.navigate(["/"]);
  }

  // for template convenience
  get email() {
    return this.loginForm.get("email")!;
  }
  get password() {
    return this.loginForm.get("password")!;
  }
}
