import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { MatSelectModule } from '@angular/material/select';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-storage',
imports: [RouterModule,MatSelectModule,CollapseHeaderComponent],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss'
})
export class StorageComponent {
public routes = routes;
}
