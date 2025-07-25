import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-email-reply',
  imports: [RouterLink],
  templateUrl: './email-reply.component.html',
  styleUrl: './email-reply.component.scss'
})
export class EmailReplyComponent {
routes=routes
}
