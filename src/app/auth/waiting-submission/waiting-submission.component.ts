import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  filter,
  interval,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from "rxjs";
import { FirebaseStoreService } from "../../Services/firebase-store.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToggleService } from "../../Services/toggle.service";
import { AuthService } from "../../Services/auth.service";

@Component({
  selector: "app-waiting-submission",
  imports: [],
  templateUrl: "./waiting-submission.component.html",
  styleUrl: "./waiting-submission.component.scss",
})
export class WaitingSubmissionComponent implements OnInit, OnDestroy {
  deviceId: any;
  private fromApp: boolean = false;
  private fcmToken: string = "";
  public email: string = "";
  private destroy$ = new Subject<void>();

  constructor(
    private firebaseStore: FirebaseStoreService,
    private route: ActivatedRoute,
    private toggle: ToggleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params["email"] || "";
      this.fromApp = params["from"] === "app";
      this.deviceId = params["deviceId"] || "";
      this.fcmToken = params["fcmToken"] || "";
      this.deviceId = params["deviceId"] || "";
      if (this.deviceId) {
        setTimeout(() => {
          this.updateUrl();
        }, 100);
      } else {
        console.warn("⚠️ deviceId missing in query params");
      }
      this.startOtpAutoCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  startOtpAutoCheck() {
    timer(0, 60000)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.toggle.getOtpData()),
        tap((email) => console.log("🔍 Email from ToggleService:", email)),
        filter((email: string) => !!email),
        switchMap((email: string) => {
          console.log("✅ Passed filter. Using email:", email);

          const payload: any = { email };

          if (this.fromApp) {
            payload.fcmToken = this.fcmToken;
            payload.deviceId = this.deviceId;
          }

          console.log("📡 Calling verifyUser with payload:", payload);
          return this.authService.verifyRole(payload);
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log("✅ verifyUser response:", res);

          if (res.data.id) {
            localStorage.setItem("userId", res.data.id);
            const currentUrl = window.location.href;
            this.firebaseStore.updateUrlByDeviceAndUserId(
              this.deviceId,
              currentUrl,
              res.data.id
            );
          }

          if (res.data.role === "TRAINEE") {
            this.router.navigate(["/trainee-dashboard"], {
              queryParams: { deviceId: this.deviceId, from: "app" },
            });
          }
        },
        error: (err: any) => {
          console.error("OTP check failed", err);
        },
      });
  }

  updateUrl() {
    if (this.deviceId) {
      const currentUrl = window.location.href;
      this.firebaseStore.updateUrlByUserId(this.deviceId, currentUrl);
    }
  }
}
