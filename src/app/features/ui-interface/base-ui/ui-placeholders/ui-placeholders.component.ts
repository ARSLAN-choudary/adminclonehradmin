import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-placeholders',
    templateUrl: './ui-placeholders.component.html',
    styleUrl: './ui-placeholders.component.scss',
    imports: [RouterLink]
})
export class UiPlaceholdersComponent {
  public routes = routes;
}
