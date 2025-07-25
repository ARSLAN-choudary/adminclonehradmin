import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-carousel',
    templateUrl: './ui-carousel.component.html',
    styleUrl: './ui-carousel.component.scss',
    imports: [RouterLink]
})
export class UiCarouselComponent {
  public routes = routes;
}
