import { Component } from "@angular/core";
import { routes } from "../../../shared/routes/routes";
import { MainMenu, Menu } from "../../../shared/model/sidebar.model";
import { DataService } from "../../../shared/data/data.service";
import { CommonService } from "../../../shared/common/common.service";
import { SidebarService } from "../../../shared/sidebar/sidebar.service";
import { SettingsService } from "../../../shared/settings/settings.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  imports: [RouterLink],
})
export class HeaderComponent {
  base = "";
  page = "";
  last = "";
  themeMode = "light";
  public miniSidebar = false;
  routes = routes;
  public multilevel: boolean[] = [false, false, false];
  public submenus = false;
  public addClass = false;
  role: string = "";
  openSubmenus() {
    this.submenus = !this.submenus;
  }

  side_bar_data: MainMenu[] = [];
  openMenuItem: any = null;
  openSubmenuOneItem: any = null;
  multiLevel1 = false;
  multiLevel2 = false;
  multiLevel3 = false;

  constructor(
    private data: DataService,
    private common: CommonService,
    private sidebar: SidebarService,
    public settings: SettingsService,
    private sideBar: SidebarService
  ) {
    this.role = localStorage.getItem("role") || "";
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
    this.sidebar.sideBarPosition.subscribe((res: string) => {
      if (res == "true") {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });

    this.settings.themeColor.subscribe((res: string) => {
      this.themeMode = res;
    });
  }

  elem = document.documentElement;

  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  public toggleSidebar(): void {
    this.sidebar.switchMobileSideBarPosition();
    /* eslint no-var: off */
    var root = document.getElementsByTagName("html")[0];
    /* eslint no-var: off */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var sidebar: any = document.getElementById("sidebar");
    var mainwrapper: any = document.querySelector(".main-wrapper");
    const overlay = document.querySelector(".sidebar-overlay");

    root.classList.add("menu-opened");
    mainwrapper.classList.add("slide-nav");
    if (overlay) {
      overlay.classList.add("opened");
    }
  }

  public togglesMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }

  public miniSideBarMouseHover(position: string): void {
    if (this.settings.SideBarMouseHover === true) {
      if (position == "over") {
        this.sidebar.expandSideBar.next("true");
      } else {
        this.sidebar.expandSideBar.next("false");
      }
    }
  }

  changeTheme() {
    if (this.themeMode === "light") {
      this.changeThemeColor("dark");
    } else {
      this.changeThemeColor("light");
    }
  }

  public changeThemeColor(theme: string): void {
    this.settings.themeColor.next(theme);
    this.settings.changeThemeColor(theme);
    localStorage.setItem("themeMode", theme);
  }

  miniSideBarBlur(position: string) {
    if (position === "over") {
      this.sideBar.expandSideBar.next("true");
    } else {
      this.sideBar.expandSideBar.next("false");
    }
  }

  miniSideBarFocus(position: string) {
    if (position === "over") {
      this.sideBar.expandSideBar.next("true");
    } else {
      this.sideBar.expandSideBar.next("false");
    }
  }

  openMenu(menu: any): void {
    if (this.openMenuItem === menu) {
      this.openMenuItem = null;
    } else {
      this.openMenuItem = menu;
    }
  }

  openSubmenuOne(subMenus: any): void {
    if (this.openSubmenuOneItem === subMenus) {
      this.openSubmenuOneItem = null;
    } else {
      this.openSubmenuOneItem = subMenus;
    }
  }

  public expandSubMenus(menu: Menu): void {
    sessionStorage.setItem("menuValue", menu.menuValue);
    this.side_bar_data.map((mainMenus: MainMenu) => {
      mainMenus.menu.map((resMenu: Menu) => {
        // collapse other submenus which are open
        if (resMenu.menuValue === menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
          if (menu.showSubRoute === false) {
            sessionStorage.removeItem("menuValue");
          }
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }

  multiLevelOne() {
    this.multiLevel1 = !this.multiLevel1;
  }

  multiLevelTwo() {
    this.multiLevel2 = !this.multiLevel2;
  }

  multiLevelThree() {
    this.multiLevel3 = !this.multiLevel3;
  }

  logOut() {
    localStorage.clear();
  }
}
