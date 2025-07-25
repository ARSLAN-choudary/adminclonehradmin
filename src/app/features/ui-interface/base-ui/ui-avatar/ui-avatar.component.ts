import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-avatar',
    templateUrl: './ui-avatar.component.html',
    styleUrl: './ui-avatar.component.scss',
    imports: [RouterLink]
})
export class UiAvatarComponent {
  public routes = routes;
}
