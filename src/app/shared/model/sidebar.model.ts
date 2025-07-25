export interface sidebarData {
    tittle: string;
    hasSubRoute: boolean;
    icon: string;
    showSubRoute: boolean;
    route: string;
    activeRoute: string;
    subRoutes: sidebarData[];
  }
  export interface url {
    url: string;
  }
  export interface sidebarDataone {
    tittle: string;
    showAsTab: boolean;
    separateRoute: boolean;
    menu: menu[];
  }
  export interface menu {
    menuValue: string;
    route: string;
    hasSubRoute: boolean;
    showSubRoute: boolean;
    icon: string;
    page: string;
    base?: string;
    base1?: string;
    base2?: string;
    base3?: string;
    base4?: string;
    base5?: string;
    base6?: string;
    base7?: string;
    base8?: string;
    base9?: string;
    base10?: string;
    hasSubRouteTwo:boolean;
    subMenus: subMenus[];
    menu:MenuItem[];
  }
  export interface subMenus {
    showSubRoute: boolean;
    menuValue: string;
    route:string;
    page: string;
    subMenusTwo?:any[];
    base?:string;
    customSubmenuTwo?:boolean;
  }
  export interface MenuItem {
    hasSubRoute: boolean;
    hasSubRouteTwo: boolean;
    menuValue: string;
    showSubRoute: boolean;
    menu: SubMenu[];
    base?:string;
  
}
  
  export interface SubMenu {
    menuValue: string;
    showSubRoute: boolean;
  }
  export interface MainMenu {
    title: string;
    showAsTab: boolean;
    separateRoute: boolean;
    menu: Menu[];
  }
  export interface Menu {
    menuValue: string;
    hasSubRouteTwo?: boolean;
    showSubRoute?: boolean;
    hasSubRoute?: boolean;
    icon?: string;
    base?: string;
    base1?: string;
    base2?: string;
    base3?: string;
    base4?: string;
    base5?: string;
    base6?: string;
    base7?: string;
    base8?: string;
    base9?: string;
    base10?: string;
    page1?:string;
    page2?:string;
    page3?:string;
    page4?:string;
    page5?:string;
    page6?:string;
    page7?:string;
    page8?:string;
    route?:string;
    subMenus?: SubMenu2[];
    customSubmenuTwo?: boolean;
    subMenusTwo?: SubMenuTwo[];
  }

  export interface SubMenu2 {
    menuValue: string;
    route?: string;
    base?: string;
    base1?: string;
    base2?: string;
    base3?: string;
    hasSubRoute?: boolean;
    showSubRoute?: boolean;
    customSubmenuTwo?: boolean;
    subMenusTwo?: SubMenuTwo[];
    subMenus?:SubMenuTwo[];
    subMenus2?:Menu[];
  }

  export interface SubMenuTwo {
    menuValue: string;
    route: string;
    base?: string;
    base1?: string;
    base2?: string;
    base3?: string;
    page1?:string;
    page2?:string;
    page3?:string;
    page4?:string;
    page5?:string;
    page6?:string;
    page7?:string;
    page8?:string;
    hasSubRoute?: boolean;
    showSubRoute?: boolean;
    customSubmenuTwo?: boolean;
    
  }

