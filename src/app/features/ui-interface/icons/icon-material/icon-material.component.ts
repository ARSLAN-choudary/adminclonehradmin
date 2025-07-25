import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-icon-material',
    templateUrl: './icon-material.component.html',
    styleUrls: ['./icon-material.component.scss'],
    imports: [RouterLink]
})
export class IconMaterialComponent {
    routes=routes
}
