import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ui-collapse',
  imports: [RouterLink],
  templateUrl: './ui-collapse.component.html',
  styleUrl: './ui-collapse.component.scss'
})
export class UiCollapseComponent {
routes=routes
}
