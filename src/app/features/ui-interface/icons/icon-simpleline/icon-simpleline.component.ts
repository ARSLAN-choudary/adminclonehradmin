import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-icon-simpleline',
    templateUrl: './icon-simpleline.component.html',
    styleUrls: ['./icon-simpleline.component.scss'],
    imports: [RouterLink]
})
export class IconSimplelineComponent {

   routes=routes

   
}
