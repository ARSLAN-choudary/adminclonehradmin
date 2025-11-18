import { Component, OnDestroy, OnInit } from "@angular/core";
import { FirebaseStoreService } from "../../Services/firebase-store.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToggleService } from "../../Services/toggle.service";
import { AuthService } from "../../Services/auth.service";
import { log } from "@techstark/opencv-js";
import { filter, interval, Subject, switchMap, takeUntil } from "rxjs";

@Component({
  selector: "app-waiting-approval",
  imports: [],
  templateUrl: "./waiting-approval.component.html",
  styleUrl: "./waiting-approval.component.scss",
})
export class WaitingApprovalComponent implements OnInit, OnDestroy {
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
    this.startOtpAutoCheck();

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
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  startOtpAutoCheck() {
    interval(60000)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.toggle.getOtpData()),
        filter((data: any) => data && data.email),
        switchMap((data: any) => {
          const payload: any = {
            email: data.email,
          };
          if (this.fromApp) {
            payload.fcmToken = this.fcmToken;
            payload.deviceId = this.deviceId;
          }
          return this.authService.verifyUser(payload);
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res.data.id) {
            localStorage.setItem("userId", res.data.id);
            const currentUrl = window.location.href;
            this.firebaseStore.updateUrlByDeviceAndUserId(
              this.deviceId,
              currentUrl,
              res.data.id
            );
          }
          if (res.data.status === "active") {
            this.router.navigate(["/trainee-dashboard"], {
              queryParams: { deviceId: this.deviceId, from: "app" },
            });
            // console.log("active");
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
      this.firebaseStore.updateUrlByDeviceId(this.deviceId, currentUrl);
    }
  }
}
