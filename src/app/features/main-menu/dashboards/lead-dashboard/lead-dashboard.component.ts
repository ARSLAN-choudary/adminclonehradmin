/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Renderer2, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  NgApexchartsModule,
  ApexGrid,
} from 'ng-apexcharts';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';
export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  colors: any;
  grid: ApexGrid |any;
}
@Component({
    selector: 'app-lead-dashboard',
    templateUrl: './lead-dashboard.component.html',
    styleUrl: './lead-dashboard.component.scss',
    imports: [NgApexchartsModule,RouterLink,CollapseHeaderComponent,
      FormsModule,CommonModule,BsDatepickerModule,DateRangePickerComponent
    ]
})
export class LeadDashboardComponent {
  public routes = routes;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;

  constructor(private renderer:Renderer2) {
    this.chartOptions = {
          series: [{
          data: [400, 220, 448,]
      }],
          chart: {
          type: 'bar',
          height: 180,
    	toolbar: {
    	  show: false
    	}
      },
    
      plotOptions: {
          bar: {
          horizontal: true,
          }
      },
      dataLabels: {
          enabled: false
      },
     colors: ['#EF1E1E'],
    grid: {
      borderColor: '#E8E8E8',  
      strokeDashArray: 4 ,
    },
      xaxis: {
          categories: ['Conversation', 'Follow Up', 'Inpipeline'
          ],
      }
      };
    this.chartOptions2 = {
        series: [{
        data: [400, 122, 250]
    }],
        chart: {
        type: 'bar',
        height: 180,
    	toolbar: {
    	  show: false
    	}
    },
    plotOptions: {
        bar: {
        horizontal: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#27AE60'],
    grid: {
      borderColor: '#E8E8E8',  
      strokeDashArray: 4 ,     
    },
    xaxis: {
        categories: ['Conversation', 'Follow Up', 'Inpipeline'
        ],
    }
    };
    this.chartOptions3 = {
    series: [44, 55, 13, 43],
    chart: {
    height: 440,
    type: 'pie',
  },
      legend: {
        position: 'bottom'
      },
    colors: ['#2F80ED', '#27AE60' , '#FFA201' , '#E41F07' ],
  labels: ['Inpipeline', 'Follow Up', 'Schedule Service', 'Conversation'],
      dataLabels: {
        enabled: false
      },
  responsive: [{
    breakpoint: 1199,
    options: {
      chart: {
        height: 350
      },
      legend: {
        position: 'bottom'
      }
    }
  },{
    breakpoint: 575,
    options: {
      chart: {
        height: 280
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };
    this.chartOptions4 = {
      series: [{
        name: "Reports",
        data: [3, 4.5, 2.0, 3.0, 2.5, 4, 2, 4, 3.5, 5, 3, 2]
    }],
      chart: {
      height: 273,
      type: 'area',
      zoom: {
        enabled: false
      },
    			toolbar: {
    				show: false
    			}
    },
    colors: ['#4A00E5'],
    dataLabels: {
      enabled: false
    },
    title: {
      text: '',
      align: 'left'
    },
    grid: {
      borderColor: '#E8E8E8',  
      strokeDashArray: 4 ,     
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      min: 1,
      max: 6,
      tickAmount: 5,
          labels: {
          offsetX: -15,
            formatter: (val:any) => {
              return val / 1 + 'K'
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
    };
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit():void{
  this.renderer.addClass(document.body,'date-picker')
}
ngOnDestroy():void{
  this.renderer.removeClass(document.body,'date-picker')
}
}
