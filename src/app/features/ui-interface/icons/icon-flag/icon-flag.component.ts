import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-icon-flag',
    templateUrl: './icon-flag.component.html',
    styleUrls: ['./icon-flag.component.scss'],
    imports: [RouterLink]
})
export class IconFlagComponent {
    routes=routes
}
