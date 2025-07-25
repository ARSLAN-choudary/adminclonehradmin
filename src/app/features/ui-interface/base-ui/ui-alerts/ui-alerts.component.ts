import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-alerts',
    templateUrl: './ui-alerts.component.html',
    styleUrl: './ui-alerts.component.scss',
    imports: [RouterLink]
})
export class UiAlertsComponent {
  public routes = routes;
}
