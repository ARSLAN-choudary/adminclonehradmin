import { Component } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../../shared/routes/routes';


@Component({
    selector: 'app-form-mask',
    templateUrl: './form-mask.component.html',
    styleUrls: ['./form-mask.component.scss'],
    imports: [NgxMaskModule,RouterLink]
})
export class FormMaskComponent{
  routes = routes
}
 