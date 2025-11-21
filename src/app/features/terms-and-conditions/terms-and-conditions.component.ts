import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { FirebaseStoreService } from "../../Services/firebase-store.service";
import { BackendService } from "../../Services/backend.service";

type TermKey = "term1" | "term2" | "term3" | "term4" | "term5" | "term6";

@Component({
  selector: "app-terms-and-conditions",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./terms-and-conditions.component.html",
  styleUrl: "./terms-and-conditions.component.scss",
})
export class TermsAndConditionsComponent implements OnInit {
  // original booleans + NDA
  term1 = false;
  term2 = false;
  term3 = false;
  term4 = false;
  term5 = false;
  term6 = false; // NDA

  // which term is currently open in the modal
  activeTermKey: TermKey | null = null;

  // detailed content for each term (shown in modal)
  termsContent: Record<TermKey, { title: string; detail: string }> = {
    term1: {
      title: "Accuracy of Information",
      detail:
        "I confirm that all personal and document information provided is complete, accurate, and truthful to the best of my knowledge. I understand that providing false or misleading information may lead to the termination of my application and potential legal consequences.",
    },
    term2: {
      title: "Use of False or Invalid Documents",
      detail:
        "I understand that submitting falsified, altered, or invalid documents will result in automatic rejection of my application. The organization reserves the right to review, verify, and report any suspected fraud to the relevant authorities where applicable.",
    },
    term3: {
      title: "Consent to Data Processing",
      detail:
        "I consent to the collection, storage, and processing of my personal information and documents for the purpose of reviewing, verifying, and managing my application, in accordance with applicable data protection and privacy regulations.",
    },
    term4: {
      title: "Privacy Policy & Terms of Service",
      detail:
        "I have read, understood, and agree to the platform’s Privacy Policy and Terms of Service. I acknowledge that it is my responsibility to regularly review any updates to these policies while I continue to use the platform.",
    },
    term5: {
      title: "Additional Verification & Documents",
      detail:
        "I acknowledge that additional verification steps or documents may be requested at any stage of the process. I agree to provide any requested information or documentation in a timely and accurate manner to avoid delays or rejection of my application.",
    },
    term6: {
      title: "Non-Disclosure Agreement (NDA)",
      detail:
        "I agree that any confidential, proprietary, or sensitive information shared with me during the course of this process, including but not limited to training materials, internal data, business strategies, client information, or technical implementations, will not be disclosed, shared, copied, or used outside of the authorized purpose. I will not discuss or distribute such information with any third party without prior written consent from the organization. This obligation of confidentiality continues to apply even after my access to the platform, training, or engagement has ended.",
    },
  };

  appId: any;
  sub!: Subscription;
  private fromApp: boolean = false;
  email: string = "";
  private deviceId: string = "";
  private fcmToken: string = "";

  constructor(
    private backend: BackendService,
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

      this.sub = this.firebaseStore.watchUserById(this.appId).subscribe({
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
          this.router.navigate(["/app-register"], {});
        },
      });
    });
  }

  // When user clicks a checkbox → prevent direct toggle and open modal
  onTermClick(key: TermKey, event: MouseEvent) {
    event.preventDefault(); // stop checkbox from toggling immediately
    this.activeTermKey = key;
  }

  closeModal() {
    this.activeTermKey = null;
  }

  // User clicks "I Agree" in modal
  agreeCurrentTerm() {
    if (!this.activeTermKey) return;

    switch (this.activeTermKey) {
      case "term1":
        this.term1 = true;
        break;
      case "term2":
        this.term2 = true;
        break;
      case "term3":
        this.term3 = true;
        break;
      case "term4":
        this.term4 = true;
        break;
      case "term5":
        this.term5 = true;
        break;
      case "term6":
        this.term6 = true;
        break;
    }

    this.closeModal();
  }

  allChecked() {
    return (
      this.term1 &&
      this.term2 &&
      this.term3 &&
      this.term4 &&
      this.term5 &&
      this.term6
    );
  }

  agreeAndContinue() {
    if (!this.allChecked()) return;

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
