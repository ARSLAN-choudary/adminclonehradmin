import { Component } from '@angular/core';
import { CollapseHeaderComponent } from '../../../../common/collapse-header/collapse-header.component';
import { routes } from '../../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-audio-call',
  imports: [CollapseHeaderComponent,RouterLink],
  templateUrl: './audio-call.component.html',
  styleUrl: './audio-call.component.scss'
})
export class AudioCallComponent {
routes=routes
}
