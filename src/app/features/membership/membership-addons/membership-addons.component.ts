import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-membership-addons',
  imports: [RouterLink],
  templateUrl: './membership-addons.component.html',
  styleUrl: './membership-addons.component.scss'
})
export class MembershipAddonsComponent {
routes=routes
}
