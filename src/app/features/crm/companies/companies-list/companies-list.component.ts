/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Renderer2, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, companiesList, pageSelection } from '../../../../shared/model/pages.model';
import { DataService } from '../../../../shared/data/data.service';
import { PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { SelectModule } from 'primeng/select';
import { TagInputModule } from 'ngx-chips';
import intlTelInput from 'intl-tel-input';

@Component({
    selector: 'app-companies-list',
    templateUrl: './companies-list.component.html',
    styleUrl: './companies-list.component.scss',
    imports: [CustomPaginationComponent,CommonModule,FormsModule,MatSelectModule,MatIconModule
      ,MatChipsModule,SelectModule,TagInputModule,RouterLink
    ]
})
export class CompaniesListComponent implements OnInit {
    tags=['Collab','VIP'];
  tags2=['Devops Design','MargrateDesign'];
  tags3=['Collab','Rated'];
   routes = routes;
  // pagination variables
  public tableData: companiesList[] = [];
  public pageSize = 10;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  dataSource!: MatTableDataSource<companiesList>;
  //** / pagination variables
  initChecked = false;
  public sidebarPopup1 = false;
  public sidebarPopup2 = false;
  public sidebarPopup3 = false;

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private renderer: Renderer2,
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.companiesList) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
   
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getCompaniesList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: companiesList, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<companiesList>(this.tableData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
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


  openSidebarPopup1() {
    this.sidebarPopup1 = !this.sidebarPopup1;
  }
  openSidebarPopup2() {
    this.sidebarPopup2 = !this.sidebarPopup2;
  }
  openSidebarPopup3() {
    this.sidebarPopup3 = !this.sidebarPopup3;
  }
  selectedOption1: any;
  selectedOption2: any;
  selectedOption3: any;
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
  ngOnInit() {

      this.select2 = [
          {data: 'Select'},
          {data: 'Collins'},
          {data: 'Konopelski'},
          {data: 'Adams'},
          {data: 'Schumm'},
          {data: 'Wisozk'},
      ];

       this.select4 = [
          {data: 'Select'},
          {data: 'Phone Calls'},
          {data: 'Social Media'},
          {data: 'Referral Sites'},
          {data: 'Web Analytics'},
          {data: 'Previous Purchases'},
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
  navigateToGigs() {
    // Remove the modal backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      this.renderer.removeChild(backdrop.parentNode, backdrop);
    }
  
    // Reset any potential scroll blockers
    document.body.style.overflow = 'auto';
  
    // Navigate to the specified route
    this.router.navigate(['/companies/companies-details']);
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
}
interface select{
  data:string;
}
