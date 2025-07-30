import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { routes } from "../../shared/routes/routes";
import { Router, RouterLink } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { BackendService } from "../../Services/backend.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-forgot-password",
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild("appSubmittedCanvas", { static: true })
  appSubmittedCanvas!: ElementRef<HTMLElement>;

  forgotForm!: FormGroup;
  resetForm!: FormGroup;
  currentYear: any;
  private backdropEl?: HTMLElement;

  public routes = routes;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private renderer: Renderer2,
    private backend: BackendService,
    private toastr: ToastrService
  ) {
    this.currentYear = new Date().getFullYear();
    this.forgotForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });

    this.resetForm = this.fb.group({
      email: [
        { value: "", disabled: true },
        [Validators.required, Validators.email],
      ],
      otp: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.forgotForm.get("email")!;
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;
    const email = this.forgotForm.value.email;
    this.backend.sentOtp({ email }).subscribe({
      next: () => {
        this.resetForm.patchValue({ email });
        this.openOtpModal();
      },
      error: (err) => this.toastr.error(err.message || "Failed to send OTP"),
    });
  }

  onResetSubmit() {
    if (this.resetForm.invalid) return;

    const payload = {
      email: this.resetForm.get("email")!.value,
      otp: this.resetForm.value.otp,
      newPassword: this.resetForm.value.newPassword,
    };
    this.backend.verifyOtp(payload).subscribe({
      next: () => {
        this.toastr.success("Password has been reset");
        this.closeOtpModal();
      },
      error: (err: any) => this.toastr.error(err.message || "Reset failed"),
    });
  }

  openOtpModal() {
    const el = this.appSubmittedCanvas.nativeElement;

    this.renderer.addClass(el, "show");
    this.renderer.setStyle(el, "visibility", "visible");
    this.renderer.setAttribute(el, "aria-modal", "true");
    this.renderer.removeAttribute(el, "aria-hidden");
    this.renderer.setStyle(document.body, "overflow", "hidden");

    this.backdropEl = this.renderer.createElement("div");
    this.renderer.addClass(this.backdropEl, "offcanvas-backdrop");
    this.renderer.addClass(this.backdropEl, "fade");
    this.renderer.addClass(this.backdropEl, "show");
    if (this.backdropEl) {
      this.backdropEl.addEventListener("click", () => this.closeOtpModal());
      this.renderer.appendChild(document.body, this.backdropEl);
    }
  }

  closeOtpModal() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const el = this.appSubmittedCanvas.nativeElement;

    this.renderer.removeClass(el, "show");
    this.renderer.setStyle(el, "visibility", "hidden");
    this.renderer.removeAttribute(el, "aria-modal");
    this.renderer.setAttribute(el, "aria-hidden", "true");

    this.renderer.removeStyle(document.body, "overflow");

    if (this.backdropEl) {
      this.renderer.removeChild(document.body, this.backdropEl);
      this.backdropEl = undefined;
    }
    this.forgotForm.reset();
    this.resetForm.reset();
  }
}
