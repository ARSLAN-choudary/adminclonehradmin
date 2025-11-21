import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FirebaseStoreService } from "../../Services/firebase-store.service";
import { BackendService } from "../../Services/backend.service";

@Component({
  selector: "app-nda-agreement",
  imports: [FormsModule],
  templateUrl: "./nda-agreement.component.html",
  styleUrl: "./nda-agreement.component.scss",
})
export class NdaAgreementComponent implements OnInit {
  ndaAgree: boolean = false;

  appId: any;
  sub!: Subscription;
  private fromApp: boolean = false;
  email: string = "";
  private deviceId: string = "";
  private fcmToken: string = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backend: BackendService,
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

  updateUrl() {
    if (this.appId) {
      const currentUrl = window.location.href;
      this.firebaseStore.updateUrlByAppId(this.appId, currentUrl);
    }
  }

  goBack() {
    const queryParams: any = { email: this.email };
    if (this.fromApp) queryParams.from = "app";

    if (this.deviceId) queryParams.deviceId = this.deviceId;
    if (this.fcmToken) queryParams.fcmToken = this.fcmToken;
    if (this.appId) queryParams.appId = this.appId;
    this.router.navigate(["/terms-and-conditions"], { queryParams });
  }

  agreeAndContinue() {
    if (this.ndaAgree) {
      const queryParams: any = { email: this.email };
      if (this.fromApp) queryParams.from = "app";

      if (this.deviceId) queryParams.deviceId = this.deviceId;
      if (this.fcmToken) queryParams.fcmToken = this.fcmToken;
      if (this.appId) queryParams.appId = this.appId;
      let payload = {
        applicationId: this.appId,
        termsAndCondition: true,
      };
      this.backend.setTermCondition(payload).subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate(["/waiting-for-application-submission"], {
              queryParams,
            });
          }
        },
        error: (err) => {
          console.error("Error :", err);
          alert("Please try again.");
        },
      });
    }
  }
}
