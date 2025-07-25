import { Component } from '@angular/core';
import { CollapseHeaderComponent } from '../../../../common/collapse-header/collapse-header.component';
import { routes } from '../../../../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-video-call',
  imports: [CollapseHeaderComponent,RouterLink],
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.scss'
})
export class VideoCallComponent {
routes=routes
}
