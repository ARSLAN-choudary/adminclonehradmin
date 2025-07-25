import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-dropdowns',
    templateUrl: './ui-dropdowns.component.html',
    styleUrl: './ui-dropdowns.component.scss',
    imports: [RouterLink]
})
export class UiDropdownsComponent {
  public routes = routes;
}
