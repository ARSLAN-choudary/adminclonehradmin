import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {menu, sidebarData, sidebarDataone} from '../model/sidebar.model';
import {DataService} from '../data/data.service';
import {CommonService} from '../common/common.service';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    private collapseSubject = new BehaviorSubject<boolean>(false);
    collapse$ = this.collapseSubject.asObservable();
    isSidebarOpen:any =false;

    toggleCollapse() {
        this.collapseSubject.next(!this.collapseSubject.value);
    }

    public toggleSideBar: BehaviorSubject<string> = new BehaviorSubject<string>(
        localStorage.getItem('isMiniSidebar') || "false"
    );
    public sideBarPosition: BehaviorSubject<string> = new BehaviorSubject<string>(
        localStorage.getItem('sideBarPosition') || 'false'
    );

    public toggleMobileSideBar: BehaviorSubject<string> =
        new BehaviorSubject<string>(
            localStorage.getItem('isMobileSidebar') || 'false'
        );

    public expandSideBar: BehaviorSubject<string> = new BehaviorSubject<string>(
        'false'
    );
    private renderer: Renderer2;

    constructor(private data: DataService, rendererFactory: RendererFactory2, private common: CommonService) {
        this.renderer = rendererFactory.createRenderer(null, null);
        if (localStorage.getItem('isMiniSidebar') == 'true') {
            this.expandSideBar.next('false');
        } else {
            this.expandSideBar.next('true');
        }
    }

    public switchSideMenuPosition(): void {
        const isMiniSidebar = localStorage.getItem('isMiniSidebar');


        const menuValue = sessionStorage.getItem('menuValue');


        if (isMiniSidebar) {
            this.toggleSideBar.next("false");
            localStorage.removeItem('isMiniSidebar');

            this.data.sidebarData1.forEach((mainMenus: sidebarDataone) => {
                mainMenus.menu.forEach((resMenu: menu) => {
                    if (menuValue && menuValue === resMenu.menuValue) {

                        resMenu.showSubRoute = true;
                    }
                });
            });
        } else {
            this.toggleSideBar.next('true');
            localStorage.setItem('isMiniSidebar', 'true');

            this.data.sidebarData1.forEach((mainMenus: sidebarDataone) => {
                mainMenus.menu.forEach((resMenu: menu) => {
                    resMenu.showSubRoute = false;
                });
            });
        }

        // Optional: If UI doesn’t update, trigger change detection
        //
    }

    public switchMobileSideBarPosition(): void {
        if (localStorage.getItem('isMobileSidebar')) {
            this.toggleMobileSideBar.next('false');
            localStorage.removeItem('isMobileSidebar');
        } else {
            this.toggleMobileSideBar.next('true');
            localStorage.setItem('isMobileSidebar', 'true');
        }
    }

    public showDark: BehaviorSubject<string | boolean> = new BehaviorSubject<string | boolean>(
        localStorage.getItem('isDarkTheme') || false
    );

    public themeColor(): void {
        if (localStorage.getItem('isDarkTheme')) {
            this.showDark.next("false");
            localStorage.removeItem('isDarkTheme');
        } else {
            this.showDark.next('true');
            localStorage.setItem('isDarkTheme', 'true');
        }
    }

    public side_bar_data: Array<sidebarDataone> = [];
    private collapseSubMenuSource = new Subject<void>();
    collapseSubMenu$ = this.collapseSubMenuSource.asObservable();

    triggerCollapseSubMenus() {
        this.collapseSubMenuSource.next();
    }
    public isOpen$ = new BehaviorSubject<boolean>(false);

    open()   { this.isOpen$.next(true);  }
    close()  { this.isOpen$.next(false); }
    toggle() { this.isOpen$.next(!this.isOpen$.value); }
}
