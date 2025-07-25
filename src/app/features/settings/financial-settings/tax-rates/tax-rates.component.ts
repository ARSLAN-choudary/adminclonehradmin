import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-tax-rates',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './tax-rates.component.html',
  styleUrl: './tax-rates.component.scss'
})
export class TaxRatesComponent {
 public routes = routes;
}
