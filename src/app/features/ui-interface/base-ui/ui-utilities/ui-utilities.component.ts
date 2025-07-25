import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ui-utilities',
  imports: [RouterLink],
  templateUrl: './ui-utilities.component.html',
  styleUrl: './ui-utilities.component.scss'
})
export class UiUtilitiesComponent {
routes=routes
}
