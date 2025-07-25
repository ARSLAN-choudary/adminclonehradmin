/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TagInputModule } from 'ngx-chips';
import { NgxEditorModule } from 'ngx-editor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectModule } from 'primeng/select';
interface select {
  data:string;
}
@Component({
    selector: 'app-leads-kanban',
    templateUrl: './leads-kanban.component.html',
    styleUrl: './leads-kanban.component.scss',
     imports: [CommonModule,FormsModule,DragDropModule,RouterLink,CollapseHeaderComponent,MatSelectModule,MatIconModule,MatChipsModule,TagInputModule,NgxEditorModule,BsDatepickerModule,
      SelectModule
     ],
})
export class LeadsKanbanComponent {
  public routes = routes
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
  public lstOne: CardDetails[] = [];
  public lstTwo: CardDetails[] = [];
  public lstThree: CardDetails[] = [];
  public lstFour: CardDetails[] = [];
  constructor(){
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
  }

  //  drap and drop
    onDrop(event: CdkDragDrop<CardDetails[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
 
  
  newContents: number[] = [0];
   selectedOption3: any;
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
      removeOption3(user: any) {
    const index = this.selectedOption3.indexOf(user);
    if (index !== -1) {
      this.selectedOption3.splice(index, 1);
    }
  }
  addNewContent() {
    this.newContents.push(this.newContents.length);
  }
  ngOnInit(): void {
    this.lstOne = [
      {
        CardClass: "info",
        Logo: "SM",
        CompanyName: "Schumm",
        Amount: "$03,50,000",
        Email: "darleeo@example.com",
        MobileNo: "+1 12445-47878",
        Location: "Newyork, United States",
        Image: "company-icon-09.svg",
      },
      {
        CardClass: "primary",
        Logo: "CS",
        CompanyName: "Collins",
        Amount: "$02,10,000",
        Email: "robertson@example.com",
        MobileNo: "+1 13987-90231",
        Location: "Austin, United States",
        Image: "company-icon-01.svg",
      },
      {
        CardClass: "warning",
        Logo: "KI",
        CompanyName: "Konopelski",
        Amount: "$02,18,000",
        Email: "sharon@example.com",
        MobileNo: "+1 17932-04278",
        Location: "Atlanta, United States",
        Image: "company-icon-02.svg",
      },
    ];
    this.lstTwo = [
      {
        CardClass: "primary",
        Logo: "AS",
        CompanyName: "Adams",
        Amount: "$02,45,000",
        Email: "vaughan12@example.com",
        MobileNo: "+1 17392-27846",
        Location: "London, United Kingdom",
        Image: "company-icon-03.svg",
      },
      {
        CardClass: "info",
        Logo: "WK",
        CompanyName: "Wizosk",
        Amount: "$01,17,000",
        Email: "caroltho3@example.com",
        MobileNo: "+1 78982-09163",
        Location: "Bristol, United Kingdom",
        Image: "company-icon-04.svg",
      },
      {
        CardClass: "success",
        Logo: "HR",
        CompanyName: "Heller",
        Amount: "$02,12,000",
        Email: "dawnmercha@example.com",
        MobileNo: "+1 27691-89246",
        Location: "San Francisco, United States",
        Image: "company-icon-05.svg",
      },
    ];
    this.lstThree = [
      {
        CardClass: "primary",
        Logo: "GI",
        CompanyName: "Gutkowsi",
        Amount: "$01,84,043",
        Email: "rachel@example.com",
        MobileNo: "+1 17839-93617",
        Location: "Dallas, United States",
        Image: "company-icon-06.svg",
      },
      {
        CardClass: "warning",
        Logo: "WR",
        CompanyName: "Walter",
        Amount: "$09,35,189",
        Email: "jonelle@example.com",
        MobileNo: "+1 16739-47193",
        Location: "Leicester, United Kingdom",
        Image: "company-icon-07.svg",
      },
      {
        CardClass: "success",
        Logo: "HN",
        CompanyName: "Hansen",
        Amount: "$04,27,940",
        Email: "jonathan@example.com",
        MobileNo: "+1 18390-37153",
        Location: "Norwich, United Kingdom",
        Image: "company-icon-08.svg",
      },
    ];
    this.lstFour = [
      {
        CardClass: "primary",
        Logo: "SE",
        CompanyName: "Steve",
        Amount: "$04,17,593",
        Email: "sidney@example.com",
        MobileNo: "+1 11739-38135",
        Location: "Manchester, United Kingdom",
        Image: "company-icon-09.svg",
      },
      {
        CardClass: "info",
        Logo: "LE",
        CompanyName: "Leuschke",
        Amount: "$08,81,389",
        Email: "brook@example.com",
        MobileNo: "+1 19302-91043",
        Location: "Chicago, United States",
        Image: "company-icon-10.svg",
      },
      {
        CardClass: "primary",
        Logo: "AY",
        CompanyName: "Anthony",
        Amount: "$09,27,193",
        Email: "mickey@example.com",
        MobileNo: "+1 17280-92016",
        Location: "Derby, United Kingdom",
        Image: "company-icon-01.svg",
      },
    ];
  }
}
interface CardDetails {
  CardClass: string;
  Logo: string;
  CompanyName: string;
  Amount: string;
  Email: string;
  MobileNo: string;
  Location: string;
  Image: string;
}