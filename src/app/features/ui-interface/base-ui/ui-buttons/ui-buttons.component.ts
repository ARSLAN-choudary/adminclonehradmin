import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-buttons',
    templateUrl: './ui-buttons.component.html',
    styleUrl: './ui-buttons.component.scss',
    imports: [RouterLink]
})
export class UiButtonsComponent {
  public routes = routes;
}
