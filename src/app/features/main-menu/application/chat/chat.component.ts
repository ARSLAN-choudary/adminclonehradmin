import { Component } from '@angular/core';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { routes } from '../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat',
  imports: [CollapseHeaderComponent,RouterLink],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
routes=routes
}
