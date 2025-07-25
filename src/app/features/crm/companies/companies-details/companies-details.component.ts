import { Component } from '@angular/core';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { SelectModule } from 'primeng/select';
import { TagInputModule } from 'ngx-chips';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-companies-details',
  imports: [CommonModule,FormsModule,MatSelectModule,MatIconModule
      ,MatChipsModule,SelectModule,TagInputModule,RouterLink,NgxEditorModule,BsDatepickerModule
    ],
  templateUrl: './companies-details.component.html',
  styleUrl: './companies-details.component.scss'
})
export class CompaniesDetailsComponent {
  routes=routes
  selectedFieldSet=[0] 
  tags=['Collab','VIP'];
  tags2=['Devops Design','MargrateDesign'];
  tags3=['Collab','Rated'];
  selectedOption1: any;
  selectedOption2: any;
  selectedOption3: any;
  selectedOption4: any;
  selectedOption5: any;
  selectedOption6: any;
  editor!: Editor;
  editor1!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'format_clear'],
    ['underline', 'strike'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['image'],
    ['link'],
  ];

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
this.editor = new Editor();
    this.editor1 = new Editor();
  }
    trash:boolean=false;
isTrash():void{
  this.trash=true;
}
  formData: any[][] = []; 

  addNewRow(i:number) {
     if (!this.formData[i]) {
    this.formData[i] = []; // Initialize as empty array if undefined
  }
  this.formData[i].push({});
  }

removeRow(rowIndex: number, sectionIndex: number) {
  const section = this.formData[sectionIndex];
  if (Array.isArray(section)) {
    section.splice(rowIndex, 1);
  }
}

  trackByIndex(index: number, item: any) {
    return index;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor1.destroy();
  }
}
interface select{
  data:string;
}
