import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FirebaseStoreService } from "../../Services/firebase-store.service";

@Component({
  selector: "app-terms-and-conditions",
  imports: [FormsModule],
  templateUrl: "./terms-and-conditions.component.html",
  styleUrl: "./terms-and-conditions.component.scss",
})
export class TermsAndConditionsComponent implements OnInit {
  term1 = false;
  term2 = false;
  term3 = false;
  term4 = false;
  term5 = false;
  appId: any;
  sub!: Subscription;
  private fromApp: boolean = false;
  email: string = "";
  private deviceId: string = "";
  private fcmToken: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firebaseStore: FirebaseStoreService
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

  allChecked() {
    return this.term1 && this.term2 && this.term3 && this.term4 && this.term5;
  }

  agreeAndContinue() {
    if (!this.allChecked()) return;
    const queryParams: any = { email: this.email };
    if (this.fromApp) queryParams.from = "app";

    if (this.deviceId) queryParams.deviceId = this.deviceId;
    if (this.fcmToken) queryParams.fcmToken = this.fcmToken;
    if (this.appId) queryParams.appId = this.appId;
    this.router.navigate(["/nda-agreement"], { queryParams });
  }

  goBack() {
    const queryParams: any = { email: this.email };
    if (this.fromApp) queryParams.from = "app";

    if (this.deviceId) queryParams.deviceId = this.deviceId;
    if (this.fcmToken) queryParams.fcmToken = this.fcmToken;
    if (this.appId) queryParams.appId = this.appId;
    this.router.navigate(["/upload-docs"], { queryParams });
  }

  updateUrl() {
    if (this.appId) {
      const currentUrl = window.location.href;
      this.firebaseStore.updateUrlByAppId(this.appId, currentUrl);
    }
  }
}
