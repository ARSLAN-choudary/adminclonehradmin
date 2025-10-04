import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

@Component({
  selector: "app-date-range-picker",
  templateUrl: "./date-range-picker.component.html",
  styleUrl: "./date-range-picker.component.scss",
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BsDatepickerModule],
})
export class DateRangePickerComponent {
  @Output() dateRangeChange = new EventEmitter<{
    startDate: Date;
    endDate: Date;
  }>();
  @Input() enforceMaxDays = false;
  @Input() maxDays = 31;
  @Input() defaultDays = 7;
  @Input() hardMaxDate?: Date;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  today = new Date();
  constructor() {
    const end = new Date(); // today
    const start = new Date(end.getTime() - (this.defaultDays - 1) * 86400000);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    this.bsRangeValue = [start, end];
  }
  onDateRangeChange(): void {
    if (!this.bsRangeValue || this.bsRangeValue.length !== 2) return;

    let [startDate, endDate] = this.bsRangeValue;

    // normalize times to day start/end
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // swap if user picked in reverse
    if (start.getTime() > end.getTime()) {
      const tmp = new Date(start);
      start.setTime(end.getTime());
      end.setTime(tmp.getTime());
    }

    // optional hard max calendar cutoff (e.g., today)
    if (this.hardMaxDate) {
      const hardMax = new Date(this.hardMaxDate);
      hardMax.setHours(23, 59, 59, 999);
      if (end.getTime() > hardMax.getTime()) end.setTime(hardMax.getTime());
    }

    // enforce max span in days (inclusive)
    if (this.enforceMaxDays && this.maxDays > 0) {
      const spanMs = end.getTime() - start.getTime();
      const maxSpanMs = this.maxDays * 86400000 - 1; // inclusive window
      if (spanMs > maxSpanMs) {
        // clip end to start + maxDays - 1ms
        end.setTime(start.getTime() + maxSpanMs);
      }
    }

    // write back (keeps UI consistent if we clipped)
    this.bsRangeValue = [start, end];

    // emit clean values
    this.dateRangeChange.emit({ startDate: start, endDate: end });
  }
}
