import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-language-web-edit',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './language-web-edit.component.html',
  styleUrl: './language-web-edit.component.scss'
})
export class LanguageWebEditComponent {
public routes = routes;
}
