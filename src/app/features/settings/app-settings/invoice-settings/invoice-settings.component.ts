import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FormsModule, } from '@angular/forms';

@Component({
  selector: 'app-invoice-settings',
  imports: [
    RouterModule,
    MatSelectModule,
    CollapseHeaderComponent,
    NgxEditorModule,
    FormsModule,],
  templateUrl: './invoice-settings.component.html',
  styleUrl: './invoice-settings.component.scss'
})
export class InvoiceSettingsComponent {
public routes = routes;


editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ];

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
