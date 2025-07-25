import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-database-backup',
  imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './database-backup.component.html',
  styleUrl: './database-backup.component.scss'
})
export class DatabaseBackupComponent {
public routes = routes;
}
