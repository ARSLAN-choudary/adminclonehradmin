import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-date-range-picker',
    templateUrl: './date-range-picker.component.html',
    styleUrl: './date-range-picker.component.scss',
     imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
  ],
})
export class DateRangePickerComponent {
  @Output() dateRangeChange = new EventEmitter<{ startDate: Date; endDate: Date }>();
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  onDateRangeChange(): void {
    if (this.bsRangeValue && this.bsRangeValue.length === 2) {
      const [startDate, endDate] = this.bsRangeValue;
      this.dateRangeChange.emit({ startDate, endDate });
    }
  }
}
