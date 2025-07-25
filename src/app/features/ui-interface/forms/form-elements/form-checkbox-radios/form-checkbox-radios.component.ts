import { Component } from '@angular/core';
import { routes } from '../../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';



@Component({
    selector: 'app-form-checkbox-radios',
    templateUrl: './form-checkbox-radios.component.html',
    styleUrl: './form-checkbox-radios.component.scss',
    imports: [RouterLink]
})
export class FormCheckboxRadiosComponent {
    routes=routes
}
