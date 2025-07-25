import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { routes } from '../../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


interface data {
  value: string;
}
@Component({
    selector: 'app-form-vertical',
    templateUrl: './form-vertical.component.html',
    styleUrl: './form-vertical.component.scss',
    imports: [MatSelectModule,CommonModule,FormsModule,RouterLink]
})
export class FormVerticalComponent {
  routes=routes
  public selectedValue1 = ''
  public selectedValue2 = '' ;
  public selectedValue3 = '' ;


  selectedList1: data[] = [
    {value: 'Select'},
    {value: 'A+'},
    {value: 'O+'},
    {value: 'B+'},
    {value: 'AB+'},
  ];
  selectedList2: data[] = [
    {value: 'Select State'},
    {value: 'California'},
    {value: 'Texas'},
    {value: 'Florida'},
  ];
  selectedList3: data[] = [
    {value: 'Select Country'},
    {value: 'USA'},
    {value: 'France'},
    {value: 'India'},
    {value: 'Spain'},
  ];
   
}
