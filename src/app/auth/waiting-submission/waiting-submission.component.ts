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
  appId: any;
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
        this.appId = params["appId"] || "";
        this.email = params["email"] || "";
      } else {
        this.email = localStorage.getItem("email") || "";
        this.appId = localStorage.getItem("appId") || "";
      }

     
      this.updateUrl();

      this.sub = this.firebaseStore
        .watchUserById(this.appId)
        .subscribe({
          next: (resp) => {
          console.log(resp);

          const queryParams: any = { email: this.email };
          if (this.fromApp) queryParams.from = "app";

          if (this.deviceId) queryParams.deviceId = this.deviceId;
          if (this.fcmToken) queryParams.fcmToken = this.fcmToken;
          if (this.appId) queryParams.appId = this.appId;
          if (
            resp &&
            resp.role === "TRAINEE" &&
            resp.termsAndCondition === true &&
            resp.nda === true &&
            resp.documentsRejected === false
          ) {
            this.router.navigate(["/trainee-dashboard"], {
              queryParams,
            });
          } else if (
            resp &&
            resp.role === "USER" &&
            resp.termsAndCondition === true &&
            resp.nda === true &&
            resp.documentsRejected === true
          ) {
            this.router.navigate(["/resubmit-docs"], {
              queryParams,
            });
          } else if (
            resp &&
            resp.role === "TRAINEE" &&
            resp.termsAndCondition === true &&
            resp.nda === true &&
            resp.documentsRejected === true
          ) {
            this.router.navigate(["/resubmit-docs"], {
              queryParams,
            });
          } else if (
            resp &&
            resp.role === "USER" &&
            resp.termsAndCondition === false &&
            resp.nda === false
          ) {
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
