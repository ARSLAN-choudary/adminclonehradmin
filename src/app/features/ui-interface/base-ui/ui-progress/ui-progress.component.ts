import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ui-progress',
    templateUrl: './ui-progress.component.html',
    styleUrl: './ui-progress.component.scss',
    imports: [RouterLink]
})
export class UiProgressComponent {
  public routes = routes;
}
