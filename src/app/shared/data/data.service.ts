import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { routes } from '../routes/routes';
import { HttpClient } from '@angular/common/http';
import { apiResultFormat } from '../model/pages.model';
import { MainMenu } from '../model/sidebar.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private collapseSubject = new BehaviorSubject<boolean>(false);
  collapse$ = this.collapseSubject.asObservable();

  toggleCollapse() {
    this.collapseSubject.next(!this.collapseSubject.value);
  }

  public getContactList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/contact-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCompaniesList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/companies-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getLanguageSetting(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/language-setting.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getFile(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/files.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCallHistory(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/call-history.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFileShared(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/file-shared.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLeadsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/leads.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDealsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/deals.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getLanguageSettingsWeb(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/language-settings-web.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getBlogCategories(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/blog-categories.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBlogTags(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/blog-tags.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBlogComments(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/blog-comments.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFaq(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/faq.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDataTable() {
    return this.http.get<apiResultFormat>('assets/json/data-tables.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTestimonials(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/testimonials.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCountries(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/countries.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStates(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/states.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCities(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/city.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSource(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/sources.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSuperAdminCompanies(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/superadmincompanies.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLostReason(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/lost-reason.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getContactStage(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/contact-stage.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getIndustry(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/industry.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCalls(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/calls.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTaskReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/task.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getMembershipTransactions(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/membership-transactions.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getManageUsers(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/manage-users.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  } public getNewApplication(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/new-application.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getRolesPermissions(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/roles-permissions.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDeleteRequest(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/delete-request.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getLeadReports(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/lead-reports.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDealReports(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/deal-reports.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
    public getContactReports() {
    return this.http
      .get<apiResultFormat>('assets/json/contact-reports.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
    public getCompanyReports() {
    return this.http
      .get<apiResultFormat>('assets/json/companies-reports.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPages(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/pages.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getProjectLists(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/project-lists.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getActivitiesList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/activities-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getProjectReports(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/project-reports.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCompaignList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/campaign-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCompaignArchive(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/campaign-archive.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPipeline(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/pipeline.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActivityCalls(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/activity-calls.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getActivityMail(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/activity-mail.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getActivityMeeting(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/activity-meeting.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getActivityTask(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/activity-task.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCompaniesReports(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/companies-reports.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getPackage(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/package-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getSubscription(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/subscription.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPurchaseTransaction(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/purchase-transaction.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDomain(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/domain.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPackages(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/packages.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getCompanies(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/companies.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public sidebarData1:any[] = [
    {
      tittle: 'Main MENU',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'dashboard',
          base: 'dashboard',
          subMenus: [
            {
              menuValue: 'Deals Dashboard',
              base: 'index',
              route: routes.index,
            },
            {
              menuValue: 'Leads Dashboard',
              base: 'lead-dashboard',
              route: routes.leadsDashboard,
            },
            {
              menuValue: 'Project Dashboard',
              base: 'project-dashboard',
              route: routes.projectDashboard,
            },
          ],
        }, {
          menuValue: 'Administration',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user-star',
          base: 'administration',
          subMenus: [
            {
              menuValue: 'New Application',
              base: 'administratorApplication',
              route: routes.administratorApplication,
            },
          ],
        },
        {
          menuValue: 'Applications',
          hasSubRouteTwo: true,
          showSubRoute: false,
          base: 'application',
          icon: 'brand-airtable',
          subMenus: [
            {
              menuValue: 'Chat',
              route: routes.chat,
              base:'chat',
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Call',
              customSubmenuTwo: true,
              hasSubRoute: true,
              showSubRoute: false,
              subMenusTwo: [
                {
                  menuValue: 'Video Call',
                  route: routes.videoCall,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'video-call',
                },
                {
                  menuValue: 'Audio Call',
                  route: routes.audioCall,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'audio-call',
                },
                {
                  menuValue: 'Call History',
                  route: routes.callHistory,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'call-history',
                },
              ],
            },
            {
              menuValue: 'Calendar',
              route: routes.calendar,
              base:'calendar',
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Email',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.email,
              base:'email',
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'To Do',
              hasSubRoute: false,
              showSubRoute: false,
              base:'todo',
              route: routes.toDo,
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'Notes',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.notes,
              base:'notes',
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'File Manager',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.fileManager,
              base:'file-manager',
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'Kanban',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.kanban,
              base:'kanban',
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'Social Feed',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.socialFeed,
              base:'social-feed',
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'Invoices',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.invoices,
              base:'invoices',
              customSubmenuTwo: false,
              subRoutes: [],
            },
          ],
        },
        {
          menuValue: 'Super Admin',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'super-admin',
          icon: 'user-star',
          subMenus: [
            {
              menuValue: 'Dashboard',
              route: routes.superAdminDash,
              base:'dashboard',
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Companies',
              route: routes.superAdminCompanies,
              base:'companies',
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Subscription',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.superAdminSubscriptions,
              base:'subscriptions',
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'Packages',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.superAdminPackages,
              base:'packages',
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'Domain',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.superAdminDomain,
              base:'domain',
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'Purchase Transaction',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.superAdminPurchaseTransaction,
              base:'purchase-transaction',
              customSubmenuTwo: false,
              subRoutes: [],
            },
          ],
        },
        {
        menuValue: 'Layout',
        hasSubRoute: true,
        showSubRoute: false,
        icon: 'layout-grid',
        base1: 'layout',
        subMenus: [
        {
          menuValue: 'Mini',
          route: routes.Mini,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'layout-mini',
          icon: 'layout-navbar',
          materialicons: 'confirmation_number',
          subMenus: [],
        },
        {
          menuValue: 'Hover View',
          route: routes.hoverView,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'layout-navbar-inactive',
          base: 'layout-hoverview',
          materialicons: 'shopping_bag',
          subMenus: [],
        },
        {
          menuValue: 'Hidden',
          route: routes.hidden,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'layout-sidebar',
          base: 'layout-hidden',
          materialicons: 'shopping_bag',
          subMenus: [],
        },
        {
          menuValue: 'Full Width',
          route: routes.fullWidth,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'layout-sidebar',
          base: 'layout-fullwidth',
          materialicons: 'shopping_bag',
          subMenus: [],
        },
        {
          menuValue: 'RTL',
          route: routes.RTL,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'text-direction-rtl',
          base: 'layout-rtl',
          materialicons: 'shopping_bag',
          subMenus: [],
        },
    
        {
          menuValue: 'Dark',
          route: routes.Dark,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'moon',
          base: 'layout-dark',
          materialicons: 'shopping_bag',
          subMenus: [],
        },
      ],
    },
      ],
    },
    
    {
      tittle: 'CRM',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Contacts',
          icon: 'user-up',
          route: routes.contactGrid,
          base: 'contacts',
          hasSubRoute: false,
          showSubRoute: false,
        },
        {
          menuValue: 'Companies',
          icon: 'building-community',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.companiesGrid,
          base: 'companies',
          subRoutes: [],
        },
        {
          menuValue: 'Deals',
          icon: 'medal',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.dealsKanban,
          base: 'deals',
          subRoutes: [],
        },
        {
          menuValue: 'Leads',
          icon: 'chart-arcs',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.leadsKanban,
          base: 'leads',
          subRoutes: [],
        },
        {
          menuValue: 'Pipeline',
          icon: 'timeline-event-exclamation',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.pipeline,
          base: 'pipeline',
          subRoutes: [],
        },
        {
          menuValue: 'Campaign',
          icon: 'brand-campaignmonitor',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.campaignList,
          base: 'campaign',
          subRoutes: [],
        },
        {
          menuValue: 'Projects',
          icon: 'atom-2',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.projectGrid,
          base: 'projects',
          subRoutes: [],
        },
        {
          menuValue: 'Tasks',
          icon: 'list-check',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.allTasks,
          base: 'tasks',
          subRoutes: [],
        },
        {
          menuValue: 'Proposals',
          icon: 'file-star',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.proposalsGrid,
          base: 'proposals',
          subRoutes: [],
        },
        {
          menuValue: 'Contracts',
          icon: 'file-check',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.contractGrid,
          base: 'contracts',
          subRoutes: [],
        },
        {
          menuValue: 'Estimations',
          icon: 'file-report',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.estimationKanban,
          base: 'estimations',
          subRoutes: [],
        },
        {
          menuValue: 'Invoices',
          icon: 'file-invoice',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.invoiceGrid,
          base: 'invoice',
          subRoutes: [],
        },
        {
          menuValue: 'Payments',
          icon: 'report-money',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.payments,
          base: 'payments',
          subRoutes: [],
        },
        {
          menuValue: 'Analytics',
          icon: 'chart-bar',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.analytics,
          base: 'analytics',
          subRoutes: [],
        },
        {
          menuValue: 'Activities',
          icon: 'bounce-right',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.activitiesList,
          base: 'activities',
          subRoutes: [],
        },
      ],
    },
    {
      tittle: 'Reports',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Reports',
          base: 'reports',
          icon: 'file-invoice',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Lead Reports',
              icon: 'package',
              route: routes.leadReports,
              base:'lead-reports',
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Deals Reports',
              icon: 'clipboard',
              route: routes.dealReports,
              base:'deal-reports',
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Contact Reports',
              icon: 'truck',
              route: routes.contactReports,
              base:'contact-reports',
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Company Reports',
              icon: 'truck',
              route: routes.companyReports,
              base:'company-reports',
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Project Reports',
              icon: 'truck',
              route: routes.projectReports,
              base:'project-reports',
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Task Reports',
              icon: 'truck',
              route: routes.taskReports,
              base:'task-reports',
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
      ],
    },

    {
      tittle: 'CRM SETTINGS',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Sources',
          icon: 'artboard',
          route: routes.source,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'sources',
        },
        {
          menuValue: 'Lost Reason',
          icon: 'message-exclamation',
          route: routes.LostReason,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'lost-reason',
        },
        {
          menuValue: 'Contact Stage',
          icon: 'steam',
          route: routes.contactStage,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'contact-stage',
        },
        {
          menuValue: 'Industry',
          icon: 'building-factory',
          route: routes.industry,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'industry',
        },
        {
          menuValue: 'Calls',
          icon: 'phone-check',
          route: routes.calls,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'calls',
        },
      ],
    },

    {
      tittle: 'USER MANAGEMENT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Manage Users',
          icon: 'users',
          route: routes.manageUsers,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'manage-users',
        },
        {
          menuValue: 'Roles & Permissions',
          icon: 'user-shield',
          route: routes.rolesPermissions,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'roles-permissions',
        },
        {
          menuValue: 'Delete Request',
          icon: 'flag-question',
          route: routes.deleteRequest,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'delete-request',
        },
      ],
    },
    {
      tittle: 'MEMBERSHIP',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Membership',
          base: 'membership',
          icon: 'brand-apple-podcast',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Membership Plans',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.membershipPlans,
              base:'membership-plans',
            },
            {
              menuValue: 'Membership Addons',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.membershipAddons,
               base:'membership-addons',
            },
            {
              menuValue: 'Transactions',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.membershipTransactions,
               base:'membership-transactions',
            },
          ],
        },
      ],
    },
    {
      tittle: 'CONTENT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Pages',
          base: 'pages',
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.pages,
        },
        {
          menuValue: 'Blogs',
          base: 'blogs',
          icon: 'brand-blogger',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'All Blogs',
              route: routes.blogList,
              base:'blog-list',
            },
            {
              menuValue: 'Blog Categories',
              route: routes.blogCategories,
              base:'blog-categories',
            },
            {
              menuValue: 'Blog Comments',
              route: routes.blogComments,
              base:'blog-comments',
            },
            {
              menuValue: 'Blog Tags',
              route: routes.blogTags,
              base:'blog-tags',
            },
          ],
        },
        {
          menuValue: 'Location',
          base: 'location',
          icon: 'map-pin-pin',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Countries',
              route: routes.countries,
              base:'countries',
            },
            {
              menuValue: 'States',
              route: routes.states,
              base:'states',
            },
            {
              menuValue: 'Cities',
              route: routes.cities,
              base:'cities',
            },
          ],
        },
        {
          menuValue: 'Testimonials',
          base: 'testimonials',
          icon: 'quote',
          route: routes.testimonials,
          hasSubRoute: false,
          showSubRoute: false,
        },
        {
          menuValue: 'FAQ',
          base: 'faq',
          icon: 'question-mark',
          route: routes.faq,
          hasSubRoute: false,
          showSubRoute: false,
        },
      ],
    },
    {
      tittle: 'SUPPORT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Contact Messages',
          icon: 'message-check',
          route: routes.contactMessage,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'contact-messages',
        },
        {
          menuValue: 'Tickets',
          icon: 'ticket',
          route: routes.tickets,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'tickets',
        },
      ],
    },
    {
      tittle: 'Settings',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'General Settings',
          icon: 'settings-cog',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'general-settings',
          subMenus: [
            {
              menuValue: 'Profile',
              route: routes.profileSettings,
              hasSubRoute: false,
              showSubRoute: false,
              base:'profile-settings'
            },
            {
              menuValue: 'Security',
              route: routes.securitySettings,
              hasSubRoute: false,
              showSubRoute: false,
               base:'security-settings'
            },
            {
              menuValue: 'Notifications',
              route: routes.settingsNotification,
              hasSubRoute: false,
              showSubRoute: false,
               base:'notifications-settings'
            },
            {
              menuValue: 'Connected Apps',
              route: routes.connectedApps,
              hasSubRoute: false,
              showSubRoute: false,
               base:'connected-apps'
            },
          ],
        },
        {
          menuValue: 'Website Settings',
          page: 'website-settings',
          icon: 'world-cog',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Company Settings',
              route: routes.companySettings,
              hasSubRoute: false,
              showSubRoute: false,
              base:'company-settings',
            },
            {
              menuValue: 'Localization',
              route: routes.localizationSettings,
              hasSubRoute: false,
              showSubRoute: false,
              base:'localization-settings',
            },
            {
              menuValue: 'Prefixes',
              route: routes.prefixes,
              hasSubRoute: false,
              showSubRoute: false,
               base:'prefixes-settings',
              
            },
            {
              menuValue: 'Preference',
              route: routes.preference,
              hasSubRoute: false,
              showSubRoute: false,
               base:'preference-settings',
            },
            {
              menuValue: 'Appearance',
              route: routes.appearance,
              hasSubRoute: false,
              showSubRoute: false,
               base:'appearance-settings',
            },
            {
              menuValue: 'Language',
              route: routes.languageSettings,
              hasSubRoute: false,
              showSubRoute: false,
               base:'language-settings',
            },
          ],
        },
        {
          menuValue: 'App Settings',
          page: 'app-settings',
          icon: 'apps',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'app-settings',
          subMenus: [
            {
              menuValue: 'Invoice Settings',
              route: routes.invoiceSettings,
              hasSubRoute: false,
              showSubRoute: false,
               base:'invoice-settings',
            },
            {
              menuValue: 'Printers',
              route: routes.printerSettings,
              hasSubRoute: false,
              showSubRoute: false,
               base:'printers-settings',
            },

            {
              menuValue: 'Custom Fields',
              route: routes.customFields,
              hasSubRoute: false,
              showSubRoute: false,
               base:'custom-fields-setting',
            },
          ],
        },
        {
          menuValue: 'System Settings',
          page: 'system-settings',
          icon: 'device-laptop',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Email Settings',
              route: routes.emailSettings,
              hasSubRoute: false,
              showSubRoute: false,
               base:'email-settings',
            },
            {
              menuValue: 'SMS Gateways',
              route: routes.smsGateway,
              hasSubRoute: false,
              showSubRoute: false,
               base:'sms-gateways',
            },
            {
              menuValue: 'GDPR Cookies',
              route: routes.gdprSettings,
              hasSubRoute: false,
              showSubRoute: false,
               base:'gdpr-cookies',
            },
          ],
        },
        {
          menuValue: 'Financial Settings',
          page: 'financial-settings',
          icon: 'moneybag',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Payment Gateways',
              route: routes.paymentGatewaySettings,
              hasSubRoute: false,
              showSubRoute: false,
               base:'payment-gateways',
            },
            {
              menuValue: 'Bank Accounts',
              route: routes.bankAccounts,
              hasSubRoute: false,
              showSubRoute: false,
               base:'bank-accounts',
            },
            {
              menuValue: 'Tax Rates',
              route: routes.taxRates,
              hasSubRoute: false,
              showSubRoute: false,
               base:'tax-rates',
            },
            {
              menuValue: 'Currencies',
              route: routes.currencySettings,
              hasSubRoute: false,
              showSubRoute: false,
               base:'currencies',
            },
          ],
        },
        {
          menuValue: 'Other Settings',
          page: 'other-settings',
          icon: 'settings-2',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Sitemap',
              route: routes.siteMap,
              hasSubRoute: false,
              showSubRoute: false,
               base:'sitemap',
            },
            {
              menuValue: 'Clear Cache',
              route: routes.clearCache,
              hasSubRoute: false,
              showSubRoute: false,
               base:'clear-cache',
            },
            {
              menuValue: 'Storage',
              route: routes.storage,
              hasSubRoute: false,
              showSubRoute: false,
               base:'storage',
            },
            {
              menuValue: 'Cronjob',
              route: routes.cronJob,
              hasSubRoute: false,
              showSubRoute: false,
               base:'cronjob',
            },
            {
              menuValue: 'Ban Ip Address',
              route: routes.banIpAddress,
              hasSubRoute: false,
              showSubRoute: false,
               base:'ban-ip-address',
            },
            {
              menuValue: 'System Backup',
              route: routes.systemBackup,
              hasSubRoute: false,
              showSubRoute: false,
               base:'system-backup',
            },
            {
              menuValue: 'Database Backup',
              route: routes.databaseBackup,
              hasSubRoute: false,
              showSubRoute: false,
               base:'database-backup',
            },
            {
              menuValue: 'System Update',
              route: routes.systemUpdate,
              hasSubRoute: false,
              showSubRoute: false,
               base:'system-update',
            },
          ],
        },
      ],
    },
    {
      tittle: 'Pages',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Authentication',
          icon: 'lock-square-rounded',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Login',
              route: routes.login,
              base:'login'
            },
            {
              menuValue: 'Register',
              route: routes.register,
              base:'register'
            },
            {
              menuValue: 'Forgot Password',
              route: routes.forgotPassword,
              base:'forgot-password'
            },
            {
              menuValue: 'Reset Password',
              route: routes.resetPassword,
              base:'reset-password'
            },
            {
              menuValue: 'Email Verification',
              route: routes.emailVerification,
              base:'email-verification'
            },
            {
              menuValue: '2 Step Verification',
              route: routes.twoStepVerfication,
              base:'two-step-verification'
            },
            {
              menuValue: 'Lock Screen',
              route: routes.lockScreen,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
              base:'lock-screen'
            },
          ],
        },
        {
          menuValue: 'Error Pages',
          icon: 'error-404',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: '404 Error',
              route: routes.error404,
              hasSubRoute: false,
              showSubRoute: false,
              base:'error-404'
            },
            {
              menuValue: '500 Error',
              route: routes.error500,
              hasSubRoute: false,
              showSubRoute: false,
              base:'error-500'
            },
          ],
        },
        {
          menuValue: 'Blank Page',
          icon: 'file',
          route: routes.blank,
          hasSubRoute: false,
          showSubRoute: false,
          base:'blank'
        },
        {
          menuValue: 'Coming Soon',
          icon: 'inner-shadow-top-right',
          route: routes.comingSoon,
          hasSubRoute: false,
          showSubRoute: false,
          base:'coming-soon'
        },
        {
          menuValue: 'Under Maintenance',
          icon: 'info-triangle',
          route: routes.underMaintenance,
          hasSubRoute: false,
          showSubRoute: false,
          base:'under-maintenance'
        },
      ],
    },
    {
      tittle: 'UI Interface',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Base UI',
          base: 'base-ui',
          icon: 'hierarchy',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
  {
    menuValue: 'Accordion',
    route: routes.uiAccordion,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-accordion',
  },
  {
    menuValue: 'Alerts',
    route: routes.uiAlerts,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-alerts',
  },
  {
    menuValue: 'Avatar',
    route: routes.uiAvatar,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-avatar',
  },
  {
    menuValue: 'Badges',
    route: routes.uiBadges,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-badges',
  },
  {
    menuValue: 'Breadcrumb',
    route: routes.uiBreadcrumb,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-breadcrumb',
  },
  {
    menuValue: 'Buttons',
    route: routes.uiButtons,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-buttons',
  },
  {
    menuValue: 'Button Group',
    route: routes.uiButtonsGroup,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-buttons-group',
  },
  {
    menuValue: 'Card',
    route: routes.uiCards,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-cards',
  },
  {
    menuValue: 'Carousel',
    route: routes.uiCarousel,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-carousel',
  },
  {
    menuValue: 'Collapse',
    route: routes.uiCollapse,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-collapse',
  },
  {
    menuValue: 'Dropdowns',
    route: routes.uiDropdowns,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-dropdowns',
  },

  {
    menuValue: 'Grid',
    route: routes.uiGrid,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-grid',
  },
  {
    menuValue: 'Images',
    route: routes.uiImages,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-images',
  },
  {
    menuValue: 'Links',
    route: routes.uiLinks,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-links',
  },
  {
    menuValue: 'List Group',
    route: routes.uiListGroup,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-list-group',
  },
  {
    menuValue: 'Modals',
    route: routes.uiModals,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-modals',
  },
  {
    menuValue: 'Offcanvas',
    route: routes.uiOffcanvas,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-offcanvas',
  },
  {
    menuValue: 'Pagination',
    route: routes.uiPagination,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-pagination',
  },
  {
    menuValue: 'Placeholders',
    route: routes.uiPlaceholders,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-placeholders',
  },
  {
    menuValue: 'Progress',
    route: routes.uiProgress,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-progress',
  },
  {
    menuValue: 'Spinner',
    route: routes.uiSpinner,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-spinner',
  },
  {
    menuValue: 'Tabs',
    route: routes.uiNavTabs,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-nav-tabs',
  },
  {
    menuValue: 'Toasts',
    route: routes.uiToasts,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-toasts',
  },
  {
    menuValue: 'Tooltips',
    route: routes.uiTooltips,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-tooltips',
  },
  {
    menuValue: 'Typography',
    route: routes.uiTypography,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-typography',
  },
  {
    menuValue: 'Utilities',
    route: routes.uiUtilities,
    hasSubRoute: false,
    showSubRoute: false,
    base: 'ui-utilities',
  },
]

        },
        {
          menuValue: 'Advanced UI',
          base: 'advanced-ui',
          icon: 'whirl',
          hasSubRoute: true,
          showSubRoute: false,
         subMenus: [
            {
              menuValue: 'Clipboard',
              route: routes.clipboard,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'ui-clipboard',
            },
            {
              menuValue: 'Drag & Drop',
              route: routes.dragDrop,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'ui-drag-drop',
            },
            {
              menuValue: 'Rating',
              route: routes.rating,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'ui-rating',
            },
            {
              menuValue: 'Text Editor',
              route: routes.textEditor,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'ui-text-editor',
            },
            {
              menuValue: 'Range Slider',
              route: routes.uiRangeSlider,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'ui-rangeslider',
            },
            {
              menuValue: 'Counter',
              route: routes.counter,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'ui-counter',
            },
            {
              menuValue: 'Lightbox',
              route: routes.uiLightbox,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'ui-lightbox',
            },
            {
              menuValue: 'Scrollbar',
              route: routes.scrollbar,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'ui-scrollbar',
            },
          ]
        },
        {
          menuValue: 'Forms',
          icon: 'forms',
          base: 'forms',
          hasSubRouteTwo: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Form Elements',
              page1: 'form-basic-inputs',
              page2: 'form-checkbox-radios',
              page3: 'form-input-groups',
              page4: 'form-grid-gutters',
              page5: 'form-select',
              page6: 'form-mask',
              page7: 'form-fileupload',
              page8: 'form-elements',
              customSubmenuTwo: true,
              hasSubRoute: true,
              showSubRoute: false,
              subMenusTwo: [
                {
                  menuValue: 'Basic Inputs',
                  route: routes.formBasicInputs,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'form-basic-inputs',
                },
                {
                  menuValue: 'Checkbox & Radios',
                  route: routes.formCheckboxRadios,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'form-checkbox-radios',
                },
                {
                  menuValue: 'Input Groups',
                  route: routes.formInputsGroups,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'form-inputs-groups',
                },
                {
                  menuValue: 'Grid & Gutters',
                  route: routes.formGridGutters,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'form-grid-gutters',
                },
                {
                  menuValue: 'Form Select',
                  route: routes.formSelect,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'form-select',
                },
                {
                  menuValue: 'Input Masks',
                  route: routes.formMask,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'form-mask',
                },
                {
                  menuValue: 'File Uploads',
                  route: routes.formFileUpload,
                  hasSubRoute: false,
                  showSubRoute: false,
                  base: 'form-file-upload',
                },
              ]
            },
            {
              menuValue: 'Layouts',
              customSubmenuTwo: true,
              page1: 'form-horizontal',
              page2: 'form-vertical',
              page3: 'form-floating-labels',
              hasSubRoute: true,
              showSubRoute: false,
              subMenusTwo: [
                  {
                    menuValue: 'Horizontal Form',
                    route: routes.formHorizontal,
                    hasSubRoute: false,
                    showSubRoute: false,
                    base: 'form-horizontal',
                  },
                  {
                    menuValue: 'Vertical Form',
                    route: routes.formVertical,
                    hasSubRoute: false,
                    showSubRoute: false,
                    base: 'form-vertical',
                  },
                  {
                    menuValue: 'Floating Labels',
                    route: routes.formFloatingLabels,
                    hasSubRoute: false,
                    showSubRoute: false,
                    base: 'form-floating-labels',
                  },
                ]
            },
            {
              menuValue: 'Form Validation',
              route: routes.formValidation,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
              base: 'form-validation',
            },
            {
              menuValue: 'Mat Select',
              route: routes.formSelect2,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
              base: 'form-select-2',
            },
            {
              menuValue: 'Form Wizard',
              route: routes.formWizard,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
              base: 'form-wizard',
            },
            {
              menuValue: 'Form Pickers',
              route: routes.formPickers,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
              base: 'form-pickers',
            },

          ],
        },
        {
          menuValue: 'Tables',
          icon: 'table',
          base: 'table',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Basic Tables',
              route: routes.basicTable,
              hasSubRoute: false,
              showSubRoute: false,
              base:'basic-tables'
            },
            {
              menuValue: 'Data Table',
              route: routes.dataTable,
              hasSubRoute: false,
              showSubRoute: false,
              base:'data-tables'
            },
          ],
        },
        {
          menuValue: 'Charts',
          icon: 'chart-pie-3',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'charts',
          subMenus: [
            {
              menuValue: 'Apex Charts',
              route: routes.chartApex,
              hasSubRoute: false,
              showSubRoute: false,
              base:'apex-charts'
            },
            {
              menuValue: 'Prime NG Charts',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.chartPrime,
              base:'prime-ng',
              subRoutes: [],
            },
          ],
        },
        {
          menuValue: 'Icons',
          icon: 'icons',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'icons',
         subMenus: [
            {
              menuValue: 'Fontawesome Icons',
              route: routes.iconFontAwesome,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-fontawesome',
            },
            {
              menuValue: 'Feather Icons',
              route: routes.iconFeather,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-feather',
            },
            {
              menuValue: 'Ionic Icons',
              route: routes.iconIonic,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-ionic',
            },
            {
              menuValue: 'Material Icons',
              route: routes.iconMaterial,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-material',
            },
            {
              menuValue: 'Pe7 Icons',
              route: routes.iconPe7,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-pe7',
            },
            {
              menuValue: 'Simpleline Icons',
              route: routes.iconSimpleline,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-simpleline',
            },
            {
              menuValue: 'Themify Icons',
              route: routes.iconThemify,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-themify',
            },
            {
              menuValue: 'Weather Icons',
              route: routes.iconWeather,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-weather',
            },
            {
              menuValue: 'Typicon Icons',
              route: routes.iconTypicon,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-typicon',
            },
            {
              menuValue: 'Flag Icons',
              route: routes.iconFlag,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-flag',
            },
            {
              menuValue: 'Bootstrap Icons',
              route: routes.bootstrap,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-bootstrap',
            },
            {
              menuValue: 'Tabler Icons',
              route: routes.tabler,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-tabler',
            },
            {
              menuValue: 'Remix Icons',
              route: routes.remix,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'icon-remix',
            },
          ]

        },
        {
          menuValue: 'Maps',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'map-star',
          base: 'maps',
          materialicons: 'people',
          subMenus: [
            {
              menuValue: 'Leaflets',
              route: routes.leaflet,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'leaflet',
            },
          ],
        },
      ],
    },

  ];
  public videocall = [
    {
      img: 'assets/img/users/user-01.jpg',
      name: 'Barbara',
    },
    {
      img: 'assets/img/users/user-02.jpg',
      name: 'Linnea',
    },
    {
      img: 'assets/img/users/user-05.jpg',
      name: 'Richard',
    },
    {
      img: 'assets/img/users/user-03.jpg',
      name: 'Freda',
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
    return this.http.get<apiResultFormat>('assets/json/tickets.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getContactMessage(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/contact-messages.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getProposalsList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/proposals-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getProposalsView(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/proposal-view.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getContractList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/contract-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPaymentList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/payment-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEstimationList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/estimation-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInvoiceList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoice-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
}
