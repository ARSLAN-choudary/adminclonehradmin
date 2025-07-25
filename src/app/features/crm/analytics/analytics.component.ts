import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { routes } from '../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  colors: any;
}

@Component({
  selector: 'app-analytics',
  imports: [NgApexchartsModule,RouterLink],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
 
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;
  public dealschart: Partial<ChartOptions> | any;
  public routes = routes;
  constructor() {
    this.chartOptions = {
          series: [{
          data: [400, 220, 448,]
      }],
          chart: {
          type: 'bar',
          height: 150,
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
     colors: ['#FC0027'],
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
          series: [{
          name: "sales",
          colors: ['#BEA4F2'],
          data: [{
            x: 'Inpipeline',
            y: 400,
            
          }, {
            x: 'Follow Up',
            y: 30
          }, {
            x: 'Schedule',
            y: 248
          }, {
            x: 'Conversation',
            y: 470
          }, {
            x: 'Won',
            y: 470
          },{
            x: 'Lost',
            y: 180
          }]
        }],
          chart: {
          type: 'bar',
          height: 310,
          toolbar: {
          show: false,
          },
        },
      grid: {
        borderColor: '#E8E8E8',  
        strokeDashArray: 4 ,     
        padding: {
          right: -20 // ✅ Remove extra right padding
        }
      },
        plotOptions: {
          bar: {
            columnWidth: '30%',
              borderRadiusApplication: 'around',
          }
        }, 
        colors: ['#00918E'],
        yaxis: {
            labels: {
              offsetX: -13,
            }
        }
        
        };
    this.chartOptions4 = {
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
    this.dealschart={
      series: [{
      name: "sales",
      colors: ['#FFC38F'],
      data: [{
        x: 'Inpipeline',
        y: 400,
        
      }, {
        x: 'Follow Up',
        y: 130
      }, {
        x: 'Schedule',
        y: 248
      }, {
        x: 'Conversation',
        y: 470
      }, {
        x: 'Won',
        y: 470
      }, {
        x: 'Lost',
        y: 180
      }]
    }],
      chart: {
      type: 'bar',
      height: 385,
    	toolbar: {
    	  show: false
    	}
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: '#E8E8E8',  
      strokeDashArray: 4 ,     
      padding: {
        right: -20 // ✅ Remove extra right padding
      }
    },
    plotOptions: {
      bar: {
          borderRadiusApplication: 'around',
          columnWidth: '50%',
      }
    },
    colors: ['#0E9384'],
    xaxis: {
      type: 'category',
      group: {
        style: {
          fontSize: '7px',
          fontWeight: 700,
        },
      }
    },
    yaxis: {
        labels: {
          offsetX: -13,
        }
    }
    
    }
   
  }
  public sidebarPopup = false;
  public sidebarPopup2 = false;
  public sidebarPopup1 = false;
  public sidebarPopup3 = false;
  
  selectedOption3: any;
  selectedOption4: any;
  selectedOption5: any;
  selectedOption6: any;
  openSidebarPopup() {
    this.sidebarPopup = !this.sidebarPopup;
  }
  openSidebarPopup1() {
    this.sidebarPopup1 = !this.sidebarPopup1;
  }
  openSidebarPopup2() {
    this.sidebarPopup2 = !this.sidebarPopup2;
  }
  openSidebarPopup3() {
    this.sidebarPopup3 = !this.sidebarPopup3;
  }
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
      name: 'Jerald',
      image: 'assets/img/profiles/avatar-18.jpg',
    },
    { id: 2, name: 'Sharon Roy', image: 'assets/img/profiles/avatar-20.jpg' },
    { id: 3, name: 'Vaughan', image: 'assets/img/profiles/avatar-21.jpg' },
    { id: 4, name: 'Jessica', image: 'assets/img/profiles/avatar-23.jpg' },
    { id: 5, name: 'Carol Thomas', image: 'assets/img/profiles/avatar-16.jpg' },
  ];
  option4 = [
    {
      id: 1,
      name: 'Jerald',
      image: 'assets/img/profiles/avatar-18.jpg',
    },
    { id: 2, name: 'Sharon Roy', image: 'assets/img/profiles/avatar-20.jpg' },
    { id: 3, name: 'Vaughan', image: 'assets/img/profiles/avatar-21.jpg' },
    { id: 4, name: 'Jessica', image: 'assets/img/profiles/avatar-23.jpg' },
    { id: 5, name: 'Carol Thomas', image: 'assets/img/profiles/avatar-16.jpg' },
  ];
  option5 = [
    {
      id: 1,
      name: 'Jerald',
      image: 'assets/img/profiles/avatar-18.jpg',
    },
    { id: 2, name: 'Sharon Roy', image: 'assets/img/profiles/avatar-20.jpg' },
    { id: 3, name: 'Vaughan', image: 'assets/img/profiles/avatar-21.jpg' },
    { id: 4, name: 'Jessica', image: 'assets/img/profiles/avatar-23.jpg' },
    { id: 5, name: 'Carol Thomas', image: 'assets/img/profiles/avatar-16.jpg' },
  ];
  option6 = [
    {
      id: 1,
      name: 'Jerald',
      image: 'assets/img/profiles/avatar-18.jpg',
    },
    { id: 2, name: 'Sharon Roy', image: 'assets/img/profiles/avatar-20.jpg' },
    { id: 3, name: 'Vaughan', image: 'assets/img/profiles/avatar-21.jpg' },
    { id: 4, name: 'Jessica', image: 'assets/img/profiles/avatar-23.jpg' },
    { id: 5, name: 'Carol Thomas', image: 'assets/img/profiles/avatar-16.jpg' },
  ];
  selectedOption1: any;
  selectedOption2: any;
  text: string | undefined;
  removeOption1(user: any) {
    const index = this.selectedOption1.indexOf(user);
    if (index !== -1) {
      this.selectedOption1.splice(index, 1);
    }
  }
  removeOption2(user: any) {
    const index = this.selectedOption1.indexOf(user);
    if (index !== -1) {
      this.selectedOption1.splice(index, 1);
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
  removeOption5(user: any) {
    const index = this.selectedOption5.indexOf(user);
    if (index !== -1) {
      this.selectedOption5.splice(index, 1);
    }
  }
  removeOption6(user: any) {
    const index = this.selectedOption5.indexOf(user);
    if (index !== -1) {
      this.selectedOption5.splice(index, 1);
    }
  }
  selectedValue1: any[] | undefined;
  selectedValue2: any[] | undefined;
  selectedValue3: any[] | undefined;
  selectedValue4: any[] | undefined;
  selectedValue5: any[] | undefined;
  selectedValue6: any[] | undefined;


  selectedDatas1: any[] | undefined;
  selectedDatas2: any[] | undefined;
  selectedDatas3: any[] | undefined;
  selectedDatas4: any[] | undefined;
  selectedDatas5: any[] | undefined;
  selectedDatas6: any[] | undefined;

  
  ngOnInit() {
    this.selectedValue1 = [
      { name: 'Collins' },
      { name: 'Konopelski' },
      { name: 'Adams' },
      { name: 'Schumm' },
      { name: 'Wisozk' }
    ];
    this.selectedValue2 = [
      { name: 'Choose' },
      { name: 'Phone Calls' },
      { name: 'Social Media' },
      { name: 'Referral Sites' },
      { name: 'Web Analytics' },
      { name: 'Previous Purchases' }
    ];
    this.selectedValue3 = [
      { name: 'Collins' },
      { name: 'Konopelski' },
      { name: 'Adams' },
      { name: 'Schumm' },
      { name: 'Wisozk' }
    ];
    this.selectedValue4 = [
      { name: 'Choose' },
      { name: 'Phone Calls' },
      { name: 'Social Media' },
      { name: 'Referral Sites' },
      { name: 'Web Analytics' },
      { name: 'Previous Purchases' }
    ];
    this.selectedValue5 = [
      { name: 'Sales' },
      { name: 'Marketing' },
      { name: 'Calls' },
    ];
    this.selectedValue6 = [
      { name: 'Open' },
      { name: 'Lost' },
      { name: 'Won' },
    ];
  }
  values1: string[] = ['Collab'];
  values2: string[] = ['Collab'];
  values3: string[] = ['Collab', 'Rated'];

  matSelectChipDataSelected: string[] = [
    'Devops Design',
    'MargrateDesign',
    'UI for Chat',
  ];
  matSelectChipData: string[] = [
    'Devops Design',
    'MargrateDesign',
    'UI for Chat',
    'Web Chat',
  ];
  removeOptionUnique(option: any) {
    const index = this.matSelectChipDataSelected.indexOf(option);
    if (index !== -1) {
      this.matSelectChipDataSelected.splice(index, 1);
    }
  }
}
