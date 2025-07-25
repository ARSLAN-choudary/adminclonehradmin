import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ui-links',
  imports: [RouterLink],
  templateUrl: './ui-links.component.html',
  styleUrl: './ui-links.component.scss'
})
export class UiLinksComponent {
routes=routes
}
