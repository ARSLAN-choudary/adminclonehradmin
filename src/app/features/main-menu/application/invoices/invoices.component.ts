import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-invoices',
  imports: [RouterLink,CollapseHeaderComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent {
routes=routes
}
