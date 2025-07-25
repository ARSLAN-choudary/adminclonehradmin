import { Component } from '@angular/core';
import { routes } from '../../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';



@Component({
    selector: 'app-form-select',
    templateUrl: './form-select.component.html',
    styleUrl: './form-select.component.scss',
    imports: [RouterLink]
})
export class FormSelectComponent {
    routes=routes
}
