import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tables-basic',
    templateUrl: './tables-basic.component.html',
    styleUrl: './tables-basic.component.scss',
    imports: [RouterLink]
})
export class TablesBasicComponent {
    routes=routes
}
