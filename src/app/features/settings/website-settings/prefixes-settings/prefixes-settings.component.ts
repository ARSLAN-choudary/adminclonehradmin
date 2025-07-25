import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';


@Component({
  selector: 'app-prefixes-settings',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './prefixes-settings.component.html',
  styleUrl: './prefixes-settings.component.scss'
})
export class PrefixesSettingsComponent {
public routes = routes;
}
