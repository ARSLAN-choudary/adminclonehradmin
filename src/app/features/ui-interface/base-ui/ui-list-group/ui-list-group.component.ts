import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ui-list-group',
  imports: [RouterLink],
  templateUrl: './ui-list-group.component.html',
  styleUrl: './ui-list-group.component.scss'
})
export class UiListGroupComponent {
routes=routes
}
