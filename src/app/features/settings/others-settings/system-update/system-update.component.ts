import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-system-update',
imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './system-update.component.html',
  styleUrl: './system-update.component.scss'
})
export class SystemUpdateComponent {
public routes = routes;
}
