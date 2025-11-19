import { Component, OnDestroy, OnInit } from "@angular/core";
import { FirebaseStoreService } from "../../Services/firebase-store.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToggleService } from "../../Services/toggle.service";
import { AuthService } from "../../Services/auth.service";
import { log } from "@techstark/opencv-js";
import {
  filter,
  interval,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from "rxjs";

@Component({
  selector: "app-waiting-approval",
  imports: [],
  templateUrl: "./waiting-approval.component.html",
  styleUrl: "./waiting-approval.component.scss",
})
export class WaitingApprovalComponent implements OnInit, OnDestroy {
  deviceId: any;
  userId: any;
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
    this.email = localStorage.getItem("email") || "";

    this.route.queryParams.subscribe((params) => {
      // this.email = params["email"] || "";
      this.fromApp = params["from"] === "app";
      this.deviceId = params["deviceId"] || "";
      this.fcmToken = params["fcmToken"] || "";
      this.deviceId = params["deviceId"] || "";
      this.userId = params["userId"] || "";
      if (this.userId) {
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

          const payload: any = {
            email,
            fcmToken: this.fcmToken,
            deviceId: this.deviceId,
          };

          return this.authService.verifyUser(payload);
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log("✅ verifyUser response:", res);

          if (res.data.id) {
            localStorage.setItem("userId", res.data.id);
            const currentUrl = window.location.href;
            this.firebaseStore.saveUrlByDeviceId(
              res.data.id,
              this.email,
              currentUrl,
              res.data.status,
              res.data.role,
              this.deviceId
            );
          }

          if (res.data.status === "active") {
            this.router.navigate(["/upload-docs"], {
              queryParams: { userId: this.userId, from: "app" },
            });
          }
        },
        error: (err: any) => {
          console.error("OTP check failed", err);
        },
      });
  }

  updateUrl() {
    if (this.userId) {
      const currentUrl = window.location.href;
      this.firebaseStore.updateUrlByUserId(this.userId, currentUrl);
    }
  }
}
