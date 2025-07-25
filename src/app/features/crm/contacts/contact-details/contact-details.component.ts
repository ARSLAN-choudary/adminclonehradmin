import { Component } from '@angular/core';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { SelectModule } from 'primeng/select';
import { TagInputModule } from 'ngx-chips';
import intlTelInput from 'intl-tel-input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { routes } from '../../../../shared/routes/routes';
interface select{
  data:string;
}
@Component({
  selector: 'app-contact-details',
  imports: [CommonModule,
     RouterLink,
      NgxEditorModule,
      MatSelectModule,
      FormsModule,
      BsDatepickerModule,
      MatChipsModule,
      MatIconModule,
      CollapseHeaderComponent,
      ReactiveFormsModule,
      MatSortModule,
      SelectModule,
    TagInputModule,
    MatTooltipModule
  ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
  routes=routes
  public selectedFieldSet = [0];
 editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ];
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
       this.editor = new Editor();
}
ngOnDestroy():void{
   this.editor = new Editor();
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
}
