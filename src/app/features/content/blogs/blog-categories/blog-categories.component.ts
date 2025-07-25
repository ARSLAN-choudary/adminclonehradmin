import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxEditorModule } from 'ngx-editor';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, blogCategories, pageSelection } from '../../../../shared/model/pages.model';
import { DataService } from '../../../../shared/data/data.service';
import { PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';

@Component({
  selector: 'app-blog-categories',
  imports: [CommonModule,
          RouterLink,
          NgxEditorModule,
          MatSelectModule,
          FormsModule,
          BsDatepickerModule,
          MatChipsModule,
          MatIconModule,
          CustomPaginationComponent,
          MatSort,
          DateRangePickerComponent,
          CollapseHeaderComponent,
          ReactiveFormsModule,
          MatSortModule,
      ],
  templateUrl: './blog-categories.component.html',
  styleUrl: './blog-categories.component.scss'
})
export class BlogCategoriesComponent {
  public routes = routes;
    // pagination variables
    public tableData: blogCategories[] = [];
    public pageSize = 10;
    public serialNumberArray: number[] = [];
    public totalData = 0;
    showFilter = false;
    dataSource!: MatTableDataSource<blogCategories>;
    public searchDataValue = '';
    public tableDataCopy: blogCategories[] = [];
    public actualData: blogCategories[] = [];
    //** pagination variables
    
    public sidebarPopup = false;
    public sidebarPopup2 = false;
  
    initChecked = false;
  
    constructor(
      private data: DataService,
      private pagination: PaginationService,
      private router: Router,
      private sanitizer: DomSanitizer,
      
    ) {
      this.data.getBlogCategories().subscribe((apiRes: apiResultFormat) => {
        this.actualData = apiRes.data;
        this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
          if (this.router.url == this.routes.blogCategories) {
            this.getTableData({ skip: res.skip, limit: res.limit });
            this.pageSize = res.pageSize;
          }
        });
      });
    }
  
    private getTableData(pageOption: pageSelection): void {
      this.data.getBlogCategories().subscribe((apiRes: apiResultFormat) => {
        this.tableData = [];
        this.tableDataCopy = [];
        this.serialNumberArray = [];
        this.totalData = apiRes.totalData;
        apiRes.data.map((res: blogCategories, index: number) => {
          const serialNumber = index + 1;
          if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
            res.id = serialNumber;
            this.tableData.push(res);
            this.serialNumberArray.push(serialNumber);
            this.tableDataCopy.push(res);
          }
        });
        this.dataSource = new MatTableDataSource<blogCategories>(this.actualData);
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
