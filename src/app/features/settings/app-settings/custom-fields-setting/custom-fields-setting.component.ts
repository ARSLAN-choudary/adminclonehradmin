import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-custom-fields-setting',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './custom-fields-setting.component.html',
  styleUrl: './custom-fields-setting.component.scss'
})
export class CustomFieldsSettingComponent {
public routes = routes;
}
