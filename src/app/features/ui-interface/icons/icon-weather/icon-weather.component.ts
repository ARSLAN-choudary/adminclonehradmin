import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-icon-weather',
    templateUrl: './icon-weather.component.html',
    styleUrls: ['./icon-weather.component.scss'],
    imports: [RouterLink]
})
export class IconWeatherComponent {
routes=routes
   

   
}
