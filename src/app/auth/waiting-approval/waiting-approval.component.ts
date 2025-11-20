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
  Subscription,
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
  appId: any;
  // userData: UserDoc | undefined;
  sub!: Subscription;
  private fromApp: boolean = false;
  private fcmToken: string = "";
  public email: string = "";
  constructor(
    private firebaseStore: FirebaseStoreService,
    private route: ActivatedRoute,
    private toggle: ToggleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fromApp = params["from"] === "app";

      if (this.fromApp) {
        this.deviceId = params["deviceId"] || "";
        this.fcmToken = params["fcmToken"] || "";
        this.appId = params["appId"] || "";
        this.email = params["email"] || "";
      } else {
        this.email = localStorage.getItem("email") || "";
        this.appId = localStorage.getItem("appId") || "";
      }

      if (!this.appId) {
        console.warn("⚠️ appId missing");
        return;
      }

      this.updateUrl();

      this.sub = this.firebaseStore
        .watchUserById(this.appId)
        .subscribe({
          next: (resp) => {
          if (resp && resp.status === "active") {
            const queryParams: any = { email: this.email };
            if (this.fromApp) queryParams.from = "app";
            if (this.deviceId) queryParams.deviceId = this.deviceId;
            if (this.fcmToken) queryParams.fcmToken = this.fcmToken;
            if (this.appId) queryParams.appId = this.appId;
            this.router.navigate(["/upload-docs"], {
              queryParams,
            });
          }
        },
        error: (err) => {
          this.router.navigate(["/app-register"], {
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private updateUrl() {
    if (this.appId) {
      const currentUrl = window.location.href;
      this.firebaseStore.updateUrlByAppId(this.appId, currentUrl);
    }
  }
}
