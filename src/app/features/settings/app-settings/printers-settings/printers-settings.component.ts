import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-printers-settings',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './printers-settings.component.html',
  styleUrl: './printers-settings.component.scss'
})
export class PrintersSettingsComponent {
  public routes = routes;
}
