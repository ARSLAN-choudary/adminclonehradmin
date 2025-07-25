import { Component } from '@angular/core';
import { CollapseHeaderComponent } from '../../common/collapse-header/collapse-header.component';
import { routes } from '../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-permissions',
  imports: [
    CollapseHeaderComponent,RouterLink
  ],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent {
 public routes = routes;
 check:boolean=false;
 check1:boolean=false;
 selectAll(): void {
  const checkboxes = document.querySelectorAll<HTMLInputElement>('.form-check-input');
  checkboxes.forEach(checkbox => {
    checkbox.checked = this.check;
  });
  this.check = !this.check;
}
 selectAll1(): void {
  const checkboxes = document.querySelectorAll<HTMLInputElement>('.custom-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = this.check1;
  });
  this.check1 = !this.check1;
}
}
