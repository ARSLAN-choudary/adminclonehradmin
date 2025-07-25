import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-sms-gateways',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './sms-gateways.component.html',
  styleUrl: './sms-gateways.component.scss'
})
export class SmsGatewaysComponent {
public routes = routes;
}
