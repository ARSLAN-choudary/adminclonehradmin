import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-grid',
    templateUrl: './ui-grid.component.html',
    styleUrl: './ui-grid.component.scss',
    imports: [RouterLink]
})
export class UiGridComponent {
  public routes = routes;
}
