import { Component } from '@angular/core';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';

@Component({
  selector: 'app-security-settings',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './security-settings.component.html',
  styleUrl: './security-settings.component.scss'
})
export class SecuritySettingsComponent {
  public routes = routes;
}
