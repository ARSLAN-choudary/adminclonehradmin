import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, leadsList, pageSelection } from '../../../../shared/model/pages.model';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { Router, RouterLink } from '@angular/router';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TagInputModule } from 'ngx-chips';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { SelectModule } from 'primeng/select';
interface select{
  data:string;
}
@Component({
  selector: 'app-leads-list',
  imports: [CommonModule,FormsModule,RouterLink,CollapseHeaderComponent,MatSelectModule,MatIconModule,MatChipsModule,TagInputModule,NgxEditorModule,BsDatepickerModule,DateRangePickerComponent,CustomPaginationComponent,MatSort,MatSortModule,
    SelectModule
  ],
  templateUrl: './leads-list.component.html',
  styleUrl: './leads-list.component.scss'
})
export class LeadsListComponent {
  public routes = routes;
   tags=['Collab'];
  tags2=['Devops Design','MargrateDesign'];
  tags3=['Collab','Rated'];
   select!: select[];
  select2!: select[];
  select3!: select[];
  select4!: select[];
  select5!: select[];
selected!: select[];
selected2!: select[];
selected3!: select[];
selected4!: select[];
selected5!: select[];
  // pagination variables
  public tableData: leadsList[] = [];
  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<leadsList>;
  public searchDataValue = '';
  public tableDataCopy: leadsList[] = [];
  public actualData: leadsList[] = [];
  //** pagination variables
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

  public sidebarPopup = false;
  public sidebarPopup2 = false;
  public sidebarPopup3 = false;

  initChecked = false;

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  selectedOption3: any;
  

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router
  ) {
     this.select = [
          {data: 'Select'},
          {data: 'NovaWave LLC'},
          {data: 'BlueSky Industries'},
          {data: 'Summit Peak'},
          {data: 'RiverStone Ventur'}
      ];
      this.select2 = [
          {data: 'Select'},
          {data: 'Collins'},
          {data: 'Konopelski'},
          {data: 'Adams'},
          {data: 'Schumm'},
          {data: 'Wisozk'},
      ];
      this.select3 = [
          {data: 'Select'},
          {data: 'Hendry Milner'},
          {data: 'Guilory Berggren'},
          {data: 'Jami Carlile'},
          {data: 'Theresa Nelson'},
          {data: 'Smith Cooper'},
      ];
       this.select4 = [
          {data: 'Select'},
          {data: 'Phone Calls'},
          {data: 'Social Media'},
          {data: 'Referral Sites'},
          {data: 'Web Analytics'},
          {data: 'Previous Purchases'},
      ];
    this.data.getLeadsList().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.leadsList) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getLeadsList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: leadsList, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<leadsList>(this.actualData);
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

  openSidebarPopup() {
    this.sidebarPopup = !this.sidebarPopup;
  }
  openSidebarPopup2() {
    this.sidebarPopup2 = !this.sidebarPopup2;
  }
  openSidebarPopup3() {
    this.sidebarPopup3 = !this.sidebarPopup3;
  }
  selectedUser: any;
  selectedUser2: any;

  users = [
    { name: 'Jerald', image: 'assets/img/profiles/avatar-14.jpg' },
    { name: 'Guillory', image: 'assets/img/profiles/avatar-15.jpg' },
    { name: 'Jami', image: 'assets/img/profiles/avatar-16.jpg' },
    { name: 'Theresa', image: 'assets/img/profiles/avatar-13.jpg' },
    { name: 'Espinosa', image: 'assets/img/profiles/avatar-24.jpg' },
  ];
  users2 = [
    { name: 'Jerald', image: 'assets/img/profiles/avatar-14.jpg' },
    { name: 'Guillory', image: 'assets/img/profiles/avatar-15.jpg' },
    { name: 'Jami', image: 'assets/img/profiles/avatar-16.jpg' },
    { name: 'Theresa', image: 'assets/img/profiles/avatar-13.jpg' },
    { name: 'Espinosa', image: 'assets/img/profiles/avatar-24.jpg' },
  ];

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];



  ngOnInit(): void {
    this.editor = new Editor();
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

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  onClickStar(item: leadsList) {
    item.isStarActive = !item.isStarActive;
  }
  values1: string[] = ['Rated'];
  values2: string[] = ['Rated'];
  selectedOption1: any;
  selectedOption2: any;

  selectedOption4: any;
  selectedOption5: any;
  selectedOption6: any;

  option1 = [
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
  option2 = [
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
  newContents: number[] = [0];

  addNewContent() {
    this.newContents.push(this.newContents.length);
  }
}
