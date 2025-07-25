/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ViewChild, OnInit, Renderer2 } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { routes } from '../../../../shared/routes/routes';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';
import { RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  grid: ApexGrid | any;
  colors:  any;
}

@Component({
    selector: 'app-project-dashboard',
    templateUrl: './project-dashboard.component.html',
    styleUrl: './project-dashboard.component.scss',
    imports: [NgApexchartsModule,CollapseHeaderComponent,DateRangePickerComponent,RouterLink,BsDatepickerModule,SelectModule,CommonModule,FormsModule,MatSelectModule,MatChipsModule,MatIconModule]
})
export class ProjectDashboardComponent implements OnInit {
  public sidebarPopup1 = false;
  public sidebarPopup2 = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;
  public routes = routes;
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
    this.chartOptions3 ={
      series: [44, 55, 41, 17],
      chart: {
      type: 'donut',
          height: 450
    },
    colors: ['#4A00E5', '#FFA201' , '#0092E4' , '#E41F07' ],
    labels: ['Campaigns', 'Google', 'Referrals', 'Paid Social'],  
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
       position: 'bottom',  
      formatter: function(val:any, opts:any) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    responsive: [{
      breakpoint: 1199,
      options: {
        chart: {
          height: 320
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
    this.chartOptions4 =  {
      series: [
      {
        name: "",
        data: [1200, 1000, 800, 600, 400, 200],
      },
    ],
      chart: {
      type: 'bar',
      height: 420,
    			toolbar: {
    				show: false
    			}
    },
    
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: '100%',
        isFunnel: true,
      },
     
    },
    colors: [
      '#3538CD',
      '#06AED4',
      '#FFA201',
      '#0E9384',
      '#27AE60',
      '#E41F07',
    ],
    
    dataLabels: {
      enabled: true,
      formatter: function (val:any, opt:any) {
        return opt.w.globals.labels[opt.dataPointIndex] 
      },
      dropShadow: {
        enabled: true,
      },
     
    },
    xaxis: {
      categories: ['Inpipeline : 1454', 'Follow Up : 1454', 'Schedule service : 1454', 'Conversation : 1454', 'Win : 1454', 'Lost : 1454'],
    },
    legend: {
      show: false,
    },
    };
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  openSidebarPopup1() {
    this.sidebarPopup1 = !this.sidebarPopup1;
  }
  openSidebarPopup2() {
    this.sidebarPopup2 = !this.sidebarPopup2;
  }

  selectedValue1: any[] | undefined;
  selectedValue2: any[] | undefined;

  selectedDatas1: any[] | undefined;
  selectedDatas2: any[] | undefined;

  ngOnInit() {
     this.renderer.addClass(document.body,'date-picker')
    this.selectedValue1 = [
      { name: 'Mobile App' },
      { name: 'Meeting' }
    ];
    this.selectedValue2 = [
      { name: 'Mobile App' },
      { name: 'Meeting' }
    ];
  }

  selectedOption1: any;
  selectedOption2: any;
  selectedOption3: any;
  selectedOption4: any;

  option1 = [
    {
      id: 1,
      name: 'Darlee Robertson',
      image: 'assets/img/profiles/avatar-19.jpg',
    },
    { id: 2, name: 'Sharon Roy', image: 'assets/img/profiles/avatar-20.jpg' },
    { id: 3, name: 'Vaughan', image: 'assets/img/profiles/avatar-21.jpg' },
    { id: 4, name: 'Jessica', image: 'assets/img/profiles/avatar-23.jpg' },
    { id: 5, name: 'Carol Thomas', image: 'assets/img/profiles/avatar-16.jpg' },
  ];
  option2 = [
    {
      id: 1,
      name: 'Darlee Robertson',
      image: 'assets/img/profiles/avatar-19.jpg',
    },
    { id: 2, name: 'Sharon Roy', image: 'assets/img/profiles/avatar-20.jpg' },
    { id: 3, name: 'Vaughan', image: 'assets/img/profiles/avatar-21.jpg' },
    { id: 4, name: 'Jessica', image: 'assets/img/profiles/avatar-23.jpg' },
    { id: 5, name: 'Carol Thomas', image: 'assets/img/profiles/avatar-16.jpg' },
  ];
  option3 = [
    {
      id: 1,
      name: ' Robert Johnson',
      image: 'assets/img/profiles/avatar-02.jpg',
    },
    { id: 2, name: 'Sharon Roy', image: 'assets/img/profiles/avatar-20.jpg' },
    { id: 3, name: 'Vaughan', image: 'assets/img/profiles/avatar-21.jpg' },
    { id: 4, name: 'Jessica', image: 'assets/img/profiles/avatar-23.jpg' },
    { id: 5, name: 'Carol Thomas', image: 'assets/img/profiles/avatar-16.jpg' },
  ];
  option4 = [
    {
      id: 1,
      name: 'Darlee Robertson',
      image: 'assets/img/profiles/avatar-19.jpg',
    },
    { id: 2, name: 'Sharon Roy', image: 'assets/img/profiles/avatar-20.jpg' },
    { id: 3, name: 'Vaughan', image: 'assets/img/profiles/avatar-21.jpg' },
    { id: 4, name: 'Jessica', image: 'assets/img/profiles/avatar-23.jpg' },
    { id: 5, name: 'Carol Thomas', image: 'assets/img/profiles/avatar-16.jpg' },
  ];
  removeOption1(user: any) {
    const index = this.selectedOption1.indexOf(user);
    if (index !== -1) {
      this.selectedOption1.splice(index, 1);
    }
  }
  removeOption2(user: any) {
    const index = this.selectedOption2.indexOf(user);
    if (index !== -1) {
      this.selectedOption2.splice(index, 1);
    }
  }
  removeOption3(user: any) {
    const index = this.selectedOption3.indexOf(user);
    if (index !== -1) {
      this.selectedOption3.splice(index, 1);
    }
  }
  removeOption4(user: any) {
    const index = this.selectedOption4.indexOf(user);
    if (index !== -1) {
      this.selectedOption4.splice(index, 1);
    }
  }
//    ngOnInit():void{
//   this.renderer.addClass(document.body,'date-picker')
// }
ngOnDestroy():void{
  this.renderer.removeClass(document.body,'date-picker')
}
}
