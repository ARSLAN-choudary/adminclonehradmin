import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-payment-gateways',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './payment-gateways.component.html',
  styleUrl: './payment-gateways.component.scss'
})
export class PaymentGatewaysComponent {
  public routes = routes;
}
