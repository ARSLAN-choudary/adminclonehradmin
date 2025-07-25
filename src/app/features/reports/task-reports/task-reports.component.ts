import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxEditorModule } from 'ngx-editor';
import { CustomPaginationComponent } from '../../../shared/custom-pagination/custom-pagination.component';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { CollapseHeaderComponent } from '../../common/collapse-header/collapse-header.component';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from '../../../shared/routes/routes';
import { apiResultFormat, pageSelection, contactReports } from '../../../shared/model/pages.model';
import { PaginationService, tablePageSize } from '../../../shared/custom-pagination/pagination.service';
import { DataService } from '../../../shared/data/data.service';
import { DomSanitizer} from '@angular/platform-browser';
import { DateRangePickerComponent } from '../../common/date-range-picker/date-range-picker.component';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexLegend,
  NgApexchartsModule,
} from 'ng-apexcharts';


export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  legend: ApexLegend | any;
}
@Component({
  selector: 'app-task-reports',
  imports: [CommonModule,
    RouterLink,
    NgxEditorModule,
    MatSelectModule,
    FormsModule,
    BsDatepickerModule,
    MatChipsModule,
    MatIconModule,
    DateRangePickerComponent,
    CollapseHeaderComponent,
    ReactiveFormsModule,
    MatSortModule,
    NgApexchartsModule],
  templateUrl: './task-reports.component.html',
  styleUrl: './task-reports.component.scss'
})
export class TaskReportsComponent {
 @ViewChild('chart') chart!: ChartComponent;
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;
public routes = routes;
  // pagination variables
  public tableData: contactReports[] = [];
  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<contactReports>;
  public searchDataValue = '';
  public tableDataCopy: contactReports[] = [];
  public actualData: contactReports[] = [];
  //** pagination variables
  
  public sidebarPopup = false;
  public sidebarPopup2 = false;
  public password : boolean[] = [false];

  initChecked = false;

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
  }
 
  onClickStar(item: contactReports) {
      item.isStarActive = !item.isStarActive;
    }
 

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    
  ) {
    this.data.getContactReports().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.contactReports) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
    this.chartOptions1 = {
      series: [44, 55, 41, 17],
      chart: {
      type: 'donut',
    },
    colors: ['#0092E4', '#4A00E5' , '#E41F07' , '#FFA201' ],
    labels: ['Campaigns', 'Google', 'Referrals', 'Paid Social'],  
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
         size: '10',
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
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };
    this.chartOptions2 = {
      series: [{
        name: "Task",
        data: [10, 38, 18, 47, 13, 32, 15, 40, 18, 50, 30, 15]
    }],
    colors: ['#3C2371'],
    chart: {
      height: 273,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'stepline'
    },
   
    title: {
      text: '',
      align: 'left'
    },
     
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    };
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getContactReports().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: contactReports, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<contactReports>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
public row=true;
 public searchData(value: string): void {
  this.searchDataValue = value.trim().toLowerCase();
  this.dataSource.filter = this.searchDataValue;
  this.tableData = this.dataSource.filteredData;
  this.row = this.tableData.length > 0;

  if (this.searchDataValue !== '') {
    // Handle filtered data
    this.pagination.calculatePageSize.next({
      totalData: this.tableData.length,
      pageSize: this.pageSize,
      tableData: this.tableData,
      serialNumberArray: this.tableData.map((_, i) => i + 1), 
    });
  } else {
    // Handle reset to full data
    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      serialNumberArray: this.serialNumberArray,
    });
  }
}

  selectAll(initChecked: boolean) {
      if (!initChecked) {
        this.tableData.forEach((f) => {
          f.isSelected = true;
        });
      } else {
        this.tableData.forEach((f) => {
          f.isSelected = false;
        });
      }
    }
}
