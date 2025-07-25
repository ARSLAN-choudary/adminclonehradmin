/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
interface data {
  value: string;
}

@Component({
    selector: 'app-form-select-2',
    templateUrl: './form-select-2.component.html',
    styleUrl: './form-select-2.component.scss',
    imports: [MatSelectModule,CommonModule,FormsModule,MatIconModule,MatChipsModule,RouterLink]
})
export class FormSelect2Component {
  
  public routes = routes;
  public selectedValue1 = '';
  public categories = '';
  public selectedValue2 = '';
  searchInputCategory = '';
  categoriesDataSource = new MatTableDataSource();
  selectedCategory = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';

  selectedList1: data[] = [
    { value: 'Selection-1' },
    { value: 'Selection-2' },
    { value: 'Selection-3' },
    { value: 'Selection-4' },
    { value: 'Selection-5' },
  ];
  selectedList2: data[] = [
    { value: 'Texas' },
    { value: 'Georgia' },
    { value: 'California' },
    { value: 'Washington D.C' },
    { value: 'Virginia' },
  ];
  selectedList3: data[] = [
    { value: 'orange' },
    { value: 'white' },
    { value: 'purple' },
  ];
 

  matSelectChipDataSelected: string[] = [
    'Multiple-1'
  ];
  matSelectChipData: string[] = [
    'Multiple-1',
    'Multiple-2',
    'Multiple-3',
    'Multiple-4',
    'Multiple-5',
  ];

  matSelectChipDataSelected2: string[] = [
    'Apple'
  ];
  matSelectChipData2: string[] = [
    'Apple',
    'Mango',
    'Orange',
    'Guava',
    'Pineapple',
  ];

  removeOptionUnique(option: any) {
    const index = this.matSelectChipDataSelected.indexOf(option);
    if (index !== -1) {
      this.matSelectChipDataSelected.splice(index, 1);
    }
  }
  removeOptionUnique2(option: any) {
    const index = this.matSelectChipDataSelected2.indexOf(option);
    if (index !== -1) {
      this.matSelectChipDataSelected2.splice(index, 1);
    }
  }
}
