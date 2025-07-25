import { Component } from '@angular/core';
import { routes } from '../../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';



@Component({
    selector: 'app-form-grid-gutters',
    templateUrl: './form-grid-gutters.component.html',
    styleUrl: './form-grid-gutters.component.scss',
    imports: [RouterLink]
})
export class FormGridGuttersComponent {
    routes=routes
}
