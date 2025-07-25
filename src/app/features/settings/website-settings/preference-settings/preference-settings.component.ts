import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';


@Component({
  selector: 'app-preference-settings',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './preference-settings.component.html',
  styleUrl: './preference-settings.component.scss'
})
export class PreferenceSettingsComponent {
public routes = routes;
}
