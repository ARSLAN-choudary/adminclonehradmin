import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { routes } from "../routes/routes";
import { HttpClient } from "@angular/common/http";
import { apiResultFormat } from "../model/pages.model";
import { MainMenu } from "../model/sidebar.model";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  private collapseSubject = new BehaviorSubject<boolean>(false);
  collapse$ = this.collapseSubject.asObservable();
  loaderState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  toggleCollapse() {
    this.collapseSubject.next(!this.collapseSubject.value);
  }

  getLoaderState() {
    return this.loaderState;
  }

  setLoaderState(state: boolean) {
    this.loaderState.next(state);
  }

  public getContactList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/contact-list.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCompaniesList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/companies-list.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getLanguageSetting(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/language-setting.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getFile(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/files.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCallHistory(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/call-history.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFileShared(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/file-shared.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLeadsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/leads.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDealsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/deals.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getLanguageSettingsWeb(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/language-settings-web.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getBlogCategories(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/blog-categories.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getBlogTags(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/blog-tags.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBlogComments(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/blog-comments.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getFaq(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/faq.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDataTable() {
    return this.http.get<apiResultFormat>("assets/json/data-tables.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTestimonials(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/testimonials.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCountries(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/countries.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStates(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/states.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCities(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/city.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSource(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/sources.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSuperAdminCompanies(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/superadmincompanies.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getLostReason(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/lost-reason.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getContactStage(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/contact-stage.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getIndustry(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/industry.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCalls(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/calls.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTaskReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/task.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getMembershipTransactions(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/membership-transactions.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getManageUsers(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/manage-users.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getNewApplication(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/new-application.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getRolesPermissions(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/roles-permissions.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDeleteRequest(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/delete-request.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getLeadReports(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/lead-reports.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDealReports(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/deal-reports.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getContactReports() {
    return this.http
      .get<apiResultFormat>("assets/json/contact-reports.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCompanyReports() {
    return this.http
      .get<apiResultFormat>("assets/json/companies-reports.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPages(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/pages.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getProjectLists(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/project-lists.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getActivitiesList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/activities-list.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getProjectReports(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/project-reports.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCompaignList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/campaign-list.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCompaignArchive(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/campaign-archive.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPipeline(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/pipeline.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActivityCalls(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/activity-calls.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getActivityMail(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/activity-mail.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getActivityMeeting(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/activity-meeting.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getActivityTask(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/activity-task.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCompaniesReports(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/companies-reports.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getPackage(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/package-list.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getSubscription(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/subscription.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPurchaseTransaction(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/purchase-transaction.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDomain(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/domain.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPackages(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/packages.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getCompanies(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/companies.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public sidebarData1: any[] = [
    {
      tittle: "Main MENU",
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      menu: [
        {
          menuValue: "Dashboard",
          hasSubRoute: true,
          showSubRoute: false,
          icon: "dashboard",
          base: "dashboard",
          subMenus: [
            {
              menuValue: "Deals Dashboard",
              base: "index",
              route: routes.index,
            },
            {
              menuValue: "Leads Dashboard",
              base: "lead-dashboard",
              route: routes.leadsDashboard,
            },
            {
              menuValue: "Project Dashboard",
              base: "project-dashboard",
              route: routes.projectDashboard,
            },
          ],
        },
        {
          menuValue: "Super Admin",
          hasSubRoute: true,
          showSubRoute: false,
          base: "super-admin",
          icon: "user-star",
          subMenus: [
            {
              menuValue: "Dashboard",
              route: routes.superAdminDash,
              base: "dashboard",
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Companies",
              route: routes.superAdminCompanies,
              base: "companies",
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Manage Users",
              route: routes.manageUsers,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
              base: "manage-users",
            },
            // {
            //   menuValue: "Subscription",
            //   hasSubRoute: false,
            //   showSubRoute: false,
            //   route: routes.superAdminSubscriptions,
            //   base: "subscriptions",
            //   customSubmenuTwo: false,
            //   subRoutes: [],
            // },
            // {
            //   menuValue: "Packages",
            //   hasSubRoute: false,
            //   showSubRoute: false,
            //   route: routes.superAdminPackages,
            //   base: "packages",
            //   customSubmenuTwo: false,
            //   subRoutes: [],
            // },
            // {
            //   menuValue: "Domain",
            //   hasSubRoute: false,
            //   showSubRoute: false,
            //   route: routes.superAdminDomain,
            //   base: "domain",
            //   customSubmenuTwo: false,
            //   subRoutes: [],
            // },
            // {
            //   menuValue: "Purchase Transaction",
            //   hasSubRoute: false,
            //   showSubRoute: false,
            //   route: routes.superAdminPurchaseTransaction,
            //   base: "purchase-transaction",
            //   customSubmenuTwo: false,
            //   subRoutes: [],
            // },
          ],
        },
        {
          menuValue: "Bolt Admin",
          hasSubRoute: true,
          showSubRoute: false,
          base: "bolt-admin",
          icon: "user-star",
          subMenus: [
            {
              menuValue: "Dashboard",
              route: routes.boltAdminDash,
              base: "dashboard",
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            // {
            //   menuValue: "Companies",
            //   route: routes.boltAdminCompanies,
            //   base: "companies",
            //   hasSubRoute: false,
            //   showSubRoute: false,
            //   customSubmenuTwo: false,
            // },


            {
              menuValue: "Fleet Orders",
              route: routes.boltAdminFleetOrders,
              base: "fleetOrders",
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Fleet State Logs",
              route: routes.boltAdminFleetStateLogs,
              base: "fleetStateLogs",
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Drivers",
              route: routes.boltAdminDrivers,
              base: "drivers",
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Vehicles",
              route: routes.boltAdminVehicles,
              base: "vehicles",
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
          ],
        },
        {
          menuValue: "Administration",
          hasSubRoute: true,
          showSubRoute: false,
          icon: "user-star",
          base: "administration",
          subMenus: [
            {
              menuValue: "New Application",
              base: "administratorApplication",
              route: routes.administratorApplication,
            },
          ],
        },
        // {
        //   menuValue: "Applications",
        //   hasSubRouteTwo: true,
        //   showSubRoute: false,
        //   base: "application",
        //   icon: "brand-airtable",
        //   subMenus: [
        //     {
        //       menuValue: "Chat",
        //       route: routes.chat,
        //       base: "chat",
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       customSubmenuTwo: false,
        //     },
        //     {
        //       menuValue: "Call",
        //       customSubmenuTwo: true,
        //       hasSubRoute: true,
        //       showSubRoute: false,
        //       subMenusTwo: [
        //         {
        //           menuValue: "Video Call",
        //           route: routes.videoCall,
        //           hasSubRoute: false,
        //           showSubRoute: false,
        //           base: "video-call",
        //         },
        //         {
        //           menuValue: "Audio Call",
        //           route: routes.audioCall,
        //           hasSubRoute: false,
        //           showSubRoute: false,
        //           base: "audio-call",
        //         },
        //         {
        //           menuValue: "Call History",
        //           route: routes.callHistory,
        //           hasSubRoute: false,
        //           showSubRoute: false,
        //           base: "call-history",
        //         },
        //       ],
        //     },
        //     {
        //       menuValue: "Calendar",
        //       route: routes.calendar,
        //       base: "calendar",
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       customSubmenuTwo: false,
        //     },
        //     {
        //       menuValue: "Email",
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       route: routes.email,
        //       base: "email",
        //       customSubmenuTwo: false,
        //       subRoutes: [],
        //     },
        //     {
        //       menuValue: "To Do",
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       base: "todo",
        //       route: routes.toDo,
        //       customSubmenuTwo: false,
        //       subRoutes: [],
        //     },
        //     {
        //       menuValue: "Notes",
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       route: routes.notes,
        //       base: "notes",
        //       customSubmenuTwo: false,
        //       subRoutes: [],
        //     },
        //     {
        //       menuValue: "File Manager",
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       route: routes.fileManager,
        //       base: "file-manager",
        //       customSubmenuTwo: false,
        //       subRoutes: [],
        //     },
        //     {
        //       menuValue: "Kanban",
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       route: routes.kanban,
        //       base: "kanban",
        //       customSubmenuTwo: false,
        //       subRoutes: [],
        //     },
        //     {
        //       menuValue: "Social Feed",
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       route: routes.socialFeed,
        //       base: "social-feed",
        //       customSubmenuTwo: false,
        //       subRoutes: [],
        //     },
        //     {
        //       menuValue: "Invoices",
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       route: routes.invoices,
        //       base: "invoices",
        //       customSubmenuTwo: false,
        //       subRoutes: [],
        //     },
        //   ],
        // },

        // {
        //   menuValue: "Layout",
        //   hasSubRoute: true,
        //   showSubRoute: false,
        //   icon: "layout-grid",
        //   base1: "layout",
        //   subMenus: [
        //     {
        //       menuValue: "Mini",
        //       route: routes.Mini,
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       base: "layout-mini",
        //       icon: "layout-navbar",
        //       materialicons: "confirmation_number",
        //       subMenus: [],
        //     },
        //     {
        //       menuValue: "Hover View",
        //       route: routes.hoverView,
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       icon: "layout-navbar-inactive",
        //       base: "layout-hoverview",
        //       materialicons: "shopping_bag",
        //       subMenus: [],
        //     },
        //     {
        //       menuValue: "Hidden",
        //       route: routes.hidden,
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       icon: "layout-sidebar",
        //       base: "layout-hidden",
        //       materialicons: "shopping_bag",
        //       subMenus: [],
        //     },
        //     {
        //       menuValue: "Full Width",
        //       route: routes.fullWidth,
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       icon: "layout-sidebar",
        //       base: "layout-fullwidth",
        //       materialicons: "shopping_bag",
        //       subMenus: [],
        //     },
        //     {
        //       menuValue: "RTL",
        //       route: routes.RTL,
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       icon: "text-direction-rtl",
        //       base: "layout-rtl",
        //       materialicons: "shopping_bag",
        //       subMenus: [],
        //     },

        //     {
        //       menuValue: "Dark",
        //       route: routes.Dark,
        //       hasSubRoute: false,
        //       showSubRoute: false,
        //       icon: "moon",
        //       base: "layout-dark",
        //       materialicons: "shopping_bag",
        //       subMenus: [],
        //     },
        //   ],
        // },
      ],
    },

    // {
    //   tittle: "Reports",
    //   showAsTab: true,
    //   separateRoute: false,
    //   menu: [
    //     {
    //       menuValue: "Reports",
    //       base: "reports",
    //       icon: "file-invoice",
    //       hasSubRoute: true,
    //       showSubRoute: false,
    //       subMenus: [
    //         {
    //           menuValue: "Lead Reports",
    //           icon: "package",
    //           route: routes.leadReports,
    //           base: "lead-reports",
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //         },
    //         {
    //           menuValue: "Deals Reports",
    //           icon: "clipboard",
    //           route: routes.dealReports,
    //           base: "deal-reports",
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //         },
    //         {
    //           menuValue: "Contact Reports",
    //           icon: "truck",
    //           route: routes.contactReports,
    //           base: "contact-reports",
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //         },
    //         {
    //           menuValue: "Company Reports",
    //           icon: "truck",
    //           route: routes.companyReports,
    //           base: "company-reports",
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //         },
    //         {
    //           menuValue: "Project Reports",
    //           icon: "truck",
    //           route: routes.projectReports,
    //           base: "project-reports",
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //         },
    //         {
    //           menuValue: "Task Reports",
    //           icon: "truck",
    //           route: routes.taskReports,
    //           base: "task-reports",
    //           hasSubRoute: false,
    //           showSubRoute: false,
    //         },
    //       ],
    //     },
    //   ],
    // },

    // {
    //   tittle: "USER MANAGEMENT",
    //   showAsTab: true,
    //   separateRoute: false,
    //   menu: [
    //     {
    //       menuValue: "Manage Users",
    //       icon: "users",
    //       route: routes.manageUsers,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       base: "manage-users",
    //     },
    //     {
    //       menuValue: "Roles & Permissions",
    //       icon: "user-shield",
    //       route: routes.rolesPermissions,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       base: "roles-permissions",
    //     },
    //     {
    //       menuValue: "Delete Request",
    //       icon: "flag-question",
    //       route: routes.deleteRequest,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       base: "delete-request",
    //     },
    //   ],
    // },

    // {
    //   tittle: "SUPPORT",
    //   showAsTab: true,
    //   separateRoute: false,
    //   menu: [
    //     {
    //       menuValue: "Contact Messages",
    //       icon: "message-check",
    //       route: routes.contactMessage,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       base: "contact-messages",
    //     },
    //     {
    //       menuValue: "Tickets",
    //       icon: "ticket",
    //       route: routes.tickets,
    //       hasSubRoute: false,
    //       showSubRoute: false,
    //       base: "tickets",
    //     },
    //   ],
    // },
  ];
  public videocall = [
    {
      img: "assets/img/users/user-01.jpg",
      name: "Barbara",
    },
    {
      img: "assets/img/users/user-02.jpg",
      name: "Linnea",
    },
    {
      img: "assets/img/users/user-05.jpg",
      name: "Richard",
    },
    {
      img: "assets/img/users/user-03.jpg",
      name: "Freda",
    },
  ];

  // public resetData3(): void {
  //   this.sideBar.map((res: SideBar) => {
  //     res.showAsTab = false;
  //     res.menu.map((menus: SideBarMenu) => {
  //       menus.showSubRoute = false;
  //     });
  //   });
  public getTickets(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/tickets.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getContactMessage(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/contact-messages.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getProposalsList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/proposals-list.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getProposalsView(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/proposal-view.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getContractList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/contract-list.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPaymentList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/payment-list.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEstimationList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>("assets/json/estimation-list.json")
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInvoiceList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>("assets/json/invoice-list.json").pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
}
