import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-icon-themify',
    templateUrl: './icon-themify.component.html',
    styleUrls: ['./icon-themify.component.scss'],
    imports: [RouterLink]
})
export class IconThemifyComponent {
routes=routes
   

   
}
