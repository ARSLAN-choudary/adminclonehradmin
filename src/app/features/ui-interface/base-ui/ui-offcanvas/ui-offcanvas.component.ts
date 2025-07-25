import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ui-offcanvas',
    templateUrl: './ui-offcanvas.component.html',
    styleUrl: './ui-offcanvas.component.scss',
    imports: [RouterLink]
})
export class UiOffcanvasComponent {
routes=routes
}
