import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, Event as RouterEvent, RouterModule } from '@angular/router';
import { SidebarService } from '../shared/sidebar/sidebar.service';
import { CommonService } from '../shared/common/common.service';
import { DataService } from '../shared/data/data.service';
import { SettingsService } from '../shared/settings/settings.service';
import { Title } from '@angular/platform-browser';
import { menu, sidebarData, sidebarDataone, url } from '../shared/model/sidebar.model';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './common/layout/layout.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter } from 'rxjs';
export interface RouterObject {
  id?: number;
  url: string;
  type?: number;
}
@Component({
  selector: 'app-features',
  imports: [RouterModule,CommonModule,LayoutComponent,SidebarComponent,HeaderComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent implements OnInit {
  public miniSidebar = 'false';
  public expandMenu = 'false';
  public mobileSidebar = 'false';
  public sideBarActivePath = false;
  public headerActivePath = false;
  base = '';
  page = '';
  last = '';
  currentUrl = '';
layoutMode = '';
  constructor(
    private sideBar: SidebarService,
    public router: Router,
    private data: DataService,
    private breakpointObserver:BreakpointObserver,
    private common:CommonService,
    private settings:SettingsService
  ) 
  {
    this.router.events.pipe(
  filter(event => event instanceof NavigationEnd)
).subscribe(() => {
  this.getRoutes(this.router);
});
    this.getRoutes(this.router);

    this.common.base.subscribe((res: string) => {
      this.base = res
    });
    this.common.page.subscribe((res: string) => {
      this.page = res
    });
    this.common.last.subscribe((res: string) => {
      this.last = res
    });

    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = 'true';
      } else {
        this.miniSidebar = 'false';
      }
    });
      this.sideBar.expandSideBar.subscribe((res: string) => {
      this.expandMenu = res;
      if (res == 'false' && this.miniSidebar == 'true') {
        this.data.sidebarData1.map((mainMenus: sidebarDataone) => {
          mainMenus.menu.map((resMenu: menu) => {
            resMenu.showSubRoute = false;
          });
        });
      }
      if (res == 'true' && this.miniSidebar == 'true') {
        this.data.sidebarData1.map((mainMenus: sidebarDataone) => {
          mainMenus.menu.map((resMenu: menu) => {
            const menuValue = sessionStorage.getItem('menuValue');
            if (menuValue && menuValue == resMenu.menuValue) {
              resMenu.showSubRoute = true;
            } else {
              resMenu.showSubRoute = false;
            }
          });
        });
      }
    });
    //mobile sidebarclose
    this.router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.getRoutes(data);
      }
      if (data instanceof NavigationEnd) {
        localStorage.removeItem('isMobileSidebar');
        this.mobileSidebar = 'false';
      }if (data instanceof NavigationStart) {
        this.getRoutes(data);
      }
      if (data instanceof NavigationEnd) {
        localStorage.removeItem('isMobileSidebar');
        this.mobileSidebar = 'false';
      }
    });
    this.sideBar.toggleMobileSideBar.subscribe((res: string) => {
      if (res == 'true' || res == 'true') {
        this.mobileSidebar = 'true';
      } else {
        this.mobileSidebar = 'false';
      }
    });
    this.settings.layoutMode.subscribe((layout) => {
      this.layoutMode = layout;
      if (layout == 'mini') {
        this.miniSidebar = 'true';
      } else {
        this.miniSidebar = 'false';
      }
    });


       
  }
  public toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
 isCollapsed = false;
ngOnInit():void{
     this.data.collapse$.subscribe((collapse: boolean) => {
      this.isCollapsed = collapse;
     });
  this.breakpointObserver.observe(['(min-width: 991.98px)'])
  .subscribe((result: { matches: any; }) => {
    if (result.matches) {
      this.mobileSidebar = 'false';
    } 
  });   
}

  private getRoutes(route: RouterObject): void {
    const splitVal =  route?.url.split('/');
    this.common.currentRoute.next(route.url);
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
  } 
  ngOnDestroy(): void {
    this.settings.changeThemeColor('light');
  }
sidebarClose(){
  this.mobileSidebar='false';
  const wrapper = document.getElementsByClassName('main-wrapper')[0];
  const overlay = document.getElementsByClassName('sidebar-overlay')[0];

  if (wrapper) {
    wrapper.classList.remove('slide-nav');
  }

  if (overlay) {
    overlay.classList.remove('opened');
  }
}
}
