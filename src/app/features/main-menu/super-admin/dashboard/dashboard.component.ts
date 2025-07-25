/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { routes } from '../../../../shared/routes/routes';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { RouterLink } from '@angular/router';


export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [NgApexchartsModule,DateRangePickerComponent,RouterLink,CollapseHeaderComponent]
})
export class DashboardComponent implements OnInit{
  public routes=routes;
  @ViewChild('chart') chart!: ChartComponent;
  public revenue_income: Partial<ChartOptions> | any;
  public companyChart: Partial<ChartOptions> | any;
  public planOverview: Partial<ChartOptions> | any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor(private renderer : Renderer2) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

  }
  ngOnInit(): void {

    this.revenue_income = {
    chart: {
      height: 260,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      }
    },
    colors: ['#0E9384', '#E8E8E8'], // Progress then background
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusWhenStacked: 'all',
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '24px',
      },
    },
    series: [
      {
        name: 'Income',
        data: [40, 30, 45, 80, 85, 90, 80, 80, 80, 85, 20, 80]
      },
      {
        name: 'Expenses (bg)',
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
      }
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec'],
      labels: {
        style: {
          colors: '#0E9384',
          fontSize: '13px',
        }
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        offsetX: -15,
        style: {
          colors: '#6B7280',
          fontSize: '13px',
        },
        formatter: function (value:any) {
          return value + "K";
        }
      }
    },
    grid: {
      borderColor: 'transparent',
      strokeDashArray: 5,
      padding: {
        left: -8,
      },
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      y: {
        formatter: function (val:any) {
          return val / 10 + " k";
        }
      }
    },
    fill: {
      opacity: 1
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }]
  }
    this.companyChart = {
    chart: {
      height: 320,
      type: 'bar',
      toolbar: {
        show: false,
      },
      background: '#fff' // Background of the full chart area
    },
    colors: ['#E04F16'], // Progress bar color
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: false,
        columnWidth: '10px', // Progress bar width
        endingShape: 'rounded',
        colors: {
          backgroundBarColors: ['#E8E8E8'], // Background of each bar
          backgroundBarOpacity: 1,
        }
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false
    },
    series: [{
      name: 'Company',
      data: [40, 60, 20, 80, 60, 60, 60]
    }],
    xaxis: {
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      labels: {
        style: {
          colors: '#E04F16',
          fontSize: '13px',
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -15,
        show: false
      }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 5,
      padding: {
        left: -8,
      },
    },
    legend: {
      show: false
    },
    fill: {
      opacity: 1
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }]
  }
    this.planOverview = {
    chart: {
      height: 240,
      type: 'donut',
      toolbar: {
        show: false,
      }
    },
    colors: ['#E41F07', '#FFA201', '#2F80ED'],
    series: [20, 20, 60],
    labels: ['Enterprise', 'Premium', 'Basic'],
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
          labels: {
            show: false
          },
          borderRadius: 30
        }
      }
    },
    stroke: {
      lineCap: 'round',
      show: true,
      width: 0,    // Space between donut sections
      colors: '#fff'
    },
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 180,
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
  this.renderer.addClass(document.body,'date-picker')
  }

ngOnDestroy():void{
  this.renderer.removeClass(document.body,'date-picker')
}
}
