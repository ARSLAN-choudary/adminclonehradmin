import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ui-buttons-group',
    templateUrl: './ui-buttons-group.component.html',
    styleUrl: './ui-buttons-group.component.scss',
    imports: [RouterLink]
})
export class UiButtonsGroupComponent {
  public routes = routes;
}
