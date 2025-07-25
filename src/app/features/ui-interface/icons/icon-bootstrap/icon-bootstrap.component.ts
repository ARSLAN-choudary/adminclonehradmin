import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-icon-bootstrap',
    templateUrl: './icon-bootstrap.component.html',
    styleUrl: './icon-bootstrap.component.scss',
    imports: [RouterLink]
})
export class IconBootstrapComponent {
routes=routes
}
