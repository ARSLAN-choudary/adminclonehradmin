/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TagInputModule } from 'ngx-chips';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@Component({
    selector: 'app-deals-kanban',
    templateUrl: './deals-kanban.component.html',
    styleUrl: './deals-kanban.component.scss',
    imports: [CommonModule,FormsModule,DragDropModule,RouterLink,CollapseHeaderComponent,MatSelectModule,MatIconModule,MatChipsModule,TagInputModule,NgxEditorModule,BsDatepickerModule],
})
export class DealsKanbanComponent implements OnInit, OnDestroy {
  routes = routes 
  tags=['Devops Design', 'MargrateDesign', 'UI for Chat']
  tags1=['Collab', 'Related']
  public lstOne: CardDetails[] = [];
  public lstTwo: CardDetails[] = [];
  public lstThree: CardDetails[] = [];
  public lstFour: CardDetails[] = [];
  public lstFive: CardDetails[] = [];

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



  editor!: Editor;
  editor1!: Editor;
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
    this.editor1 = new Editor();
    this.lstOne = [
      {
        CardClass: "success",
        Logo: "HT",
        CompanyName: "Howell, Tremblay <br> and Rath", 
        Amount: "$03,50,000",
        Email: "darleeo@example.com",
        MobileNo: "+1 12445-47878",
        Location: "Newyork, United States",
        Image: "avatar-19.jpg",
        Name: "Darlee Robertson",
        Percentage: "85%",
        Date: "10 Jan 2024",
    },
    {
        CardClass: "warning",
        Logo: "RJ",
        CompanyName: "Robert, John <br> and Carlos",
        Amount: "$02,10,000",
        Email: "sheron@example.com",
        MobileNo: "+1 12445-47878",
        Location: "Exeter, United States",
        Image: "avatar-20.jpg",
        Name: "Sharon Roy",
        Percentage: "15%",
        Date: "12 Jan 2024",
    },
    {
        CardClass: "info",
        Logo: "WS",
        CompanyName: "Wendy, Star ,<br> and David",
        Amount: "$04,22,000",
        Email: "vau@example.com",
        MobileNo: "+1 12445-47878",
        Location: "Phoenix, United States",
        Image: "avatar-21.jpg",
        Name: "Vaughan Lewis",
        Percentage: "95%",
        Date: "14 Jan 2024",
    },
    ];
    this.lstTwo = [
      {
        CardClass: "primary",
        Logo: "BR",
        CompanyName: "Byron, Roman <br> and Bailey",
        Amount: "$02,45,000",
        Email: "jessica13@example.com",
        MobileNo: "+1 89351-90346",
        Location: "Chester, United States",
        Image: "avatar-01.jpg",
        Name: "Jessica",
        Percentage: "47%",
        Date: "06 Feb 2024",
    },
    {
        CardClass: "success",
        Logo: "CH",
        CompanyName: "Robert, John <br> and Carlos",
        Amount: "$01,17,000",
        Email: "caroltho3@example.com",
        MobileNo: "+1 78982-09163",
        Location: "Charlotte, United States",
        Image: "avatar-16.jpg",
        Name: "Carol Thomas",
        Percentage: "98%",
        Date: "15 Feb 2024",
    },
    {
        CardClass: "primary",
        Logo: "IC",
        CompanyName: "Irene, Charles <br> and Wilston",
        Amount: "$02,12,000",
        Email: "dawnmercha@example.com",
        MobileNo: "+1 27691-89246",
        Location: "Bristol, United States",
        Image: "avatar-22.jpg",
        Name: "Dawn Mercha",
        Percentage: "78%",
        Date: "25 Jan 2024",
    },
    ];
    this.lstThree = [
      {
        CardClass: "info",
        Logo: "HT",
        CompanyName: "Jody, Powell <br> and Cecil",
        Amount: "$01,84,043",
        Email: "rachel@example.com",
        MobileNo: "+1 17839-93617",
        Location: "Baltimore, United States",
        Image: "avatar-23.jpg",
        Name: "Rachel Hampton",
        Percentage: "25%",
        Date: "18 Mar 2024",
    },
    {
        CardClass: "primary",
        Logo: "BL",
        CompanyName: "Bonnie, Linda <br> and Mullin",
        Amount: "$09,35,189",
        Email: "jonelle@example.com",
        MobileNo: "+1 16739-47193",
        Location: "Coventry, United States",
        Image: "avatar-24.jpg",
        Name: "Jonelle Curtiss",
        Percentage: "70%",
        Date: "15 Feb 2024",
    },
    {
        CardClass: "primary",
        Logo: "CJ",
        CompanyName: "Carlos, Jones <br> and Jim",
        Amount: "$04,27,940",
        Email: "jonathan@example.com",
        MobileNo: "+1 18390-37153",
        Location: "Seattle",
        Image: "avatar-25.jpg",
        Name: "Jonathan",
        Percentage: "45%",
        Date: "30 Jan 2024",
    },
    ];
    this.lstFour = [
      {
        CardClass: "primary",
        Logo: "FJ",
        CompanyName: "Freda,Jennfier <br> and Thompson",
        Amount: "$04,17,593",
        Email: "sidney@example.com",
        MobileNo: "+1 11739-38135",
        Location: "London, United States",
        Image: "avatar-17.jpg",
        Name: "Sidney Franks",
        Percentage: "59%",
        Date: "11 Apr 2024",
    },
    {
        CardClass: "primary",
        Logo: "BF",
        CompanyName: "Bruce, Faulkner <br> and Lela",
        Amount: "$08,81,389",
        Email: "brook@example.com",
        MobileNo: "+1 19302-91043",
        Location: "Detroit, United States",
        Image: "avatar-26.jpg",
        Name: "Brook",
        Percentage: "72%",
        Date: "17 Apr 2024",
    },
    {
        CardClass: "info",
        Logo: "LP",
        CompanyName: "Lawrence, Patrick <br> and Vandorn",
        Amount: "$09,27,193",
        Email: "mickey@example.com",
        MobileNo: "+1 17280-92016",
        Location: "Manchester, United States",
        Image: "avatar-15.jpg",
        Name: "Mickey",
        Percentage: "20%",
        Date: "10 Feb 2024",
    },
    ];
    this.lstFive = [
      {
        CardClass: "info",
        Logo: "JP",
        CompanyName: "Jody, Powell and  <br>  Cecil",
        Amount: "$01,84,043",
        Email: "rachel@example.com",
        MobileNo: "+1 17839-93617",
        Location: "Baltimore, United States",
        Image: "avatar-23.jpg",
        Name: "Rachel Hampton",
        Percentage: "25%",
        Date: "18 Mar 2024",
    },
    {
        CardClass: "primary",
        Logo: "BL",
        CompanyName: "Bonnie, Linda and <br> Mullin",
        Amount: "$09,35,189",
        Email: "jonelle@example.com",
        MobileNo: "+1 19302-91043",
        Location: "Conventry, United States",
        Image: "avatar-24.jpg",
        Name: "Jonelle Curtiss",
        Percentage: "70%",
        Date: "15 Feb 2024",
    },
    {
        CardClass: "info",
        Logo: "LP",
        CompanyName: "Lawrence, Patrick <br> and Vandorn",
        Amount: "$09,27,193",
        Email: "mickey@example.com",
        MobileNo: "+1 17280-92016",
        Location: "Manchester, United States",
        Image: "avatar-15.jpg",
        Name: "Mickey",
        Percentage: "20%",
        Date: "10 Feb 2024",
    },
    ];
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor1.destroy();
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

interface CardDetails {
  CardClass: string;
  Logo: string;
  LogoBg?:string;
  CompanyName: string;
  Amount: string;
  Email: string;
  MobileNo: string;
  Location: string;
  Image: string;
  Name: string;
  Percentage: string;
  Date: string;
}
