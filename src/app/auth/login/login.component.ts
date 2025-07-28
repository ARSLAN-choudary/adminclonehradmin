import { Component, OnInit, signal, WritableSignal } from "@angular/core";
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
import { AuthService } from "../../Services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],

  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword: boolean = true;
  routes = routes;
  errorMsg: WritableSignal<string> = signal("");
  successMsg: WritableSignal<string> = signal("");

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  currentYear: any;

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.checkIfAlreadyLogin();
  }

  checkIfAlreadyLogin() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(["/"]);
    }
    localStorage.clear();
  }

  public navigate() {
    this.router.navigate([routes.index]);
  }

  public togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.auth.login(email, password).subscribe(
      (data) => {
        console.log(data);
        if (data.data.token) {
          localStorage.setItem("token", data.data.token);
          debugger
          this.toastr.success(data.message);
          this.successMsg.set(data.message);
          this.router.navigate(["/"]);
        }
      },
      (error) => {
        console.log(error.error.message);
        this.errorMsg.set(error.error.message);
        this.toastr.error(error.error.message);
        setTimeout(() => {
          this.errorMsg.set("");
        }, 3000);
      }
    );
  }

  // for template convenience
  get email() {
    return this.loginForm.get("email")!;
  }

  get password() {
    return this.loginForm.get("password")!;
  }
}
