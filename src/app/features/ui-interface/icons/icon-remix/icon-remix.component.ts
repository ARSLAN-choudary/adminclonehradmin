import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-icon-remix',
    templateUrl: './icon-remix.component.html',
    styleUrl: './icon-remix.component.scss',
    imports: [RouterLink]
})
export class IconRemixComponent {
routes=routes
}
