import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-currencies',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss'
})
export class CurrenciesComponent {
  public routes = routes;
}
