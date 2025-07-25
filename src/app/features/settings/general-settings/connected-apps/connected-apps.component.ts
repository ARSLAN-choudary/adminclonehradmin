import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
@Component({
  selector: 'app-connected-apps',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './connected-apps.component.html',
  styleUrl: './connected-apps.component.scss'
})
export class ConnectedAppsComponent {
public routes = routes;
}
