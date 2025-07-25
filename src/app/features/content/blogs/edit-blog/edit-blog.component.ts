import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TagInputModule } from 'ngx-chips';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  imports: [MatSelectModule,NgxEditorModule,TagInputModule,CommonModule,FormsModule,RouterLink],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.scss'
})
export class EditBlogComponent {
  routes=routes
  tags=['Productivity'];
editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ];
    ngOnInit():void{
      this.editor = new Editor();
    }
}
