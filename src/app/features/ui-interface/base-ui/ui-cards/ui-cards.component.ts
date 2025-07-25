import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-cards',
    templateUrl: './ui-cards.component.html',
    styleUrl: './ui-cards.component.scss',
    imports: [RouterLink]
})
export class UiCardsComponent {
  public routes = routes;
  isCardFullscreen = false;

  toggleFullscreen() {
    this.isCardFullscreen = !this.isCardFullscreen;
  }
  isCardVisible = true;

  toggleCardVisibility() {
    this.isCardVisible = !this.isCardVisible;
  }
}
