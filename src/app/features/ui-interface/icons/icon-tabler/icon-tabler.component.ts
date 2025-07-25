import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-icon-tabler',
    templateUrl: './icon-tabler.component.html',
    styleUrl: './icon-tabler.component.scss',
    imports: [RouterLink]
})
export class IconTablerComponent {
routes=routes
}
