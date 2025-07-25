import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-grid',
  imports: [MatSelectModule,NgxEditorModule,RouterLink],
  templateUrl: './invoice-grid.component.html',
  styleUrl: './invoice-grid.component.scss'
})
export class InvoiceGridComponent {
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
