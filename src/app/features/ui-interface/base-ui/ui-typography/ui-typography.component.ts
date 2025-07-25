import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-typography',
    templateUrl: './ui-typography.component.html',
    styleUrl: './ui-typography.component.scss',
    imports: [RouterLink]
})
export class UiTypographyComponent {
  public routes = routes;
}
