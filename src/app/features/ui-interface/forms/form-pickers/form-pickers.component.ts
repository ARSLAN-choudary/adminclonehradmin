import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsDatepickerConfig, BsDatepickerDirective, BsDatepickerModule, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { CalendarModule } from 'primeng/calendar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-form-pickers',
    templateUrl: './form-pickers.component.html',
    styleUrl: './form-pickers.component.scss',
    imports: [CommonModule,FormsModule,BsDatepickerModule,CalendarModule,ColorPickerModule,RouterLink]
})
export class FormPickersComponent {
  routes=routes
  date: Date | undefined;
  time: Date[] | undefined;
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  color: string | undefined;
  maxDate = new Date();
  datePickerValue: Date = new Date(2020, 7);
  dateRangePickerValue?: (Date | undefined)[];
  range1: Date = new Date(2020, 5);
  range2: Date = new Date(2020, 8);
  minMode: BsDatepickerViewMode = 'month';
  selectedYear: Date | undefined;
  @ViewChild(BsDatepickerDirective, { static: false })
  datepicker?: BsDatepickerDirective;
  bsConfig: Partial<BsDatepickerConfig>;
    constructor() {
      this.selectedYear = new Date(new Date().getFullYear(), 0, 1);
      this.bsConfig = {
        minMode: 'year',
        dateInputFormat: 'YYYY', // Display only the year in the input
      };
      this.maxDate.setDate(this.maxDate.getDate() + 7);
      this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate]
  }
  ngOnInit(): void {
    this.dateRangePickerValue = [this.range1, this.range2];
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode
    });
  }
  
}
