import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [MatSelectModule,NgxEditorModule,CollapseHeaderComponent,RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  routes=routes
 editor!: Editor;
  editor1!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'format_clear'],
    ['underline', 'strike'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['image'],
    ['link'],
  ];
  ngOnInit(): void {
    this.editor = new Editor();
    this.editor1 = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor1.destroy();
  }
}
