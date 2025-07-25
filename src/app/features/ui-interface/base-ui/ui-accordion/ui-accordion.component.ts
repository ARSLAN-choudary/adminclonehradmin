import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-accordion',
    templateUrl: './ui-accordion.component.html',
    styleUrl: './ui-accordion.component.scss',
    imports: [RouterLink]
})
export class UiAccordionComponent {
  public routes = routes;
}
