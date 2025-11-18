import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../Services/auth.service";
import { routes } from "../../shared/routes/routes";
import { FirebaseStoreService } from "../../Services/firebase-store.service";
import { ToggleService } from "../../Services/toggle.service";

@Component({
  selector: "app-two-step-verification",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./two-step-verification.component.html",
  styleUrls: ["./two-step-verification.component.scss"],
})
export class TwoStepVerificationComponent implements OnInit, OnDestroy {
  public routes = routes;
  public currentYear = new Date().getFullYear();
  public email: string = "";
  public loading = false;
  public errorMessage = "";
  deviceId: any;
  private fcmToken: string = "";
  public oneTimePassword = {
    data1: "",
    data2: "",
    data3: "",
    data4: "",
  };

  public countdownDisplay: string = "10:00";
  private countdownInterval: any;
  private totalSeconds: number = 600;

  // ✅ Flutter safety check flag
  private fromApp: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private firebaseStore: FirebaseStoreService,
    private toggle: ToggleService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params["email"] || "";
      this.fromApp = params["from"] === "app"; // 🔹 Detect if opened from Flutter
      this.deviceId = params["deviceId"] || "";
      this.fcmToken = params["fcmToken"] || "";
    });

    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  // --- Countdown logic ---
  private startCountdown(): void {
    this.totalSeconds = 600;
    this.updateCountdownDisplay();

    this.countdownInterval = setInterval(() => {
      this.totalSeconds--;
      this.updateCountdownDisplay();

      if (this.totalSeconds <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  private updateCountdownDisplay(): void {
    const minutes = Math.floor(this.totalSeconds / 60);
    const seconds = this.totalSeconds % 60;
    this.countdownDisplay = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  // --- Input handling ---
  // --- Input handling ---
  public ValueChanged(event: any, box: string): void {
    const input = event.target as HTMLInputElement;
    // Allow only digits and max 1 character
    input.value = input.value.replace(/[^0-9]/g, "").slice(0, 1);

    // Sync model
    switch (box) {
      case "digit-1":
        this.oneTimePassword.data1 = input.value;
        if (input.value) document.getElementById("digit-2")?.focus();
        break;
      case "digit-2":
        this.oneTimePassword.data2 = input.value;
        if (input.value) document.getElementById("digit-3")?.focus();
        break;
      case "digit-3":
        this.oneTimePassword.data3 = input.value;
        if (input.value) document.getElementById("digit-4")?.focus();
        break;
      case "digit-4":
        this.oneTimePassword.data4 = input.value;
        break;
    }

    const otp = this.getFullOtp();
    if (otp.length === 4) {
      setTimeout(() => this.verifyOtp(), 100);
    }
  }

  public tiggerBackspace(event: any, box: string): void {
    const input = event.target as HTMLInputElement;

    if (event.key === "Backspace" && !input.value) {
      switch (box) {
        case "digit-4":
          this.focusPrev("digit-3");
          break;
        case "digit-3":
          this.focusPrev("digit-2");
          break;
        case "digit-2":
          this.focusPrev("digit-1");
          break;
      }
    }
  }

  private focusPrev(id: string) {
    const prev = document.getElementById(id) as HTMLInputElement;
    prev?.focus();
    prev?.select();
  }

  private getFullOtp(): string {
    return (
      this.oneTimePassword.data1 +
      this.oneTimePassword.data2 +
      this.oneTimePassword.data3 +
      this.oneTimePassword.data4
    );
  }

  // --- OTP Verification ---
  verifyOtp() {
    const otp = this.getFullOtp();

    if (otp.length !== 4) {
      this.errorMessage = "Please enter a valid 4-digit OTP";
      return;
    }

    this.loading = true;
    this.errorMessage = "";

    // console.log("📤 Verifying OTP:", { email: this.email, otp });
    let payload: any = {
      email: this.email,
      otp: otp,
    };
    if (this.fromApp) {
      payload.fcmToken = this.fcmToken;
      payload.deviceId = this.deviceId;
    }

    this.authService.verifyOtp(payload).subscribe({
      next: (res: any) => {
        console.log("✅ OTP Verified Successfully:", res);
        localStorage.setItem("userId", res.data?.details?._id);
        this.toggle.setOtpData(this.email);
        this.loading = false;
        if (this.fromApp) {
          this.router.navigate(["/waiting-for-approval"], {
            queryParams: { deviceId: this.deviceId, from: "app" },
          });
        } else {
          this.router.navigateByUrl("waiting-for-approval");
        }

        if (!this.fromApp) {
          this.otpSucces();
        }
      },
      error: (err: any) => {
        this.loading = false;
        console.error("❌ OTP verification failed:", err);
        this.errorMessage =
          err?.error?.message || "OTP verification failed, please try again.";
      },
    });
  }

  // --- Deep link logic (safe version) ---
  otpSucces() {
    if (!this.fromApp) {
      const redirectUrl = "/login";
      const flutterUrl = `blacklane://registered?redirect=${encodeURIComponent(
        redirectUrl
      )}`;
      window.location.href = flutterUrl;
    }

    setTimeout(() => {
      if (!document.hidden && !this.fromApp) {
        if (this.isMobileDevice()) {
          if (!this.isInWebView()) {
            alert("Please open the Blacklane app to complete registration!");
          }
        } else {
          alert("Please open the Blacklane app to complete registration!");
        }
      }
    }, 1000);
  }

  private isInWebView(): boolean {
    const userAgent = navigator.userAgent || navigator.vendor || "";
    return (
      /wv/.test(userAgent) ||
      /\bWebView\b/.test(userAgent) ||
      /FBAN|FBAV/.test(userAgent) ||
      /\bInstagram\b/.test(userAgent) ||
      (window as any).flutter_inappwebview !== undefined
    );
  }

  private isMobileDevice(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  // async save() {
  //   await this.fbService.saveUrlByEmail(this.email, this.url);
  //   const data = await this.fbService.getUrlsByEmail(this.email);
  //   console.log("📦 Firestore data for user:", data);
  // }
}
