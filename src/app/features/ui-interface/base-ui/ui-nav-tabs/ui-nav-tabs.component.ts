import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-nav-tabs',
    templateUrl: './ui-nav-tabs.component.html',
    styleUrl: './ui-nav-tabs.component.scss',
    imports: [RouterLink]
})
export class UiNavTabsComponent {
  public routes = routes;
}
