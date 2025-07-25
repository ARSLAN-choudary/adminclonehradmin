import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-icon-fontawesome',
    templateUrl: './icon-fontawesome.component.html',
    styleUrls: ['./icon-fontawesome.component.scss'],
    imports: [RouterLink]
})
export class IconFontawesomeComponent {
    routes=routes
}
