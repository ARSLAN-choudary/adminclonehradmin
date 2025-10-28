import { Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { LoginComponent } from "./auth/login/login.component";
import { authGuard, loginRedirectGuard } from "./Services/auth.guard";
import { BoltAdminComponent } from "./features/main-menu/bolt-admin/bolt-admin/bolt-admin.component";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./auth/auth.component").then((m) => m.AuthComponent),
    children: [
      {
        path: "",
        redirectTo: "app-register",
        pathMatch: "full",
      },
      {
        path: "login",
        loadComponent: () =>
          import("./auth/login/login.component").then(
            (m) => m.LoginComponent
          ),
        canActivate: [loginRedirectGuard],
      },
      {
        path: "app-register",
        loadComponent: () =>
          import("./auth/app-register/app-register.component").then(
            (m) => m.AppRegisterComponent
          ),
      },
      {
        path: "forgot-password",
        loadComponent: () =>
          import("./auth/forgot-password/forgot-password.component").then(
            (m) => m.ForgotPasswordComponent
          ),
      },
      {
        path: "email-verification",
        loadComponent: () =>
          import("./auth/email-verification/email-verification.component").then(
            (m) => m.EmailVerificationComponent
          ),
      },
      {
        path: "waiting-for-approval",
        loadComponent: () =>
          import("./auth/waiting-approval/waiting-approval.component").then(
            (m) => m.TwoStepVerificationComponent
          ),
      },

      {
        path: "two-step-verification",
        loadComponent: () =>
          import("./auth/two-step-verification/two-step-verification.component").then(
            (m) => m.TwoStepVerificationComponent
          ),
      },
      
      {
        path: "reset-password",
        loadComponent: () =>
          import("./auth/reset-password/reset-password.component").then(
            (m) => m.ResetPasswordComponent
          ),
      },
      {
        path: "success",
        loadComponent: () =>
          import("./auth/success/success.component").then(
            (m) => m.SuccessComponent
          ),
      },
      {
        path: "register",
        loadComponent: () =>
          import("./auth/register/register.component").then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: "lock-screen",
        loadComponent: () =>
          import("./auth/lock-screen/lock-screen.component").then(
            (m) => m.LockScreenComponent
          ),
      },
    ],
  },
  //Error
  {
    path: "error",
    loadComponent: () =>
      import("./error/error.component").then((m) => m.ErrorComponent),
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./error/error-404/error-404.component").then(
            (m) => m.Error404Component
          ),
      },
      {
        path: "error-404",
        loadComponent: () =>
          import("./error/error-404/error-404.component").then(
            (m) => m.Error404Component
          ),
      },
      {
        path: "error-500",
        loadComponent: () =>
          import("./error/error-500/error-500.component").then(
            (m) => m.Error500Component
          ),
      },
    ],
  },

  {
    path: "",
    loadComponent: () =>
      import("./features/features.component").then((m) => m.FeaturesComponent),
    canActivate: [authGuard],
    children: [
      {
        path: "index",
        loadComponent: () =>
          import(
            "./features/main-menu/dashboards/deals-dashboard/deals-dashboard.component"
          ).then((m) => m.DealsDashboardComponent),
      },
      {
        path: "lead-dashboard",
        loadComponent: () =>
          import(
            "./features/main-menu/dashboards/lead-dashboard/lead-dashboard.component"
          ).then((m) => m.LeadDashboardComponent),
      },
      {
        path: "project-dashboard",
        loadComponent: () =>
          import(
            "./features/main-menu/dashboards/project-dashboard/project-dashboard.component"
          ).then((m) => m.ProjectDashboardComponent),
      },

      {
        path: "new-application",
        loadComponent: () =>
          import("./features/new-application/new-application.component").then(
            (m) => m.NewApplicationComponent
          ),
        children: [
          {
            path: "new-application",
            loadComponent: () =>
              import(
                "./features/new-application/new-application.component"
              ).then((m) => m.NewApplicationComponent),
          },
        ],
      },
      //Application
      {
        path: "application",
        loadComponent: () =>
          import("./features/main-menu/application/application.component").then(
            (m) => m.ApplicationComponent
          ),
        children: [
          {
            path: "chat",
            loadComponent: () =>
              import(
                "./features/main-menu/application/chat/chat.component"
              ).then((m) => m.ChatComponent),
          },
          {
            path: "calendar",
            loadComponent: () =>
              import(
                "./features/main-menu/application/calendar/calendar.component"
              ).then((m) => m.CalendarComponent),
          },
          {
            path: "email",
            loadComponent: () =>
              import(
                "./features/main-menu/application/email-reply/email-reply.component"
              ).then((m) => m.EmailReplyComponent),
          },
          {
            path: "email-reply",
            loadComponent: () =>
              import(
                "./features/main-menu/application/email/email.component"
              ).then((m) => m.EmailComponent),
          },
          {
            path: "file-manager",
            loadComponent: () =>
              import(
                "./features/main-menu/application/file-manager/file-manager.component"
              ).then((m) => m.FileManagerComponent),
          },
          {
            path: "todo",
            loadComponent: () =>
              import(
                "./features/main-menu/application/todo/todo.component"
              ).then((m) => m.TodoComponent),
          },
          {
            path: "todo-list",
            loadComponent: () =>
              import(
                "./features/main-menu/application/todo-list/todo-list.component"
              ).then((m) => m.TodoListComponent),
          },
          {
            path: "notes",
            loadComponent: () =>
              import(
                "./features/main-menu/application/notes/notes.component"
              ).then((m) => m.NotesComponent),
          },
          {
            path: "social-feed",
            loadComponent: () =>
              import(
                "./features/main-menu/application/social-feed/social-feed.component"
              ).then((m) => m.SocialFeedComponent),
          },
          {
            path: "invoices",
            loadComponent: () =>
              import(
                "./features/main-menu/application/invoices/invoices.component"
              ).then((m) => m.InvoicesComponent),
          },
          {
            path: "add-invoices",
            loadComponent: () =>
              import(
                "./features/main-menu/application/add-invoices/add-invoices.component"
              ).then((m) => m.AddInvoicesComponent),
          },
          {
            path: "edit-invoices",
            loadComponent: () =>
              import(
                "./features/main-menu/application/edit-invoices/edit-invoices.component"
              ).then((m) => m.EditInvoicesComponent),
          },
          {
            path: "invoice-details",
            loadComponent: () =>
              import(
                "./features/main-menu/application/invoice-details/invoice-details.component"
              ).then((m) => m.InvoiceDetailsComponent),
          },
          {
            path: "kanban",
            loadComponent: () =>
              import(
                "./features/main-menu/application/kanban/kanban.component"
              ).then((m) => m.KanbanComponent),
          },

          {
            path: "video-call",
            loadComponent: () =>
              import(
                "./features/main-menu/application/call/video-call/video-call.component"
              ).then((m) => m.VideoCallComponent),
          },
          {
            path: "audio-call",
            loadComponent: () =>
              import(
                "./features/main-menu/application/call/audio-call/audio-call.component"
              ).then((m) => m.AudioCallComponent),
          },
          {
            path: "call-history",
            loadComponent: () =>
              import(
                "./features/main-menu/application/call/call-history/call-history.component"
              ).then((m) => m.CallHistoryComponent),
          },
        ],
      },
      //Super admin
      {
        path: "super-admin",
        loadComponent: () =>
          import("./features/main-menu/super-admin/super-admin.component").then(
            (m) => m.SuperAdminComponent
          ),
        children: [
          {
            path: "dashboard",
            loadComponent: () =>
              import(
                "./features/main-menu/super-admin/dashboard/dashboard.component"
              ).then((m) => m.DashboardComponent),
          },
          {
            path: "companies",
            loadComponent: () =>
              import(
                "./features/main-menu/super-admin/companies/companies.component"
              ).then((m) => m.CompaniesComponent),
          },
          {
            path: "subscriptions",
            loadComponent: () =>
              import(
                "./features/main-menu/super-admin/subscriptions/subscriptions.component"
              ).then((m) => m.SubscriptionsComponent),
          },
          {
            path: "purchase-transaction",
            loadComponent: () =>
              import(
                "./features/main-menu/super-admin/purchase-transaction/purchase-transaction.component"
              ).then((m) => m.PurchaseTransactionComponent),
          },
          {
            path: "domain",
            loadComponent: () =>
              import(
                "./features/main-menu/super-admin/domain/domain.component"
              ).then((m) => m.DomainComponent),
          },
          {
            path: "packages",
            loadComponent: () =>
              import(
                "./features/main-menu/super-admin/packages/packages.component"
              ).then((m) => m.PackagesComponent),
          },
        ],
      },

      {
        path: "bolt-admin",

        loadComponent: () =>
          import(
            "./features/main-menu/bolt-admin/bolt-admin/bolt-admin.component"
          ).then((m) => m.BoltAdminComponent),
        children: [
          {
            path: "dashboard",
            loadComponent: () =>
              import(
                "./features/main-menu/bolt-admin/dashboard/dashboard.component"
              ).then((m) => m.DashboardComponent),
          },
          {
            path: "companies",
            loadComponent: () =>
              import(
                "./features/main-menu/bolt-admin/companies/companies.component"
              ).then((m) => m.CompaniesComponent),
          },
          {
            path: "fleet-orders",
            loadComponent: () =>
              import(
                "./features/main-menu/bolt-admin/fleet-orders/fleet-orders.component"
              ).then((m) => m.FleetOrdersComponent),
          },
          {
            path: "fleet-state-logs",
            loadComponent: () =>
              import(
                "./features/main-menu/bolt-admin/fleet-state-logs/fleet-state-logs.component"
              ).then((m) => m.FleetStateLogsComponent),
          },
          {
            path: "drivers",
            loadComponent: () =>
              import(
                "./features/main-menu/bolt-admin/drivers/drivers.component"
              ).then((m) => m.DriversComponent),
          },
          {
            path: "vehicles",
            loadComponent: () =>
              import(
                "./features/main-menu/bolt-admin/vehicles/vehicles.component"
              ).then((m) => m.VehiclesComponent),
          },
        ],
      },

      //CRM
      {
        path: "contacts",
        loadComponent: () =>
          import("./features/crm/contacts/contacts.component").then(
            (m) => m.ContactsComponent
          ),
        children: [
          {
            path: "contact-list",
            loadComponent: () =>
              import(
                "./features/crm/contacts/contact-list/contact-list.component"
              ).then((m) => m.ContactListComponent),
          },
          {
            path: "contact-grid",
            loadComponent: () =>
              import(
                "./features/crm/contacts/contact-grid/contact-grid.component"
              ).then((m) => m.ContactGridComponent),
          },
          {
            path: "contact-details",
            loadComponent: () =>
              import(
                "./features/crm/contacts/contact-details/contact-details.component"
              ).then((m) => m.ContactDetailsComponent),
          },
        ],
      },
      {
        path: "companies",
        loadComponent: () =>
          import("./features/crm/companies/companies.component").then(
            (m) => m.CompaniesComponent
          ),
        children: [
          {
            path: "companies-list",
            loadComponent: () =>
              import(
                "./features/crm/companies/companies-list/companies-list.component"
              ).then((m) => m.CompaniesListComponent),
          },
          {
            path: "companies-grid",
            loadComponent: () =>
              import(
                "./features/crm/companies/companies-grid/companies-grid.component"
              ).then((m) => m.CompaniesGridComponent),
          },
          {
            path: "companies-details",
            loadComponent: () =>
              import(
                "./features/crm/companies/companies-details/companies-details.component"
              ).then((m) => m.CompaniesDetailsComponent),
          },
        ],
      },
      {
        path: "deals",
        loadComponent: () =>
          import("./features/crm/deals/deals.component").then(
            (m) => m.DealsComponent
          ),
        children: [
          {
            path: "deals-list",
            loadComponent: () =>
              import(
                "./features/crm/deals/deals-list/deals-list.component"
              ).then((m) => m.DealsListComponent),
          },
          {
            path: "deals-kanban",
            loadComponent: () =>
              import(
                "./features/crm/deals/deals-kanban/deals-kanban.component"
              ).then((m) => m.DealsKanbanComponent),
          },
          {
            path: "deals-details",
            loadComponent: () =>
              import(
                "./features/crm/deals/deals-details/deals-details.component"
              ).then((m) => m.DealsDetailsComponent),
          },
        ],
      },
      {
        path: "leads",
        loadComponent: () =>
          import("./features/crm/leads/leads.component").then(
            (m) => m.LeadsComponent
          ),
        children: [
          {
            path: "leads-list",
            loadComponent: () =>
              import(
                "./features/crm/leads/leads-list/leads-list.component"
              ).then((m) => m.LeadsListComponent),
          },
          {
            path: "leads-kanban",
            loadComponent: () =>
              import(
                "./features/crm/leads/leads-kanban/leads-kanban.component"
              ).then((m) => m.LeadsKanbanComponent),
          },
          {
            path: "leads-details",
            loadComponent: () =>
              import(
                "./features/crm/leads/leads-details/leads-details.component"
              ).then((m) => m.LeadsDetailsComponent),
          },
        ],
      },
      {
        path: "activities",
        loadComponent: () =>
          import("./features/crm/activities/activities.component").then(
            (m) => m.ActivitiesComponent
          ),
        children: [
          {
            path: "activities-list",
            loadComponent: () =>
              import(
                "./features/crm/activities/activities-list/activities-list.component"
              ).then((m) => m.ActivitiesListComponent),
          },
          {
            path: "activity-calls",
            loadComponent: () =>
              import(
                "./features/crm/activities/activity-calls/activity-calls.component"
              ).then((m) => m.ActivityCallsComponent),
          },
          {
            path: "activity-mail",
            loadComponent: () =>
              import(
                "./features/crm/activities/activity-mail/activity-mail.component"
              ).then((m) => m.ActivityMailComponent),
          },
          {
            path: "activity-meeting",
            loadComponent: () =>
              import(
                "./features/crm/activities/activity-meeting/activity-meeting.component"
              ).then((m) => m.ActivityMeetingComponent),
          },
          {
            path: "activity-task",
            loadComponent: () =>
              import(
                "./features/crm/activities/activity-task/activity-task.component"
              ).then((m) => m.ActivityTaskComponent),
          },
        ],
      },
      {
        path: "campaign",
        loadComponent: () =>
          import("./features/crm/campaign/campaign.component").then(
            (m) => m.CampaignComponent
          ),
        children: [
          {
            path: "campaign-list",
            loadComponent: () =>
              import(
                "./features/crm/campaign/campaign-list/campaign-list.component"
              ).then((m) => m.CampaignListComponent),
          },
          {
            path: "campaign-archieve",
            loadComponent: () =>
              import(
                "./features/crm/campaign/campaign-archieve/campaign-archieve.component"
              ).then((m) => m.CampaignArchieveComponent),
          },
          {
            path: "campaign-complete",
            loadComponent: () =>
              import(
                "./features/crm/campaign/campaign-complete/campaign-complete.component"
              ).then((m) => m.CampaignCompleteComponent),
          },
        ],
      },
      {
        path: "contracts",
        loadComponent: () =>
          import("./features/crm/contracts/contracts.component").then(
            (m) => m.ContractsComponent
          ),
        children: [
          {
            path: "contracts-list",
            loadComponent: () =>
              import(
                "./features/crm/contracts/contracts-list/contracts-list.component"
              ).then((m) => m.ContractsListComponent),
          },
          {
            path: "contracts-grid",
            loadComponent: () =>
              import(
                "./features/crm/contracts/contracts-grid/contracts-grid.component"
              ).then((m) => m.ContractsGridComponent),
          },
        ],
      },
      {
        path: "estimations",
        loadComponent: () =>
          import("./features/crm/estimations/estimations.component").then(
            (m) => m.EstimationsComponent
          ),
        children: [
          {
            path: "estimations-list",
            loadComponent: () =>
              import(
                "./features/crm/estimations/estimation-list/estimation-list.component"
              ).then((m) => m.EstimationListComponent),
          },
          {
            path: "estimations-kanban",
            loadComponent: () =>
              import(
                "./features/crm/estimations/estimations-kanban/estimations-kanban.component"
              ).then((m) => m.EstimationsKanbanComponent),
          },
        ],
      },
      {
        path: "invoice",
        loadComponent: () =>
          import("./features/crm/invoice/invoice.component").then(
            (m) => m.InvoiceComponent
          ),
        children: [
          {
            path: "invoice-list",
            loadComponent: () =>
              import(
                "./features/crm/invoice/invoice-list/invoice-list.component"
              ).then((m) => m.InvoiceListComponent),
          },
          {
            path: "invoice-grid",
            loadComponent: () =>
              import(
                "./features/crm/invoice/invoice-grid/invoice-grid.component"
              ).then((m) => m.InvoiceGridComponent),
          },
          {
            path: "invoice-details",
            loadComponent: () =>
              import(
                "./features/crm/invoice/invoice-details/invoice-details.component"
              ).then((m) => m.InvoiceDetailsComponent),
          },
        ],
      },
      {
        path: "projects",
        loadComponent: () =>
          import("./features/crm/projects/projects.component").then(
            (m) => m.ProjectsComponent
          ),
        children: [
          {
            path: "project-list",
            loadComponent: () =>
              import(
                "./features/crm/projects/project-list/project-list.component"
              ).then((m) => m.ProjectListComponent),
          },
          {
            path: "project-grid",
            loadComponent: () =>
              import(
                "./features/crm/projects/project-grid/project-grid.component"
              ).then((m) => m.ProjectGridComponent),
          },
          {
            path: "project-details",
            loadComponent: () =>
              import(
                "./features/crm/projects/project-details/project-details.component"
              ).then((m) => m.ProjectDetailsComponent),
          },
        ],
      },
      {
        path: "tasks",
        loadComponent: () =>
          import("./features/crm/tasks/tasks.component").then(
            (m) => m.TasksComponent
          ),
        children: [
          {
            path: "all-tasks",
            loadComponent: () =>
              import("./features/crm/tasks/all-tasks/all-tasks.component").then(
                (m) => m.AllTasksComponent
              ),
          },
          {
            path: "tasks-completed",
            loadComponent: () =>
              import(
                "./features/crm/tasks/tasks-completed/tasks-completed.component"
              ).then((m) => m.TasksCompletedComponent),
          },
          {
            path: "tasks-important",
            loadComponent: () =>
              import(
                "./features/crm/tasks/tasks-important/tasks-important.component"
              ).then((m) => m.TasksImportantComponent),
          },
        ],
      },
      {
        path: "analytics",
        loadComponent: () =>
          import("./features/crm/analytics/analytics.component").then(
            (m) => m.AnalyticsComponent
          ),
      },
      {
        path: "pipeline",
        loadComponent: () =>
          import("./features/crm/pipeline/pipeline.component").then(
            (m) => m.PipelineComponent
          ),
      },
      {
        path: "payments",
        loadComponent: () =>
          import("./features/crm/payments/payments.component").then(
            (m) => m.PaymentsComponent
          ),
      },
      {
        path: "proposals",
        loadComponent: () =>
          import("./features/crm/proposals/proposals.component").then(
            (m) => m.ProposalsComponent
          ),
        children: [
          {
            path: "proposals-list",
            loadComponent: () =>
              import(
                "./features/crm/proposals/proposals-list/proposals-list.component"
              ).then((m) => m.ProposalsListComponent),
          },
          {
            path: "proposals-grid",
            loadComponent: () =>
              import(
                "./features/crm/proposals/proposals-grid/proposals-grid.component"
              ).then((m) => m.ProposalsGridComponent),
          },
        ],
      },

      //Crm Settings
      {
        path: "sources",
        loadComponent: () =>
          import("./features/crmsettings/sources/sources.component").then(
            (m) => m.SourcesComponent
          ),
      },
      {
        path: "lost-reason",
        loadComponent: () =>
          import(
            "./features/crmsettings/lost-reason/lost-reason.component"
          ).then((m) => m.LostReasonComponent),
      },
      {
        path: "industry",
        loadComponent: () =>
          import("./features/crmsettings/industry/industry.component").then(
            (m) => m.IndustryComponent
          ),
      },
      {
        path: "contact-stage",
        loadComponent: () =>
          import(
            "./features/crmsettings/contact-stage/contact-stage.component"
          ).then((m) => m.ContactStageComponent),
      },
      {
        path: "calls",
        loadComponent: () =>
          import("./features/crmsettings/calls/calls.component").then(
            (m) => m.CallsComponent
          ),
      },
      {
        path: "manage-users",
        loadComponent: () =>
          import(
            "./features/user-management/manage-users/manage-users.component"
          ).then((m) => m.ManageUsersComponent),
      },
      {
        path: "roles-permissions",
        loadComponent: () =>
          import(
            "./features/user-management/roles-permissions/roles-permissions.component"
          ).then((m) => m.RolesPermissionsComponent),
      },
      {
        path: "permission",
        loadComponent: () =>
          import(
            "./features/user-management/permissions/permissions.component"
          ).then((m) => m.PermissionsComponent),
      },
      {
        path: "delete-request",
        loadComponent: () =>
          import(
            "./features/user-management/delete-request/delete-request.component"
          ).then((m) => m.DeleteRequestComponent),
      },
      {
        path: "membership",
        loadComponent: () =>
          import("./features/membership/membership.component").then(
            (m) => m.MembershipComponent
          ),
        children: [
          {
            path: "membership-transactions",
            loadComponent: () =>
              import(
                "./features/membership/membership-transactions/membership-transactions.component"
              ).then((m) => m.MembershipTransactionsComponent),
          },
          {
            path: "membership-plans",
            loadComponent: () =>
              import(
                "./features/membership/membership-plans/membership-plans.component"
              ).then((m) => m.MembershipPlansComponent),
          },
          {
            path: "membership-addons",
            loadComponent: () =>
              import(
                "./features/membership/membership-addons/membership-addons.component"
              ).then((m) => m.MembershipAddonsComponent),
          },
        ],
      },
      {
        path: "reports",
        loadComponent: () =>
          import("./features/reports/reports.component").then(
            (m) => m.ReportsComponent
          ),
        children: [
          {
            path: "lead-reports",
            loadComponent: () =>
              import(
                "./features/reports/lead-reports/lead-reports.component"
              ).then((m) => m.LeadReportsComponent),
          },
          {
            path: "deal-reports",
            loadComponent: () =>
              import(
                "./features/reports/deal-reports/deal-reports.component"
              ).then((m) => m.DealReportsComponent),
          },
          {
            path: "company-reports",
            loadComponent: () =>
              import(
                "./features/reports/company-reports/company-reports.component"
              ).then((m) => m.CompanyReportsComponent),
          },
          {
            path: "contact-reports",
            loadComponent: () =>
              import(
                "./features/reports/contact-reports/contact-reports.component"
              ).then((m) => m.ContactReportsComponent),
          },
          {
            path: "project-reports",
            loadComponent: () =>
              import(
                "./features/reports/project-reports/project-reports.component"
              ).then((m) => m.ProjectReportsComponent),
          },
          {
            path: "task-reports",
            loadComponent: () =>
              import(
                "./features/reports/task-reports/task-reports.component"
              ).then((m) => m.TaskReportsComponent),
          },
        ],
      },
      {
        path: "pages",
        loadComponent: () =>
          import("./features/content/pages/pages.component").then(
            (m) => m.PagesComponent
          ),
      },
      {
        path: "add-page",
        loadComponent: () =>
          import("./features/content/add-page/add-page.component").then(
            (m) => m.AddPageComponent
          ),
      },
      {
        path: "edit-page",
        loadComponent: () =>
          import("./features/content/edit-page/edit-page.component").then(
            (m) => m.EditPageComponent
          ),
      },
      {
        path: "testimonials",
        loadComponent: () =>
          import("./features/content/testimonials/testimonials.component").then(
            (m) => m.TestimonialsComponent
          ),
      },
      {
        path: "faq",
        loadComponent: () =>
          import("./features/content/faq/faq.component").then(
            (m) => m.FaqComponent
          ),
      },
      {
        path: "blogs",
        loadComponent: () =>
          import("./features/content/blogs/blogs.component").then(
            (m) => m.BlogsComponent
          ),
        children: [
          {
            path: "blog-list",
            loadComponent: () =>
              import(
                "./features/content/blogs/blog-list/blog-list.component"
              ).then((m) => m.BlogListComponent),
          },
          {
            path: "add-blog",
            loadComponent: () =>
              import(
                "./features/content/blogs/add-blog/add-blog.component"
              ).then((m) => m.AddBlogComponent),
          },
          {
            path: "edit-blog",
            loadComponent: () =>
              import(
                "./features/content/blogs/edit-blog/edit-blog.component"
              ).then((m) => m.EditBlogComponent),
          },
          {
            path: "blog-categories",
            loadComponent: () =>
              import(
                "./features/content/blogs/blog-categories/blog-categories.component"
              ).then((m) => m.BlogCategoriesComponent),
          },
          {
            path: "blog-tags",
            loadComponent: () =>
              import(
                "./features/content/blogs/blog-tags/blog-tags.component"
              ).then((m) => m.BlogTagsComponent),
          },
          {
            path: "blog-comments",
            loadComponent: () =>
              import(
                "./features/content/blogs/blog-comments/blog-comments.component"
              ).then((m) => m.BlogCommentsComponent),
          },
          {
            path: "blog-details",
            loadComponent: () =>
              import(
                "./features/content/blogs/blog-details/blog-details.component"
              ).then((m) => m.BlogDetailsComponent),
          },
        ],
      },
      {
        path: "location",
        loadComponent: () =>
          import("./features/content/locations/locations.component").then(
            (m) => m.LocationsComponent
          ),
        children: [
          {
            path: "countries",
            loadComponent: () =>
              import(
                "./features/content/locations/countries/countries.component"
              ).then((m) => m.CountriesComponent),
          },
          {
            path: "states",
            loadComponent: () =>
              import(
                "./features/content/locations/states/states.component"
              ).then((m) => m.StatesComponent),
          },
          {
            path: "cities",
            loadComponent: () =>
              import(
                "./features/content/locations/cities/cities.component"
              ).then((m) => m.CitiesComponent),
          },
        ],
      },
      {
        path: "base-ui",
        loadComponent: () =>
          import("./features/ui-interface/base-ui/base-ui.component").then(
            (m) => m.BaseUiComponent
          ),
        children: [
          {
            path: "ui-spinner",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-spinner/ui-spinner.component"
              ).then((m) => m.UiSpinnerComponent),
          },

          {
            path: "ui-progress",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-progress/ui-progress.component"
              ).then((m) => m.UiProgressComponent),
          },
          {
            path: "ui-video",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-video/ui-video.component"
              ).then((m) => m.UiVideoComponent),
          },
          {
            path: "ui-typography",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-typography/ui-typography.component"
              ).then((m) => m.UiTypographyComponent),
          },
          {
            path: "ui-carousel",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-carousel/ui-carousel.component"
              ).then((m) => m.UiCarouselComponent),
          },
          {
            path: "ui-collapse",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-collapse/ui-collapse.component"
              ).then((m) => m.UiCollapseComponent),
          },
          {
            path: "ui-cards",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-cards/ui-cards.component"
              ).then((m) => m.UiCardsComponent),
          },
          {
            path: "ui-buttons-group",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-buttons-group/ui-buttons-group.component"
              ).then((m) => m.UiButtonsGroupComponent),
          },
          {
            path: "ui-buttons",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-buttons/ui-buttons.component"
              ).then((m) => m.UiButtonsComponent),
          },
          {
            path: "ui-breadcrumb",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-breadcrumb/ui-breadcrumb.component"
              ).then((m) => m.UiBreadcrumbComponent),
          },

          {
            path: "ui-badges",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-badges/ui-badges.component"
              ).then((m) => m.UiBadgesComponent),
          },
          {
            path: "ui-accordion",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-accordion/ui-accordion.component"
              ).then((m) => m.UiAccordionComponent),
          },
          {
            path: "ui-alerts",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-alerts/ui-alerts.component"
              ).then((m) => m.UiAlertsComponent),
          },
          {
            path: "ui-avatar",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-avatar/ui-avatar.component"
              ).then((m) => m.UiAvatarComponent),
          },
          {
            path: "ui-popovers",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-popovers/ui-popovers.component"
              ).then((m) => m.UiPopoversComponent),
          },
          {
            path: "ui-placeholders",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-placeholders/ui-placeholders.component"
              ).then((m) => m.UiPlaceholdersComponent),
          },
          {
            path: "ui-pagination",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-pagination/ui-pagination.component"
              ).then((m) => m.UiPaginationComponent),
          },
          {
            path: "ui-offcanvas",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-offcanvas/ui-offcanvas.component"
              ).then((m) => m.UiOffcanvasComponent),
          },
          {
            path: "ui-nav-tabs",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-nav-tabs/ui-nav-tabs.component"
              ).then((m) => m.UiNavTabsComponent),
          },
          {
            path: "ui-modals",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-modals/ui-modals.component"
              ).then((m) => m.UiModalsComponent),
          },

          {
            path: "ui-links",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-links/ui-links.component"
              ).then((m) => m.UiLinksComponent),
          },
          {
            path: "ui-list-group",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-list-group/ui-list-group.component"
              ).then((m) => m.UiListGroupComponent),
          },
          {
            path: "ui-utilities",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-utilities/ui-utilities.component"
              ).then((m) => m.UiUtilitiesComponent),
          },

          {
            path: "ui-images",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-images/ui-images.component"
              ).then((m) => m.UiImagesComponent),
          },
          {
            path: "ui-grid",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-grid/ui-grid.component"
              ).then((m) => m.UiGridComponent),
          },
          {
            path: "ui-tooltips",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-tooltips/ui-tooltips.component"
              ).then((m) => m.UiTooltipsComponent),
          },
          {
            path: "ui-toasts",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-toasts/ui-toasts.component"
              ).then((m) => m.UiToastsComponent),
          },
          {
            path: "ui-dropdowns",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-dropdowns/ui-dropdowns.component"
              ).then((m) => m.UiDropdownsComponent),
          },

          {
            path: "ui-colors",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-colors/ui-colors.component"
              ).then((m) => m.UiColorsComponent),
          },
          {
            path: "ui-sortable",
            loadComponent: () =>
              import(
                "./features/ui-interface/base-ui/ui-sortable/ui-sortable.component"
              ).then((m) => m.UiSortableComponent),
          },
        ],
      },
      //advanced ui
      {
        path: "advanced-ui",
        loadComponent: () =>
          import(
            "./features/ui-interface/advanced-ui/advanced-ui.component"
          ).then((m) => m.AdvancedUiComponent),
        children: [
          {
            path: "ui-rangeslider",
            loadComponent: () =>
              import(
                "./features/ui-interface/advanced-ui/ui-rangeslider/ui-rangeslider.component"
              ).then((m) => m.UiRangesliderComponent),
          },
          {
            path: "ui-timeline",
            loadComponent: () =>
              import(
                "./features/ui-interface/advanced-ui/ui-timeline/ui-timeline.component"
              ).then((c) => c.UiTimelineComponent),
          },
          {
            path: "ui-text-editor",
            loadComponent: () =>
              import(
                "./features/ui-interface/advanced-ui/ui-text-editor/ui-text-editor.component"
              ).then((c) => c.UiTextEditorComponent),
          },
          {
            path: "ui-lightbox",
            loadComponent: () =>
              import(
                "./features/ui-interface/advanced-ui/ui-lightbox/ui-lightbox.component"
              ).then((m) => m.UiLightboxComponent),
          },
          {
            path: "ui-scrollbar",
            loadComponent: () =>
              import(
                "./features/ui-interface/advanced-ui/ui-scrollbar/ui-scrollbar.component"
              ).then((c) => c.UiScrollbarComponent),
          },
          {
            path: "ui-ribbon",
            loadComponent: () =>
              import(
                "./features/ui-interface/advanced-ui/ui-ribbon/ui-ribbon.component"
              ).then((c) => c.UiRibbonComponent),
          },
          {
            path: "ui-rating",
            loadComponent: () =>
              import(
                "./features/ui-interface/advanced-ui/ui-rating/ui-rating.component"
              ).then((c) => c.UiRatingComponent),
          },
          {
            path: "ui-drag-drop",
            loadComponent: () =>
              import(
                "./features/ui-interface/advanced-ui/ui-drag-drop/ui-drag-drop.component"
              ).then((c) => c.UiDragDropComponent),
          },
          {
            path: "ui-counter",
            loadComponent: () =>
              import(
                "./features/ui-interface/advanced-ui/ui-counter/ui-counter.component"
              ).then((c) => c.UiCounterComponent),
          },
          {
            path: "ui-clipboard",
            loadComponent: () =>
              import(
                "./features/ui-interface/advanced-ui/ui-clipboard/ui-clipboard.component"
              ).then((c) => c.UiClipboardComponent),
          },
          {
            path: "ui-stickynote",
            loadComponent: () =>
              import(
                "./features/ui-interface/advanced-ui/ui-stickynote/ui-stickynote.component"
              ).then((c) => c.UiStickynoteComponent),
          },
        ],
      },
      //Forms
      {
        path: "forms",
        loadComponent: () =>
          import("./features/ui-interface/forms/forms.component").then(
            (m) => m.FormsComponent
          ),
        children: [
          {
            path: "form-basic-inputs",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/form-elements/form-basic-inputs/form-basic-inputs.component"
              ).then((m) => m.FormBasicInputsComponent),
          },
          {
            path: "form-checkbox-radios",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/form-elements/form-checkbox-radios/form-checkbox-radios.component"
              ).then((m) => m.FormCheckboxRadiosComponent),
          },
          {
            path: "form-grid-gutters",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/form-elements/form-grid-gutters/form-grid-gutters.component"
              ).then((m) => m.FormGridGuttersComponent),
          },
          {
            path: "form-fileupload",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/form-elements/form-fileupload/form-fileupload.component"
              ).then((m) => m.FormFileuploadComponent),
          },
          {
            path: "form-input-groups",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/form-elements/form-input-groups/form-input-groups.component"
              ).then((m) => m.FormInputGroupsComponent),
          },
          {
            path: "form-select",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/form-elements/form-select/form-select.component"
              ).then((m) => m.FormSelectComponent),
          },
          {
            path: "form-select-2",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/form-select-2/form-select-2.component"
              ).then((m) => m.FormSelect2Component),
          },
          {
            path: "form-mask",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/form-elements/form-mask/form-mask.component"
              ).then((m) => m.FormMaskComponent),
          },
          {
            path: "form-floating-labels",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/layouts/form-floating-labels/form-floating-labels.component"
              ).then((m) => m.FormFloatingLabelsComponent),
          },
          {
            path: "form-horizontal",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/layouts/form-horizontal/form-horizontal.component"
              ).then((m) => m.FormHorizontalComponent),
          },
          {
            path: "form-vertical",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/layouts/form-vertical/form-vertical.component"
              ).then((m) => m.FormVerticalComponent),
          },
          {
            path: "form-validation",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/form-validation/form-validation.component"
              ).then((m) => m.FormValidationComponent),
          },
          {
            path: "form-wizard",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/form-wizard/form-wizard.component"
              ).then((m) => m.FormWizardComponent),
          },
          {
            path: "form-pickers",
            loadComponent: () =>
              import(
                "./features/ui-interface/forms/form-pickers/form-pickers.component"
              ).then((m) => m.FormPickersComponent),
          },
        ],
      },
      //Tables
      {
        path: "table",
        loadComponent: () =>
          import("./features/ui-interface/table/table.component").then(
            (m) => m.TableComponent
          ),
        children: [
          {
            path: "tables-basic",
            loadComponent: () =>
              import(
                "./features/ui-interface/table/tables-basic/tables-basic.component"
              ).then((m) => m.TablesBasicComponent),
          },
          {
            path: "data-tables",
            loadComponent: () =>
              import(
                "./features/ui-interface/table/data-tables/data-tables.component"
              ).then((m) => m.DataTablesComponent),
          },
        ],
      },
      //Icon
      {
        path: "icons",
        loadComponent: () =>
          import("./features/ui-interface/icons/icons.component").then(
            (m) => m.IconsComponent
          ),
        children: [
          {
            path: "icon-fontawesome",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-fontawesome/icon-fontawesome.component"
              ).then((m) => m.IconFontawesomeComponent),
          },
          {
            path: "icon-feather",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-feather/icon-feather.component"
              ).then((m) => m.IconFeatherComponent),
          },
          {
            path: "icon-ionic",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-ionic/icon-ionic.component"
              ).then((m) => m.IconIonicComponent),
          },
          {
            path: "icon-material",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-material/icon-material.component"
              ).then((m) => m.IconMaterialComponent),
          },
          {
            path: "icon-pe7",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-pe7/icon-pe7.component"
              ).then((m) => m.IconPe7Component),
          },
          {
            path: "icon-simpleline",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-simpleline/icon-simpleline.component"
              ).then((m) => m.IconSimplelineComponent),
          },
          {
            path: "icon-themify",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-themify/icon-themify.component"
              ).then((m) => m.IconThemifyComponent),
          },
          {
            path: "icon-weather",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-weather/icon-weather.component"
              ).then((m) => m.IconWeatherComponent),
          },
          {
            path: "icon-typicon",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-typicon/icon-typicon.component"
              ).then((m) => m.IconTypiconComponent),
          },
          {
            path: "icon-flag",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-flag/icon-flag.component"
              ).then((m) => m.IconFlagComponent),
          },
          {
            path: "icon-bootstrap",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-bootstrap/icon-bootstrap.component"
              ).then((m) => m.IconBootstrapComponent),
          },
          {
            path: "icon-remix",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-remix/icon-remix.component"
              ).then((m) => m.IconRemixComponent),
          },
          {
            path: "icon-tabler",
            loadComponent: () =>
              import(
                "./features/ui-interface/icons/icon-tabler/icon-tabler.component"
              ).then((m) => m.IconTablerComponent),
          },
        ],
      },
      //Charts
      {
        path: "charts",
        loadComponent: () =>
          import("./features/ui-interface/charts/charts.component").then(
            (m) => m.ChartsComponent
          ),
        children: [
          {
            path: "prime-ng",
            loadComponent: () =>
              import(
                "./features/ui-interface/charts/prime-ng/prime-ng.component"
              ).then((m) => m.PrimeNgComponent),
          },
          {
            path: "apex-charts",
            loadComponent: () =>
              import(
                "./features/ui-interface/charts/chart-apex/chart-apex.component"
              ).then((m) => m.ChartApexComponent),
          },
        ],
      },
      //Maps
      {
        path: "maps",
        loadComponent: () =>
          import("./features/ui-interface/maps/maps.component").then(
            (m) => m.MapsComponent
          ),
        children: [
          {
            path: "leaflet",
            loadComponent: () =>
              import(
                "./features/ui-interface/maps/leaflet/leaflet.component"
              ).then((m) => m.LeafletComponent),
          },
        ],
      },
      {
        path: "contact-messages",
        loadComponent: () =>
          import(
            "./features/support/contact-messages/contact-messages.component"
          ).then((m) => m.ContactMessagesComponent),
      },
      {
        path: "blank",
        loadComponent: () =>
          import("./features/pages/blank/blank.component").then(
            (m) => m.BlankComponent
          ),
      },
      {
        path: "notifications",
        loadComponent: () =>
          import("./features/pages/notifications/notifications.component").then(
            (m) => m.NotificationsComponent
          ),
      },
      {
        path: "tickets",
        loadComponent: () =>
          import("./features/support/tickets/tickets.component").then(
            (m) => m.TicketsComponent
          ),
      },
      {
        path: "ticket-details",
        loadComponent: () =>
          import(
            "./features/support/ticket-details/ticket-details.component"
          ).then((m) => m.TicketDetailsComponent),
      },
      {
        path: "settings",
        loadComponent: () =>
          import("./features/settings/settings.component").then(
            (m) => m.SettingsComponent
          ),
        children: [
          {
            path: "profile-settings",
            loadComponent: () =>
              import(
                "./features/settings/general-settings/profile-settings/profile-settings.component"
              ).then((m) => m.ProfileSettingsComponent),
          },
          {
            path: "security-settings",
            loadComponent: () =>
              import(
                "./features/settings/general-settings/security-settings/security-settings.component"
              ).then((m) => m.SecuritySettingsComponent),
          },
          {
            path: "notifications-settings",
            loadComponent: () =>
              import(
                "./features/settings/general-settings/notifications-settings/notifications-settings.component"
              ).then((m) => m.NotificationsSettingsComponent),
          },
          {
            path: "connected-apps",
            loadComponent: () =>
              import(
                "./features/settings/general-settings/connected-apps/connected-apps.component"
              ).then((m) => m.ConnectedAppsComponent),
          },
          {
            path: "company-settings",
            loadComponent: () =>
              import(
                "./features/settings/website-settings/company-settings/company-settings.component"
              ).then((m) => m.CompanySettingsComponent),
          },
          {
            path: "localization-settings",
            loadComponent: () =>
              import(
                "./features/settings/website-settings/localization-settings/localization-settings.component"
              ).then((m) => m.LocalizationSettingsComponent),
          },
          {
            path: "preference-settings",
            loadComponent: () =>
              import(
                "./features/settings/website-settings/preference-settings/preference-settings.component"
              ).then((m) => m.PreferenceSettingsComponent),
          },
          {
            path: "prefixes-settings",
            loadComponent: () =>
              import(
                "./features/settings/website-settings/prefixes-settings/prefixes-settings.component"
              ).then((m) => m.PrefixesSettingsComponent),
          },
          {
            path: "appearance-settings",
            loadComponent: () =>
              import(
                "./features/settings/website-settings/appearance-settings/appearance-settings.component"
              ).then((m) => m.AppearanceSettingsComponent),
          },
          {
            path: "language-settings",
            loadComponent: () =>
              import(
                "./features/settings/website-settings/language-settings/language-settings.component"
              ).then((m) => m.LanguageSettingsComponent),
          },
          {
            path: "language-web",
            loadComponent: () =>
              import(
                "./features/settings/website-settings/language-web/language-web.component"
              ).then((m) => m.LanguageWebComponent),
          },
          {
            path: "language-web-edit",
            loadComponent: () =>
              import(
                "./features/settings/website-settings/language-web-edit/language-web-edit.component"
              ).then((m) => m.LanguageWebEditComponent),
          },
          {
            path: "invoice-settings",
            loadComponent: () =>
              import(
                "./features/settings/app-settings/invoice-settings/invoice-settings.component"
              ).then((m) => m.InvoiceSettingsComponent),
          },
          {
            path: "printers-settings",
            loadComponent: () =>
              import(
                "./features/settings/app-settings/printers-settings/printers-settings.component"
              ).then((m) => m.PrintersSettingsComponent),
          },
          {
            path: "custom-fields-setting",
            loadComponent: () =>
              import(
                "./features/settings/app-settings/custom-fields-setting/custom-fields-setting.component"
              ).then((m) => m.CustomFieldsSettingComponent),
          },
          {
            path: "email-settings",
            loadComponent: () =>
              import(
                "./features/settings/system-settings/email-settings/email-settings.component"
              ).then((m) => m.EmailSettingsComponent),
          },
          {
            path: "sms-gateways",
            loadComponent: () =>
              import(
                "./features/settings/system-settings/sms-gateways/sms-gateways.component"
              ).then((m) => m.SmsGatewaysComponent),
          },
          {
            path: "gdpr-cookies",
            loadComponent: () =>
              import(
                "./features/settings/system-settings/gdpr-cookies/gdpr-cookies.component"
              ).then((m) => m.GdprCookiesComponent),
          },
          {
            path: "payment-gateways",
            loadComponent: () =>
              import(
                "./features/settings/financial-settings/payment-gateways/payment-gateways.component"
              ).then((m) => m.PaymentGatewaysComponent),
          },
          {
            path: "bank-accounts",
            loadComponent: () =>
              import(
                "./features/settings/financial-settings/bank-accounts/bank-accounts.component"
              ).then((m) => m.BankAccountsComponent),
          },
          {
            path: "tax-rates",
            loadComponent: () =>
              import(
                "./features/settings/financial-settings/tax-rates/tax-rates.component"
              ).then((m) => m.TaxRatesComponent),
          },
          {
            path: "currencies",
            loadComponent: () =>
              import(
                "./features/settings/financial-settings/currencies/currencies.component"
              ).then((m) => m.CurrenciesComponent),
          },
          {
            path: "sitemap",
            loadComponent: () =>
              import(
                "./features/settings/others-settings/sitemap/sitemap.component"
              ).then((m) => m.SitemapComponent),
          },
          {
            path: "clear-cache",
            loadComponent: () =>
              import(
                "./features/settings/others-settings/clear-cache/clear-cache.component"
              ).then((m) => m.ClearCacheComponent),
          },
          {
            path: "storage",
            loadComponent: () =>
              import(
                "./features/settings/others-settings/storage/storage.component"
              ).then((m) => m.StorageComponent),
          },
          {
            path: "cronjob",
            loadComponent: () =>
              import(
                "./features/settings/others-settings/cronjob/cronjob.component"
              ).then((m) => m.CronjobComponent),
          },
          {
            path: "ban-ip-address",
            loadComponent: () =>
              import(
                "./features/settings/others-settings/ban-ip-address/ban-ip-address.component"
              ).then((m) => m.BanIpAddressComponent),
          },
          {
            path: "system-backup",
            loadComponent: () =>
              import(
                "./features/settings/others-settings/system-backup/system-backup.component"
              ).then((m) => m.SystemBackupComponent),
          },
          {
            path: "database-backup",
            loadComponent: () =>
              import(
                "./features/settings/others-settings/database-backup/database-backup.component"
              ).then((m) => m.DatabaseBackupComponent),
          },
          {
            path: "system-update",
            loadComponent: () =>
              import(
                "./features/settings/others-settings/system-update/system-update.component"
              ).then((m) => m.SystemUpdateComponent),
          },
        ],
      },
      //layout
      {
        path: "layout-mini",
        loadComponent: () =>
          import(
            "./features/main-menu/dashboards/modal-dashboard/modal-dashboard.component"
          ).then((m) => m.ModalDashboardComponent),
      },
      {
        path: "layout-hoverview",
        loadComponent: () =>
          import(
            "./features/main-menu/dashboards/modal-dashboard/modal-dashboard.component"
          ).then((m) => m.ModalDashboardComponent),
      },
      {
        path: "layout-hidden",
        loadComponent: () =>
          import(
            "./features/main-menu/dashboards/modal-dashboard/modal-dashboard.component"
          ).then((m) => m.ModalDashboardComponent),
      },
      {
        path: "layout-fullwidth",
        loadComponent: () =>
          import(
            "./features/main-menu/dashboards/modal-dashboard/modal-dashboard.component"
          ).then((m) => m.ModalDashboardComponent),
      },
      {
        path: "layout-rtl",
        loadComponent: () =>
          import(
            "./features/main-menu/dashboards/modal-dashboard/modal-dashboard.component"
          ).then((m) => m.ModalDashboardComponent),
      },
      {
        path: "layout-dark",
        loadComponent: () =>
          import(
            "./features/main-menu/dashboards/modal-dashboard/modal-dashboard.component"
          ).then((m) => m.ModalDashboardComponent),
      },
    ],
  },
  {
    path: "userDetails/:id",
    loadComponent: () =>
      import("./features/link-for/link-for.component").then(
        (m) => m.LinkForComponent
      ),
  },
  {
    path: "under-maintenance",
    loadComponent: () =>
      import(
        "./features/pages/under-maintenance/under-maintenance.component"
      ).then((m) => m.UnderMaintenanceComponent),
  },
  {
    path: "coming-soon",
    loadComponent: () =>
      import("./features/pages/coming-soon/coming-soon.component").then(
        (m) => m.ComingSoonComponent
      ),
  },

  {
    path: 'app-register',
    loadComponent: () =>
      import('./auth/app-register/app-register.component').then((m) => m.AppRegisterComponent),
  },
  { path: "**", component: LoginComponent },
] as const;
