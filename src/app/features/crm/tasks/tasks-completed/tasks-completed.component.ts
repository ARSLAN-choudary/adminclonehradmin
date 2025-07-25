import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SelectModule } from 'primeng/select';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TagInputModule } from 'ngx-chips';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';
@Component({
  selector: 'app-tasks-completed',
  imports: [MatSelectModule,SelectModule,MatIconModule,MatChipsModule,RouterLink,CollapseHeaderComponent,BsDatepickerModule,TagInputModule,CommonModule,FormsModule,DateRangePickerComponent],
  templateUrl: './tasks-completed.component.html',
  styleUrl: './tasks-completed.component.scss'
})
export class TasksCompletedComponent {
routes=routes
tags=['Collab','VIP'];
selectedOption3: any;
   selectedOption4: any;
  option3 = [
    {
      id: 1,
      name: 'Robert Jhonson',
      image: 'assets/img/profiles/avatar-02.jpg',
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
