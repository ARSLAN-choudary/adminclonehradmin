import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-ban-ip-address',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './ban-ip-address.component.html',
  styleUrl: './ban-ip-address.component.scss'
})
export class BanIpAddressComponent {
public routes = routes;
}
