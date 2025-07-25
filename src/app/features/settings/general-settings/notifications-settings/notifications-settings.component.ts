import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
@Component({
  selector: 'app-notifications-settings',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './notifications-settings.component.html',
  styleUrl: './notifications-settings.component.scss'
})
export class NotificationsSettingsComponent {
public routes = routes;
}
