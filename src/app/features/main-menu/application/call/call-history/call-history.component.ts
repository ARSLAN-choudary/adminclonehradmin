import { Component } from '@angular/core';
import { CollapseHeaderComponent } from '../../../../common/collapse-header/collapse-header.component';
import { DateRangePickerComponent } from '../../../../common/date-range-picker/date-range-picker.component';
import { routes } from '../../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-call-history',
  imports: [CollapseHeaderComponent,DateRangePickerComponent,RouterLink],
  templateUrl: './call-history.component.html',
  styleUrl: './call-history.component.scss'
})
export class CallHistoryComponent {
routes=routes
}
