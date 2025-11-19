import { Component, OnDestroy, OnInit } from "@angular/core";
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
  userId: any;
  private fromApp: boolean = false;
  private fcmToken: string = "";
  public email: string = "";

  sub!: Subscription;

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
        this.userId = params["userId"] || "";
        this.email = params["email"] || "";
      } else {
        this.email = localStorage.getItem("email") || "";
        this.userId = localStorage.getItem("userId") || "";
      }

      if (!this.userId) {
        console.warn("⚠️ userId missing");
        return;
      }

      this.updateUrl();

      this.sub = this.firebaseStore
        .watchUserById(this.userId)
        .subscribe((resp) => {
          if (resp && resp.role === "TRAINEE") {
            const queryParams: any = { email: this.email };
            if (this.fromApp) queryParams.from = "app";

            if (this.deviceId) queryParams.deviceId = this.deviceId;
            if (this.fcmToken) queryParams.fcmToken = this.fcmToken;
            if (this.userId) queryParams.userId = this.userId;
            this.router.navigate(["/trainee-dashboard"], {
              queryParams,
            });
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private updateUrl() {
    if (this.userId) {
      const currentUrl = window.location.href;
      this.firebaseStore.updateUrlByUserId(this.userId, currentUrl);
    }
  }
}
