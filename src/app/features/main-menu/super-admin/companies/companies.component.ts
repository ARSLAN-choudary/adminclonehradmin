import { Component } from '@angular/core';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { routes } from '../../../../shared/routes/routes';
import { Router, RouterLink } from '@angular/router';
import { apiResultFormat, superadmincompanies } from '../../../../shared/model/pages.model';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { pageSelection, PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSortModule, Sort } from '@angular/material/sort';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
interface select{
  data:string;
}

@Component({
  selector: 'app-companies',
  imports: [CollapseHeaderComponent,DateRangePickerComponent,SelectModule,FormsModule,CommonModule,BsDatepickerModule,RouterLink,CustomPaginationComponent,MatSortModule],

  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {
  routes=routes
  select!: select[];
  select2!: select[];
  select3!: select[];
  select4!: select[];
  select5!: select[];
selected!: select[];
selected2!: select[];
selected3!: select[];
selected4!: select[];
check:boolean=false;

ngOnInit():void{
  this.select = [
          {data: 'Select'},
          {data: 'NovaWave LLC'},
          {data: 'BlueSky Industries'},
          {data: 'Summit Peak'},
          {data: 'RiverStone Ventur'}
      ];
  this.select2 = [
          {data: 'Select'},
          {data: 'Monthly'},
          {data: 'Yearly'}
      ];
  this.select3 = [
          {data: 'Choose'},
          {data: 'Dollar'},
          {data: 'Euro'},
          {data: 'Pound'},
          {data: 'Rupee'}
      ];
  this.select4 = [
          {data: 'Choose'},
          {data: 'English'},
          {data: 'Arabic'},
          {data: 'French'},
          {data: 'German'}
      ];
  this.select5 = [
          { data: 'United Arab Emirates' },
          { data: 'Georgia' },
          { data: 'Malta' },
          { data: 'United Kingdom' },
          { data: 'USA' },
          { data: 'Netherlands' },
          { data: 'Serbia' }
];
}
password:boolean[]=[false];
togglePassword(i:number):void{
  this.password[i]=!this.password[i]
}
// pagination variables
  public tableData: superadmincompanies[] = [];
  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<superadmincompanies>;
  public searchDataValue = '';
  public tableDataCopy: superadmincompanies[] = [];
  public actualData: superadmincompanies[] = [];
  //** pagination variables

  initChecked = false;

 
 onClickStar(item: superadmincompanies) {
      item.isStarActive = !item.isStarActive;
    }

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    
  ) {
    this.data.getSuperAdminCompanies().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.superAdminCompanies) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getSuperAdminCompanies().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: superadmincompanies, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<superadmincompanies>(this.actualData);
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
