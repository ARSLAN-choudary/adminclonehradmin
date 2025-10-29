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
import { HttpErrorResponse } from "@angular/common/http";

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
                if (data.data.token) {
                    localStorage.setItem("token", data.data.token);
                    this.toastr.success(data.message);
                    this.successMsg.set(data.message);
                    this.router.navigate(["/index"]);
                }
            },
            (error: HttpErrorResponse) => {
                let backendMsg: string;

                if (
                    error.error &&
                    typeof error.error === "object" &&
                    "message" in error.error
                ) {
                    backendMsg = (error.error as any).message;
                } else if (typeof error.error === "string") {
                    backendMsg = error.error;
                } else {
                    backendMsg = error.message;
                }

                this.errorMsg.set(backendMsg);
                this.toastr.error(backendMsg);

                setTimeout(() => this.errorMsg.set(""), 3000);
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
