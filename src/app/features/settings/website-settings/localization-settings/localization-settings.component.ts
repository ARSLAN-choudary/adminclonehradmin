import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { TagInputModule } from 'ngx-chips';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-localization-settings',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent,TagInputModule,CommonModule,FormsModule,],
  templateUrl: './localization-settings.component.html',
  styleUrl: './localization-settings.component.scss'
})
export class LocalizationSettingsComponent {
public routes = routes;
tags3=["JPG","PNG","GIF"];
}
