import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-ui-images',
    templateUrl: './ui-images.component.html',
    styleUrl: './ui-images.component.scss',
    imports: [RouterLink]
})
export class UiImagesComponent {
  public routes = routes;
}
