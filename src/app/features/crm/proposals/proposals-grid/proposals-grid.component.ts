import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { routes } from '../../../../shared/routes/routes';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TagInputModule } from 'ngx-chips';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proposals-grid',
  imports: [MatSelectModule,MatIconModule,MatChipsModule,TagInputModule,CommonModule,FormsModule,BsDatepickerModule,NgxEditorModule,RouterLink],
  templateUrl: './proposals-grid.component.html',
  styleUrl: './proposals-grid.component.scss'
})
export class ProposalsGridComponent {
routes=routes
tags=['Tag 1','Tag 2','Tag 3'];
   editor!: Editor;
  editor1!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'format_clear'],
    ['underline', 'strike'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['image'],
    ['link'],
  ];
   selectedOption4: any;
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

    removeOption4(user: any) {
    const index = this.selectedOption4.indexOf(user);
    if (index !== -1) {
      this.selectedOption4.splice(index, 1);
    }
    
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.editor1 = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor1.destroy();
  }
}
