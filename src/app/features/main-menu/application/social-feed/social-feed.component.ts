import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { LightgalleryModule } from 'lightgallery/angular'; 
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-social-feed',
  imports: [LightgalleryModule,CollapseHeaderComponent,RouterLink],
  templateUrl: './social-feed.component.html',
  styleUrl: './social-feed.component.scss'
})
export class SocialFeedComponent {
 routes=routes
  private lightGallery!: LightGallery;
  private needRefresh = false;
  settings = {
    counter: false,
    plugins: [lgZoom, lgVideo],
  };
    ngAfterViewInit() {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { index, prevIndex } = detail;
  };
}
