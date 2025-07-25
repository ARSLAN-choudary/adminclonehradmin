import { Component } from '@angular/core';
import { routes } from '../../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';



@Component({
    selector: 'app-form-elements',
    templateUrl: './form-elements.component.html',
    styleUrl: './form-elements.component.scss',
    imports: [RouterLink]
})
export class FormElementsComponent {
    routes=routes
}
