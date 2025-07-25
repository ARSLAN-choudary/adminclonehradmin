import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-language-web',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './language-web.component.html',
  styleUrl: './language-web.component.scss'
})
export class LanguageWebComponent {
public routes = routes;
}
