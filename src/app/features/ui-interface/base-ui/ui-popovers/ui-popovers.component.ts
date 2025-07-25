import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-popovers',
    templateUrl: './ui-popovers.component.html',
    styleUrl: './ui-popovers.component.scss',
    imports: [RouterLink]
})
export class UiPopoversComponent {
  public routes = routes;
}
