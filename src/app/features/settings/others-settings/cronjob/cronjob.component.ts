import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-cronjob',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './cronjob.component.html',
  styleUrl: './cronjob.component.scss'
})
export class CronjobComponent {
public routes = routes;
}
