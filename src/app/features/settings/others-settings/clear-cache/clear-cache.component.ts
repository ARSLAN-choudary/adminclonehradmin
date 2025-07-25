import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-clear-cache',
 imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './clear-cache.component.html',
  styleUrl: './clear-cache.component.scss'
})
export class ClearCacheComponent {
public routes = routes;
}
