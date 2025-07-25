import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { DataService } from '../../../../shared/data/data.service';


@Component({
  selector: 'app-appearance-settings',
    imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './appearance-settings.component.html',
  styleUrl: './appearance-settings.component.scss'
})
export class AppearanceSettingsComponent {
public routes = routes;
constructor(private data: DataService) {}

  isActive = 'Light';

  setActive(theme: string) {
    this.isActive = theme;
  }
}
