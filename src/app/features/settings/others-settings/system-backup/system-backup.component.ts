import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-system-backup',
imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './system-backup.component.html',
  styleUrl: './system-backup.component.scss'
})
export class SystemBackupComponent {
public routes = routes;
}
