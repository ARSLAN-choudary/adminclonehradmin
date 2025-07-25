import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';


@Component({
  selector: 'app-language-settings',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './language-settings.component.html',
  styleUrl: './language-settings.component.scss'
})
export class LanguageSettingsComponent {
public routes = routes;
}
