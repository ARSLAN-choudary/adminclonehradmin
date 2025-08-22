/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import {  NavigationStart, Router, Event as RouterEvent, RouterLink } from '@angular/router';
import { routes } from '../../../shared/routes/routes';
import { SidebarService } from '../../../shared/sidebar/sidebar.service';
import { DataService } from '../../../shared/data/data.service';
import { CommonService } from '../../../shared/common/common.service';
import { menu, MenuItem, sidebarDataone, SubMenu, subMenus, url } from '../../../shared/model/sidebar.model';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SettingsService } from '../../../shared/settings/settings.service';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [CommonModule,RouterLink,NgScrollbarModule]
})
export class SidebarComponent  {
  routes = routes;
  base = '';
  page = '';
  last = '';
  forbase='false';
  currentUrl = '';

   
  public side_bar_data: any[] = [];
  public sidebardata: sidebarDataone[] = [];
  public menus: menu[] = [];

  constructor(
    private sidebar: SidebarService,
    private data: DataService,
    private router: Router,
    private common: CommonService,
    private settings:SettingsService
  ) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.getRoutes(event);
        const splitVal = event.url.split('/');
        this.currentUrl = event.url;
        this.base = splitVal[1];
        this.page = splitVal[2];
        if(this.base === 'index'){
      this.page == 'index';
    }

      }
    });
    this.getRoutes(this.router);
    this.side_bar_data = this.data.sidebarData1;
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.page.subscribe((res: string) => {
      this.last = res;
    });
  }

  private getRoutes(route: url): void {
    const splitVal = route.url.split('/');
    this.currentUrl = route.url;
    this.base = splitVal[1];
    this.page = splitVal[2];
    if(this.base === 'index' || this.base === 'lead-dashboard'){
      this.forbase = 'true'
    }
  }

  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sidebar.expandSideBar.next('true');
    } else {
      this.sidebar.expandSideBar.next('false');
    }
  }
     onToggleSidebar(): void {
  const layout = document.documentElement.getAttribute('data-layout');

  if (layout === 'hidden') {
    this.settings.togglehidden();
  } else {
    this.toggleSidebarmini();
  }
}
toggleSidebar(): void {
  const wrapper = document.getElementsByClassName('main-wrapper')[0];
  const overlay = document.getElementsByClassName('sidebar-overlay')[0];

  if (wrapper) {
    wrapper.classList.remove('slide-nav');
  }

  if (overlay) {
    overlay.classList.remove('opened');
  }

}
public toggleSidebarmini(): void {
    this.sidebar.switchSideMenuPosition();
    

  }
  currentOpenSecondMenu: MenuItem | null = null;

public expandSubMenus(menu: { menuValue: string; showSubRoute: boolean; }): void {
  sessionStorage.setItem('menuValue', menu.menuValue);

  // Close open main menu when submenu is expanded
  this.openMenuItem = null;

  this.side_bar_data.forEach((mainMenus: sidebarDataone) => {
    mainMenus.menu.forEach((resMenu: MenuItem) => {
      if (resMenu.menuValue === menu.menuValue) {
        resMenu.showSubRoute = !resMenu.showSubRoute;
      } else {
        resMenu.showSubRoute = false;
      }
    });
  });
}

  // expandSubMenus(menu: MenuItem): void {
  //   sessionStorage.setItem('menuValue', menu.menuValue);
  //   this.side_bar_data.forEach((mainMenus: MenuItem) => {
  //     mainMenus.menu.forEach((resMenu: SubMenu) => {
  //       if (resMenu.menuValue === menu.menuValue) {
  //         menu.showSubRoute = !menu.showSubRoute;
  //         this.openMenu;
  //       } else {
  //         resMenu.showSubRoute = false;
  //       }
  //     });
  //   });

  // }

  openMenuItem: MenuItem | null = null;
  openSubmenuOneItem: SubMenu[] | null = null;
  multiLevel1 = false;
  multiLevel2 = false;
  multiLevel3 = false;

openMenu(menu: MenuItem): void {
  // Close any expanded submenu when a main menu is clicked
  this.side_bar_data.forEach((mainMenus: sidebarDataone) => {
    mainMenus.menu.forEach((resMenu: MenuItem) => {
      resMenu.showSubRoute = false;
    });
  });

  // Toggle openMenuItem
  if (this.openMenuItem === menu) {
    this.openMenuItem = null;
  } else {
    this.openMenuItem = menu;
  }
}
 isOpen=false;
public expandSubMenusActive(): void {
  const activeMenu = sessionStorage.getItem('menuValue');
  const activePage = sessionStorage.getItem('page'); // optional, for submenu match

  if (!Array.isArray(this.side_bar_data)) {
    console.warn('Sidebar data not initialized');
    return;
  }

  this.side_bar_data.forEach((mainMenu: sidebarDataone) => {
    mainMenu.menu.forEach((resMenu: menu) => {
      // Expand only the parent matching session value
      resMenu.showSubRoute = (resMenu.menuValue === activeMenu);

      // Expand subMenus inside that menu
      resMenu.subMenus?.forEach((sub) => {
        sub.showSubRoute = sub.base === activePage || sub.page === activePage;
      });
    });
  });
}

  openSubmenuOne(subMenus: any): void {
    if (this.openSubmenuOneItem === subMenus) {
      this.openSubmenuOneItem = null;
    } else {
      this.openSubmenuOneItem = subMenus;
    }
  }
  

  multiLevelOne() {
    this.multiLevel1 = !this.multiLevel1;
  }
  multiLevelTwo() {
    this.multiLevel2 = !this.multiLevel2;
  }
  multiLevelThree() {
    this.multiLevel3 = !this.multiLevel3;
    this.multiLevel2=true;
  }
 ngOnInit(): void {
 const menuValue = sessionStorage.getItem('menuValue');

  if (!menuValue) {
    // Set to the parent menu of Deals Dashboard
    sessionStorage.setItem('menuValue', 'Dashboard');
    sessionStorage.setItem('page', 'index'); // Optional: track which submenu is open
  }

  this.expandSubMenusActive();
this.sidebar.collapseSubMenu$.subscribe(() => {
    this.collapseAllSubMenus();
  });

}
collapseAllSubMenus(): void {
  this.side_bar_data.forEach((mainMenu: sidebarDataone) => {
    mainMenu.menu.forEach((resMenu: menu) => {
      resMenu.showSubRoute = false;
    });
  });
}
}
