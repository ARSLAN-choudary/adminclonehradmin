import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-badges',
    templateUrl: './ui-badges.component.html',
    styleUrl: './ui-badges.component.scss',
    imports: [RouterLink]
})
export class UiBadgesComponent {
  public routes = routes;
}
