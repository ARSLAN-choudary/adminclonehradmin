import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-spinner',
    templateUrl: './ui-spinner.component.html',
    styleUrl: './ui-spinner.component.scss',
    imports: [RouterLink]
})
export class UiSpinnerComponent {
  public routes = routes;
}
