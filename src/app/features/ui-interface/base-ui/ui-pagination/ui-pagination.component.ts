import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-pagination',
    templateUrl: './ui-pagination.component.html',
    styleUrl: './ui-pagination.component.scss',
    imports: [RouterLink]
})
export class UiPaginationComponent {
  public routes = routes;
}
