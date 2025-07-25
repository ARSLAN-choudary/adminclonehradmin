import { Component } from '@angular/core';
import { CollapseHeaderComponent } from '../../common/collapse-header/collapse-header.component';
import {MatSelectModule} from '@angular/material/select'
import { SelectModule } from 'primeng/select';
import { routes } from '../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-membership-plans',
  imports: [CollapseHeaderComponent,SelectModule,MatSelectModule,RouterLink],
  templateUrl: './membership-plans.component.html',
  styleUrl: './membership-plans.component.scss'
})

export class MembershipPlansComponent {
routes=routes
}
