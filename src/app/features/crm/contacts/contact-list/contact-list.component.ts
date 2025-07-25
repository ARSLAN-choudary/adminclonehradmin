/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Renderer2,  OnInit, OnDestroy } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';

import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer} from '@angular/platform-browser';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, contactList, pageSelection } from '../../../../shared/model/pages.model';
import { DataService } from '../../../../shared/data/data.service';
import { PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import {MatSelectModule} from '@angular/material/select'
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { SelectModule } from 'primeng/select';
import intlTelInput from 'intl-tel-input';
import { TagInputModule } from 'ngx-chips';
interface project {
  name: string;
}
interface select {
    data: string
}
@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrl: './contact-list.component.scss',
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
      SelectModule,
    TagInputModule
  ],
    
})
export class ContactListComponent implements OnInit, OnDestroy {
  tags=['Collab','VIP'];
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
  public routes = routes;
  // pagination variables
  public tableData: contactList[] = [];
  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<contactList>;
  public searchDataValue = '';
  public tableDataCopy: contactList[] = [];
  public actualData: contactList[] = [];
  //** pagination variables

  public sidebarPopup = false;
  public sidebarPopup2 = false;
  public sidebarPopup3 = false;

  initChecked = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  project!: project[];
  selectedProjects!: project[];

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    
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
       this.select5 = [
          {data: 'Choose'},
          {data: 'Open'},
          {data: 'Lost'},
          {data: 'Won'},
      ];
    this.data.getContactList().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.contactList) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getContactList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: contactList, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<contactList>(this.actualData);
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


  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  values1: string[] = ['Collab'];
  values2: string[] = ['Collab'];
  values3: string[] = ['Collab', 'Rated'];

  selectedUsers: any[] = []; 

  

  


 
  
  

  onClickStar(item: contactList) {
    item.isStarActive = !item.isStarActive;
  }
  navigateToGigs() {
    // Remove the modal backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      this.renderer.removeChild(backdrop.parentNode, backdrop);
    }
  
    // Reset any potential scroll blockers
    document.body.style.overflow = 'auto';
  
    // Navigate to the specified route
    this.router.navigate(['/deals/deals-details']);
  }
  ngAfterViewInit(): void {
    const input = document.querySelector('#phone') as HTMLInputElement;
    const input2 = document.querySelector('#phone2') as HTMLInputElement;
    const input3 = document.querySelector('#phone3') as HTMLInputElement;
    const input4 = document.querySelector('#phone4') as HTMLInputElement;
    intlTelInput(input, {
      initialCountry: 'us',
      preferredCountries: ['us', 'gb', 'in'],
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js'
    }as any);
    intlTelInput(input2, {
      initialCountry: 'us',
      preferredCountries: ['us', 'gb', 'in'],
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js'
    }as any);
    intlTelInput(input3, {
      initialCountry: 'us',
      preferredCountries: ['us', 'gb', 'in'],
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js'
    }as any);
    intlTelInput(input4, {
      initialCountry: 'us',
      preferredCountries: ['us', 'gb', 'in'],
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js'
    }as any);
        // Restrict input to numbers, "+", and allowed characters
        input.addEventListener('input', () => {
          input.value = input.value.replace(/[^0-9+()-\s]/g, ''); // Removes any character not allowed
        });
        input2.addEventListener('input', () => {
          input2.value = input2.value.replace(/[^0-9+()-\s]/g, ''); // Removes any character not allowed
        });
        input3.addEventListener('input', () => {
          input2.value = input2.value.replace(/[^0-9+()-\s]/g, ''); // Removes any character not allowed
        });
        input4.addEventListener('input', () => {
          input2.value = input2.value.replace(/[^0-9+()-\s]/g, ''); // Removes any character not allowed
        });
  }

   selectedOption3: any;
   selectedOption4: any;
  option3 = [
    {
      id: 1,
      name: 'Darlee Robertson',
      image: 'assets/img/profiles/avatar-19.jpg',
    },
    { id: 2, name: 'Sharon Roy', image: 'assets/img/users/user-01.jpg' },
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
}
