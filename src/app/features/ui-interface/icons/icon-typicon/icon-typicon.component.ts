import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-icon-typicon',
    templateUrl: './icon-typicon.component.html',
    styleUrls: ['./icon-typicon.component.scss'],
    imports: [RouterLink]
})
export class IconTypiconComponent {
routes=routes
   

   
}
