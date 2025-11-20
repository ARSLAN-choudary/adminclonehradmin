import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  NgApexchartsModule,
  ApexGrid,
} from "ng-apexcharts";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { routes } from "../../../shared/routes/routes";
import { CollapseHeaderComponent } from "../../../features/common/collapse-header/collapse-header.component";
import { DateRangePickerComponent } from "../../../features/common/date-range-picker/date-range-picker.component";
import { FirebaseStoreService } from "../../../Services/firebase-store.service";
import { ToggleService } from "../../../Services/toggle.service";
import { AuthService } from "../../../Services/auth.service";
import { BackendService } from "../../../Services/backend.service";
export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  colors: any;
  grid: ApexGrid | any;
}
interface TrainingModule {
  id: number;
  title: string;
  subtitle: string;
  level: string;
  completed: number;
  total: number;
  progress: number; // 0–100
  nextAction: string;
}

interface TrainingTask {
  id: number;
  title: string;
  description: string;
  status: "Not Started" | "In Progress" | "Completed";
  progress: number; // 0–100
}
@Component({
  selector: "app-dashboard",
  imports: [
    NgApexchartsModule,
    
    CollapseHeaderComponent,
    FormsModule,
    CommonModule,
    BsDatepickerModule,
    DateRangePickerComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  deviceId: any;
  appId: any;
  email: any;
  fromApp: any;
  fcmToken: any;
  public routes = routes;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;
  
// contract 
  @ViewChild("generateContractCanvas", { static: true })
  generateContractCanvas!: ElementRef<HTMLElement>;

  isGenerating = false;
  currentApplicationId: string = '';
  constructor(
    private renderer: Renderer2,
    private firebaseStore: FirebaseStoreService,
    private route: ActivatedRoute,
    private toggle: ToggleService,
    private authService: AuthService,
    private router: Router,
    private backendService: BackendService
  ) {
    this.chartOptions = {
      series: [
        {
          data: [400, 220, 448],
        },
      ],
      chart: {
        type: "bar",
        height: 180,
        toolbar: {
          show: false,
        },
      },

      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#EF1E1E"],
      grid: {
        borderColor: "#E8E8E8",
        strokeDashArray: 4,
      },
      xaxis: {
        categories: ["Conversation", "Follow Up", "Inpipeline"],
      },
    };
    this.chartOptions2 = {
      series: [
        {
          data: [400, 122, 250],
        },
      ],
      chart: {
        type: "bar",
        height: 180,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#27AE60"],
      grid: {
        borderColor: "#E8E8E8",
        strokeDashArray: 4,
      },
      xaxis: {
        categories: ["Conversation", "Follow Up", "Inpipeline"],
      },
    };
    this.chartOptions3 = {
      series: [44, 55, 13, 43],
      chart: {
        height: 440,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      colors: ["#2F80ED", "#27AE60", "#FFA201", "#E41F07"],
      labels: ["Inpipeline", "Follow Up", "Schedule Service", "Conversation"],
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 1199,
          options: {
            chart: {
              height: 350,
            },
            legend: {
              position: "bottom",
            },
          },
        },
        {
          breakpoint: 575,
          options: {
            chart: {
              height: 280,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    this.chartOptions4 = {
      series: [
        {
          name: "Reports",
          data: [3, 4.5, 2.0, 3.0, 2.5, 4, 2, 4, 3.5, 5, 3, 2],
        },
      ],
      chart: {
        height: 273,
        type: "area",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#4A00E5"],
      dataLabels: {
        enabled: false,
      },
      title: {
        text: "",
        align: "left",
      },
      grid: {
        borderColor: "#E8E8E8",
        strokeDashArray: 4,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        min: 1,
        max: 6,
        tickAmount: 5,
        labels: {
          offsetX: -15,
          formatter: (val: any) => {
            return val / 1 + "K";
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
    };
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, "date-picker");
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
    });
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, "date-picker");
  }

  private updateUrl() {
    if (this.appId) {
      const currentUrl = window.location.href;
      this.firebaseStore.updateUrlByAppId(this.appId, currentUrl);
    }
  }

  onTrainingProgressClick(module: TrainingModule) {
    // Step through 0 → 25 → 50 → 75 → 100
    const steps = [0, 25, 50, 75, 100];
    const currentIndex = steps.findIndex((s) => s === module.progress);
    const nextIndex = (currentIndex + 1) % steps.length;
    const nextProgress = steps[nextIndex];

    module.progress = nextProgress;
    module.completed = Math.round((module.total * nextProgress) / 100);

    if (nextProgress === 100) {
      module.nextAction = "All steps completed";
    } else if (nextProgress === 0) {
      module.nextAction = "Start first lesson";
    } else {
      module.nextAction = "Continue where you left off";
    }
  }

  // ===== Training interactions (click on task items) =====
  onTrainingTaskClick(task: TrainingTask) {
    if (task.status === "Not Started") {
      task.status = "In Progress";
      task.progress = 40;
    } else if (task.status === "In Progress") {
      task.status = "Completed";
      task.progress = 100;
    } else {
      task.status = "Not Started";
      task.progress = 0;
    }
  }

  getTaskBadgeClass(status: TrainingTask["status"]): string {
    switch (status) {
      case "Completed":
        return "bg-success";
      case "In Progress":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  }
  // ===== Training progress cards data =====
  trainingProgress: TrainingModule[] = [
    {
      id: 1,
      title: "Frontend Fundamentals (Angular)",
      subtitle: "Core · SPA Development",
      level: "Intermediate",
      completed: 3,
      total: 6,
      progress: 50,
      nextAction: "Finish reactive forms & routing module",
    },
    {
      id: 2,
      title: "Backend APIs & Microservices",
      subtitle: "Node.js / .NET · REST",
      level: "Beginner",
      completed: 2,
      total: 5,
      progress: 40,
      nextAction: "Implement one secured endpoint",
    },
    {
      id: 3,
      title: "Clean Code & Best Practices",
      subtitle: "SOLID · Refactoring · Reviews",
      level: "Advanced",
      completed: 4,
      total: 4,
      progress: 100,
      nextAction: "All topics completed – apply in code reviews",
    },
  ];

  // ===== Training tasks list data =====
  trainingTasks: TrainingTask[] = [
    {
      id: 1,
      title: "Complete Git & Branching Workflow",
      description: "Finish feature-branch, PR & code review module",
      status: "In Progress",
      progress: 50,
    },
    {
      id: 2,
      title: "Implement API Integration for Dashboard",
      description: "Connect Angular service to /reports backend endpoint",
      status: "Not Started",
      progress: 0,
    },
    {
      id: 3,
      title: "Write Unit Tests for Auth Module",
      description: "Cover login & token refresh flows with tests",
      status: "Completed",
      progress: 100,
    },
  ];

  // Overall % for header badge
  get overallTrainingProgress(): number {
    if (!this.trainingProgress.length) return 0;
    const sum = this.trainingProgress.reduce((acc, m) => acc + m.progress, 0);
    return Math.round(sum / this.trainingProgress.length);
  }

  // Completed tasks counter
  get completedTasks(): number {
    return this.trainingTasks.filter((t) => t.status === "Completed").length;
  }
  
    // contract  
  
  
    // Helper methods to get specific contracts
    get traineeContract(): any {
      return this.contracts.find(contract => contract.name === 'trainee');
    }
  
    get probationContract(): any {
      return this.contracts.find(contract => contract.name === 'probation');
    }
  
    get jobContract(): any {
      return this.contracts.find(contract => contract.name === 'job');
    }
  
    get hasTraineeContract(): boolean {
      return !!this.traineeContract;
    }
  
    get hasProbationContract(): boolean {
      return !!this.probationContract;
    }
  
    get hasJobContract(): boolean {
      return !!this.jobContract;
    }
  
    get hasGeneratedContracts(): boolean {
      return this.contracts.length > 0;
    }
  
    // Load contracts from backend
    loadContracts(applicationId: string) {
      this.backendService.getUploadContract(applicationId).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.contracts = res.data || [];
            console.log('Loaded contracts:', this.contracts);
          } else {
            this.contracts = [];
            console.error('Failed to load contracts:', res.message);
          }
        },
        error: (error) => {
          console.error('Error loading contracts:', error);
          this.contracts = [];
        }
      });
    }
  
    // Generate Trainee Contract
    async generateTraineeContract() {
      if (!this.currentApplicationId) {
        console.error('No application ID selected');
        return;
      }
  
      this.isGenerating = true;
      try {
        const contractData = await this.generateContractForm("trainee");
        const fileName = `Trainee_Contract_${this.employeeData.name}_${Date.now()}.pdf`;
  
        // Create form data for file upload
        const formData = new FormData();
        formData.append('applicationId', this.currentApplicationId);
  
        // Generate PDF and convert to blob
        const pdfBlob = await this.generateContractPDF(contractData, fileName, 'trainee');
        formData.append('trainee', pdfBlob, fileName);
  
        // Upload to backend
        this.backendService.uploadContract(formData).subscribe({
          next: (res: any) => {
            console.log('Trainee contract uploaded successfully:', res);
            // Reload contracts to get updated list
            this.loadContracts(this.currentApplicationId);
          },
          error: (error) => {
            console.error('Error uploading trainee contract:', error);
          },
          complete: () => {
            this.isGenerating = false;
          }
        });
  
      } catch (error) {
        console.error("Error generating trainee contract:", error);
        this.isGenerating = false;
      }
    }
  
    // Generate Probation Contract
    async generateProbationContract() {
      if (!this.currentApplicationId) {
        console.error('No application ID selected');
        return;
      }
  
      this.isGenerating = true;
      try {
        const contractData = await this.generateContractForm("probation");
        const fileName = `Probation_Contract_${this.employeeData.name}_${Date.now()}.pdf`;
  
        const formData = new FormData();
        formData.append('applicationId', this.currentApplicationId);
  
        const pdfBlob = await this.generateContractPDF(contractData, fileName, 'probation');
        formData.append('probation', pdfBlob, fileName);
  
        this.backendService.uploadContract(formData).subscribe({
          next: (res: any) => {
            console.log('Probation contract uploaded successfully:', res);
            this.loadContracts(this.currentApplicationId);
          },
          error: (error) => {
            console.error('Error uploading probation contract:', error);
          },
          complete: () => {
            this.isGenerating = false;
          }
        });
  
      } catch (error) {
        console.error("Error generating probation contract:", error);
        this.isGenerating = false;
      }
    }
  
    // Generate Job Contract
    async generateJobContract() {
      if (!this.currentApplicationId) {
        console.error('No application ID selected');
        return;
      }
  
      this.isGenerating = true;
      try {
        const contractData = await this.generateContractForm("job");
        const fileName = `Job_Contract_${this.employeeData.name}_${Date.now()}.pdf`;
  
        const formData = new FormData();
        formData.append('applicationId', this.currentApplicationId);
  
        const pdfBlob = await this.generateContractPDF(contractData, fileName, 'job');
        formData.append('job', pdfBlob, fileName);
  
        this.backendService.uploadContract(formData).subscribe({
          next: (res: any) => {
            console.log('Job contract uploaded successfully:', res);
            this.loadContracts(this.currentApplicationId);
          },
          error: (error) => {
            console.error('Error uploading job contract:', error);
          },
          complete: () => {
            this.isGenerating = false;
          }
        });
  
      } catch (error) {
        console.error("Error generating job contract:", error);
        this.isGenerating = false;
      }
    }
  
    // Generate PDF and return as Blob
    private generateContractPDF(contractData: any, fileName: string, contractType: string): Promise<Blob> {
      return new Promise((resolve) => {
        const doc = new jsPDF("p", "pt", "a4");
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 40;
        let yPosition = 60;
  
        // Title
        doc.setFontSize(20);
        doc.setFont("", "bold");
        doc.text(
          `${this.getContractTitle(contractType)}`,
          pageWidth / 2,
          yPosition,
          { align: "center" }
        );
        yPosition += 40;
  
        // Employee Details
        doc.setFontSize(12);
        doc.setFont("", "bold");
        doc.text("Employee Details:", margin, yPosition);
        yPosition += 25;
  
        doc.setFont("", "normal");
        doc.text(`Name: ${this.employeeData.name}`, margin, yPosition);
        yPosition += 20;
        doc.text(`Position: ${this.employeeData.position}`, margin, yPosition);
        yPosition += 20;
        doc.text(`Department: ${this.employeeData.department}`, margin, yPosition);
        yPosition += 20;
        doc.text(
          `Start Date: ${this.employeeData.startDate.toLocaleDateString()}`,
          margin,
          yPosition
        );
        yPosition += 20;
        doc.text(`Email: ${this.employeeData.email}`, margin, yPosition);
        yPosition += 30;
  
        // Contract Terms
        doc.setFont("", "bold");
        doc.text("Contract Terms:", margin, yPosition);
        yPosition += 25;
  
        doc.setFont("", "normal");
        doc.text(
          `Duration: ${this.getContractDuration(contractType)}`,
          margin,
          yPosition
        );
        yPosition += 20;
        doc.text(`Salary: ${this.employeeData.salary}`, margin, yPosition);
        yPosition += 30;
  
        // Terms and Conditions
        const terms = this.getContractTerms(contractType);
        doc.setFont("", "bold");
        doc.text("Terms & Conditions:", margin, yPosition);
        yPosition += 25;
  
        doc.setFont("", "normal");
        terms.forEach((term) => {
          if (yPosition > 700) {
            doc.addPage();
            yPosition = 60;
          }
          doc.text(`• ${term}`, margin + 10, yPosition);
          yPosition += 20;
        });
  
        // Generated Date
        yPosition += 20;
        doc.text(
          `Generated on: ${new Date().toLocaleDateString()}`,
          margin,
          yPosition
        );
  
        // Convert to Blob
        const pdfBlob = doc.output('blob');
        resolve(pdfBlob);
      });
    }
  
    // Download existing contract
    downloadContract(contractType: string) {
      let contract: any = null;
  
      switch (contractType) {
        case "trainee":
          contract = this.traineeContract;
          break;
        case "probation":
          contract = this.probationContract;
          break;
        case "job":
          contract = this.jobContract;
          break;
      }
  
      if (contract && contract.url) {
        // Download from backend URL
        window.open(contract.url, '_blank');
      } else {
        console.warn('Contract not found or no URL available');
      }
    }
  
    // Format date for display
    formatContractDate(dateString: string): string {
      return new Date(dateString).toLocaleDateString();
    }
  
    // Existing helper methods (keep as is)
    private async generateContractForm(contractType: string): Promise<any> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const formData = {
            employee: this.employeeData,
            contractType: contractType,
            terms: this.getContractTerms(contractType),
            duration: this.getContractDuration(contractType),
            conditions: this.getContractConditions(contractType),
          };
          resolve(formData);
        }, 1000);
      });
    }
  
    private getContractTerms(contractType: string): string[] {
      switch (contractType) {
        case "trainee":
          return ["Training period: 6 months", "Monthly stipend provided", "Mentorship program included", "Performance evaluation every 2 months"];
        case "probation":
          return ["Probation period: 3 months", "Full salary during probation", "Performance review at end of period", "Possible conversion to permanent position"];
        case "job":
          return ["Permanent employment", "Full benefits package", "Annual performance review", "Standard company policies apply"];
        default:
          return [];
      }
    }
  
    private getContractDuration(contractType: string): string {
      switch (contractType) {
        case "trainee": return "6 months";
        case "probation": return "3 months";
        case "job": return "Permanent";
        default: return "N/A";
      }
    }
  
    private getContractConditions(contractType: string): string[] {
      switch (contractType) {
        case "trainee":
          return ["Completion certificate upon successful training", "Possible job offer after training"];
        case "probation":
          return ["Employment subject to successful probation completion", "Standard notice period applies"];
        case "job":
          return ["Standard notice period: 30 days", "Confidentiality agreement applies"];
        default:
          return [];
      }
    }
  
    private getContractTitle(contractType: string): string {
      switch (contractType) {
        case "trainee": return "TRAINEE EMPLOYMENT CONTRACT";
        case "probation": return "PROBATION EMPLOYMENT CONTRACT";
        case "job": return "EMPLOYMENT CONTRACT";
        default: return "CONTRACT";
      }
    }
  
    // Open modal with application ID
    openGenerateContractModal(applicationId: string) {
      // Load contracts for this application
      this.loadContracts(applicationId);
      this.currentApplicationId = applicationId;
  
      const el = this.generateContractCanvas.nativeElement;
      this.renderer.addClass(el, "show");
      this.renderer.setStyle(el, "visibility", "visible");
      this.renderer.setAttribute(el, "aria-modal", "true");
      this.renderer.removeAttribute(el, "aria-hidden");
      this.renderer.setStyle(document.body, "overflow", "hidden");
  
      this.backdropEl = this.renderer.createElement("div");
      this.renderer.addClass(this.backdropEl, "offcanvas-backdrop");
      this.renderer.addClass(this.backdropEl, "fade");
      this.renderer.addClass(this.backdropEl, "show");
  
      if (this.backdropEl) {
        this.backdropEl.addEventListener("click", () => this.closeGenerateContractModal());
        this.renderer.appendChild(document.body, this.backdropEl);
      }
  
  
    }
  
    closeGenerateContractModal() {
      // Your existing implementation
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      const panel = this.generateContractCanvas.nativeElement;
  
      this.renderer.removeClass(panel, "show");
      const onTransition = (e: TransitionEvent) => {
        if (e.target === panel && e.propertyName.includes("transform")) {
          this.renderer.setStyle(panel, "visibility", "hidden");
          this.renderer.removeAttribute(panel, "aria-modal");
          this.renderer.setAttribute(panel, "aria-hidden", "true");
          this.renderer.removeStyle(document.body, "overflow");
  
          if (this.backdropEl) {
            this.renderer.removeChild(document.body, this.backdropEl);
            this.backdropEl = undefined;
          }
          document.querySelectorAll(".offcanvas-backdrop.fade.show").forEach((backdrop) =>
            this.renderer.removeChild(document.body, backdrop)
          );
          this.renderer.removeStyle(panel, "transform");
  
          panel.removeEventListener("transitionend", onTransition);
        }
      };
  
      if (this.backdropEl) {
        this.renderer.removeChild(document.body, this.backdropEl);
        this.backdropEl = undefined;
      }
      this.renderer.removeStyle(document.body, "overflow");
    }
  }