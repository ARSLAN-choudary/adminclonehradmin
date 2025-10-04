/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Renderer2, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from "ng-apexcharts";
import { routes } from "../../../../shared/routes/routes";
import { CommonService } from "../../../../shared/common/common.service";
import { NgApexchartsModule } from "ng-apexcharts";
import { CollapseHeaderComponent } from "../../../common/collapse-header/collapse-header.component";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { DateRangePickerComponent } from "../../../common/date-range-picker/date-range-picker.component";
import { BackendService } from "../../../../Services/backend.service";
export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  colors: any;
  grid: ApexGrid | any;
}
@Component({
  selector: "app-deals-dashboard",
  templateUrl: "./deals-dashboard.component.html",
  styleUrl: "./deals-dashboard.component.scss",
  imports: [
    NgApexchartsModule,
    CollapseHeaderComponent,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DateRangePickerComponent,
    CollapseHeaderComponent,
    RouterLink,
  ],
})
export class DealsDashboardComponent {
  routes = routes;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  base = "";
  page = "";
  last = "";
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;
  secretKey =
    "7rH-LsjY1XugUe9RyVXTTWMoL8yOfDDi949gAWRtq2Wtl3VnrH1fBHJahb4Ln-gHcZRgwvmaz8yyDh7tXSj1ag";
  clientId = "vNkatedb03wF68AyMokEU";
  constructor(
    private common: CommonService,
    private renderer: Renderer2,
    private backend: BackendService
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
      colors: ["#EF1E1ED9"],
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
      series: [
        {
          name: "sales",
          colors: ["#FFC38F"],
          data: [
            {
              x: "Inpipeline",
              y: 400,
            },
            {
              x: "Follow Up",
              y: 130,
            },
            {
              x: "Schedule",
              y: 248,
            },
            {
              x: "Conversation",
              y: 470,
            },
            {
              x: "Won",
              y: 470,
            },
            {
              x: "Lost",
              y: 180,
            },
          ],
        },
      ],
      chart: {
        type: "bar",
        height: 385,
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: "#E8E8E8",
        strokeDashArray: 4,
        padding: {
          right: -20, // ✅ Remove extra right padding
        },
      },
      plotOptions: {
        bar: {
          borderRadiusApplication: "around",
          columnWidth: "50%",
        },
      },
      colors: ["#0E9384"],
      xaxis: {
        type: "category",
        group: {
          style: {
            fontSize: "7px",
            fontWeight: 700,
          },
        },
      },
      yaxis: {
        labels: {
          offsetX: -13,
        },
      },
    };
    this.chartOptions4 = {
      series: [
        {
          name: "Deals",
          data: [1, 2, 3, 1.5, 2.2, 4, 3.0, 2.0, 3.0, 1.8, 3.0, 6.0],
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
      colors: ["#FFA201"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        type: "solid",
        opacity: 0, // ✅ this removes area bg color
      },
      markers: {
        size: 5,
        shape: "circle",
        strokeWidth: 2,
        strokeColors: "#FFA201",
        hover: {
          size: 7,
        },
      },
      grid: {
        borderColor: "#E8E8E8",
        strokeDashArray: 4, // Dashed lines
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
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
    if (this.page == "deals-dashboard") {
      this.renderer.addClass(document.body, "date-picker-dashboard");
    }
  }
  ngOnInit(): void {
    this.renderer.addClass(document.body, "date-picker");
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, "date-picker");
  }

 
}
