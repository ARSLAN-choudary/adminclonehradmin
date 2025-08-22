import { BlogCategoriesComponent } from "../../features/content/blogs/blog-categories/blog-categories.component";

export const routes = {
  //Authentication
  login: "/login",
  forgotPassword: "/forgot-password",
  register: "/register",
  emailVerification: "/email-verification",
  twoStepVerfication: "/two-step-verification",
  resetPassword: "/reset-password",
  lockScreen: "/lock-screen",

  //Dashboard
  index: "/index",

  leadsDashboard: "/lead-dashboard",
  projectDashboard: "/project-dashboard",
  // Administraition
  administratorApplication: "/new-application",
  //Application
  application: "/application",
  fileManager: "/application/file-manager",
  audioCall: "/application/audio-call",
  videoCall: "/application/video-call",
  toDo: "/application/todo",
  todoList: "/application/todo-list",
  notes: "/application/notes",
  chat: "/application/chat",
  calendar: "/application/calendar",
  email: "/application/email",
  emailReply: "/application/email-reply",
  callHistory: "/application/call-history",
  kanban: "/application/kanban",
  socialFeed: "/application/social-feed",
  invoices: "/application/invoices",
  addInvoices: "/application/add-invoices",
  editInvoices: "/application/edit-invoices",
  invoiceDetails: "/application/invoice-details",

  //Super Admin
  superAdmin: "/super-admin",
  superAdminDash: "/super-admin/dashboard",
  superAdminCompanies: "/super-admin/companies",
  superAdminSubscriptions: "/super-admin/subscriptions",
  superAdminPackages: "/super-admin/packages",
  superAdminDomain: "/super-admin/domain",
  superAdminPurchaseTransaction: "/super-admin/purchase-transaction",

  //Layout
  Mini: "/layout-mini",
  fullWidth: "/layout-fullwidth",

  hoverView: "/layout-hoverview",

  hidden: "/layout-hidden",
  RTL: "/layout-rtl",
  Dark: "/layout-dark",

  //UI Interface

  //base
  avatar: "/base-ui/ui-avatar",
  cards: "/base-ui/ui-cards",
  buttons: "/base-ui/ui-buttons",
  accordion: "/base-ui/ui-accordion",
  uiPopovers: "/base-ui/ui-popovers",
  uiPlaceholders: "/base-ui/ui-placeholders",
  uiBadges: "/base-ui/ui-badges",
  uiBreadcrumb: "/base-ui/ui-breadcrumb",
  uiButtons: "/base-ui/ui-buttons",
  uiButtonsGroup: "/base-ui/ui-buttons-group",
  uiCards: "/base-ui/ui-cards",
  uiCarousel: "/base-ui/ui-carousel",
  uiCollapse: "/base-ui/ui-collapse",
  uiCounter: "/base-ui/ui-counter",
  uiDropdowns: "/base-ui/ui-dropdowns",
  uiRatio: "/base-ui/ui-ratio",
  uiGrid: "/base-ui/ui-grid",
  uiImages: "/base-ui/ui-images",
  uiLinks: "/base-ui/ui-links",
  uiListGroup: "/base-ui/ui-list-group",
  uiMedia: "/base-ui/ui-media",
  uiModals: "/base-ui/ui-modals",
  uiNavTabs: "/base-ui/ui-nav-tabs",
  uiOffcanvas: "/base-ui/ui-offcanvas",
  uiPagination: "/base-ui/ui-pagination",
  uiProgress: "/base-ui/ui-progress",
  uiSpinner: "/base-ui/ui-spinner",
  uiSweetAlerts: "/base-ui/ui-sweetalerts",
  uiToasts: "/base-ui/ui-toasts",
  uiTooltips: "/base-ui/ui-tooltips",
  uiTypography: "/base-ui/ui-typography",
  uiUtilities: "/base-ui/ui-utilities",
  uiVideo: "/base-ui/ui-video",
  uiAccordion: "/base-ui/ui-accordion",
  uiAvatar: "/base-ui/ui-avatar",
  uiBorders: "/base-ui/ui-borders",
  uiColors: "/base-ui/ui-colors",
  uiAlerts: "/base-ui/ui-alerts",

  //Advanced
  counter: "/advanced-ui/ui-counter",
  uiRangeSlider: "/advanced-ui/ui-rangeslider",
  clipboard: "/advanced-ui/ui-clipboard",
  ribbon: "/advanced-ui/ui-ribbon",
  rating: "/advanced-ui/ui-rating",
  textEditor: "/advanced-ui/ui-text-editor",
  scrollbar: "/advanced-ui/ui-scrollbar",
  timeline: "/advanced-ui/ui-timeline",
  uiLightbox: "/advanced-ui/ui-lightbox",
  dragDrop: "/advanced-ui/ui-drag-drop",

  //Forms
  formBasicInputs: "/forms/form-basic-inputs",
  formInputsGroups: "/forms/form-input-groups",
  formHorizontal: "/forms/form-horizontal",
  formVertical: "/forms/form-vertical",
  formMask: "/forms/form-mask",
  formValidation: "/forms/form-validation",
  formSelect: "/forms/form-select",
  formFileUpload: "/forms/form-fileupload",
  formCheckboxRadios: "/forms/form-checkbox-radios",
  formWizard: "/forms/form-wizard",
  formElements: "/forms/form-elements",
  formGridGutters: "/forms/form-grid-gutters",
  formSelect2: "/forms/form-select-2",
  formFloatingLabels: "/forms/form-floating-labels",
  formPickers: "/forms/form-pickers",

  //Icons
  iconFontAwesome: "/icons/icon-fontawesome",
  iconFeather: "/icons/icon-feather",
  iconIonic: "/icons/icon-ionic",
  iconMaterial: "/icons/icon-material",
  iconPe7: "/icons/icon-pe7",
  iconSimpleline: "/icons/icon-simpleline",
  iconWeather: "/icons/icon-weather",
  iconThemify: "/icons/icon-themify",
  iconTypicon: "/icons/icon-typicon",
  iconFlag: "/icons/icon-flag",
  iconTabler: "/icons/icon-tabler",
  iconRemix: "/icons/icon-remix",
  iconBootstrap: "/icons/icon-bootstrap",
  remix: "/icons/icon-remix",
  tabler: "/icons/icon-tabler",
  bootstrap: "/icons/icon-bootstrap",

  //Table
  basicTable: "/table/tables-basic",
  dataTable: "/table/data-tables",

  //Chart
  chartApex: "/charts/apex-charts",
  chartPrime: "/charts/prime-ng",

  //Map
  leaflet: "maps/leaflet",
  //CRM
  contacts: "/contacts",
  companies: "/companies",
  contactGrid: "/contacts/contact-grid",
  contactList: "/contacts/contact-list",
  contactDetails: "/contacts/contact-details",
  companiesList: "/companies/companies-list",
  leadsList: "/leads/leads-list",
  leadsKanban: "/leads/leads-kanban",
  leadsDetails: "/leads/leads-details",
  dealsList: "/deals/deals-list",
  dealsKanban: "/deals/deals-kanban",
  dealsDetails: "/deals/deals-details",
  content: "/content",
  projects: "/projects",
  proposals: "/proposals",
  proposalsView: "/proposals/proposals-view",
  proposalsGrid: "/proposals/proposals-grid",
  proposalsList: "/proposals/proposals-list",
  task: "/task",
  crmSettings: "/crm-settings",
  analytics: "/analytics",
  pipeline: "/pipeline",
  projectList: "/projects/project-list",
  projectGrid: "/projects/project-grid",
  projectDetails: "/projects/project-details",
  activityCalls: "/activities/activity-calls",
  activityMail: "/activities/activity-mail",
  activityMeeting: "/activities/activity-meeting",
  activityTask: "/activities/activity-task",
  activitiesList: "/activities/activities-list",
  campaignComplete: "/campaign/campaign-complete",
  campaignArchieve: "/campaign/campaign-archieve",
  campaignList: "/campaign/campaign-list",
  allTasks: "/tasks/all-tasks",
  tasksComplete: "/tasks/tasks-complete",
  tasksImportant: "/tasks/tasks-important",
  testimonials: "/testimonials",
  faq: "/faq",
  membership: "/membership",
  contracts: "/contracts",
  contractList: "/contracts/contracts-list",
  contractGrid: "/contracts/contracts-grid",
  payments: "/payments",
  estimationList: "/estimations/estimations-list",
  estimationKanban: "/estimations/estimations-kanban",
  invoice: "/invoice",
  invoiceList: "/invoice/invoice-list",
  invoiceGrid: "/invoice/invoice-grid",
  invoicesDetails: "/invoice/invoice-details",
  // Reports
  reports: "/reports",
  contactReports: "/reports/contact-reports",
  projectReports: "/reports/project-reports",
  dealReports: "/reports/deal-reports",
  leadReports: "/reports/lead-reports",
  taskReports: "/reports/task-reports",
  companyReports: "/reports/company-reports",

  // Support
  // support: '/support',
  contactMessage: "/contact-messages",
  tickets: "/tickets",
  ticketsDetails: "/ticket-details",

  // Locations
  location: "/location",
  cities: "/location/cities",
  countries: "/location/countries",
  states: "/location/states",

  // CRM
  crmSetting: "/crmsetting",

  source: "/sources",
  calls: "/calls",
  contactStage: "/contact-stage",
  industry: "/industry",
  LostReason: "/lost-reason",
  Tasks: "/tasks",
  sources: "/crm-settings/sources",
  lostReason: "/crm-settings/lost-reason",

  // Pages
  pages: "/pages",
  addPage: "/add-page",
  editPage: "/edit-page",
  blank: "/blank",
  comingSoon: "/coming-soon",
  underMaintenance: "/under-maintenance",

  //blogs
  blogs: "/blogs",
  blogList: "/blogs/blog-list",
  addBlog: "/blogs/add-blog",
  editBlog: "/blogs/edit-blog",
  blogCategories: "/blogs/blog-categories",
  blogTags: "/blogs/blog-tags",
  blogComments: "/blogs/blog-comments",
  blogDetails: "/blogs/blog-details",

  // Membership

  membershipAddons: "/membership/membership-addons",
  membershipPlans: "/membership/membership-plans",
  membershipTransactions: "/membership/membership-transactions",

  // User Management

  deleteRequest: "/delete-request",
  manageUsers: "/manage-users",
  rolesPermissions: "/roles-permissions",
  permissions: "/permission",

  // HRM (assuming `hrm` is defined in actual code)
  addEmployee: "/hrm/employee/add-employee",
  editEmployee: "/hrm/employee/edit-employee",

  // Companies

  companiesDetails: "/companies/companies-details",
  companiesGrid: "/companies/companies-grid",

  // Error Pages

  error404: "/error/error-404",
  error500: "/error/error-500",

  // Analytics

  notifications: "/notifications",

  // Misc
  success: "/success",

  //Settings
  profileSettings: "/settings/profile-settings",
  paymentSettings: "/settings/payment-settings",
  currencySettings: "/settings/currencies",
  groupSettings: "/settings/group-permissions",
  createPermission: "/settings/create-permission",
  editPermission: "/settings/edit-permission",
  securitySettings: "/settings/security-settings",
  settingsNotification: "/settings/notifications-settings",
  connectedApps: "/settings/connected-apps",
  systemSettings: "/settings/website-settings/system-settings",
  companySettings: "/settings/company-settings",
  localizationSettings: "/settings/localization-settings",
  prefixes: "/settings/prefixes-settings",
  appearance: "/settings/appearance-settings",
  languageSettings: "/settings/language-settings",
  languageSettingsweb: "/settings/language-web",
  languageSettingswebedit: "/settings/language-web-edit",
  socialAuthentication: "/settings/website-settings/social-authentication",
  preference: "/settings/preference-settings",
  invoiceSettings: "/settings/invoice-settings",
  printerSettings: "/settings/printers-settings",
  customFields: "/settings/custom-fields-setting",
  emailSettings: "/settings/email-settings",
  smsGateway: "/settings/sms-gateways",
  gdprSettings: "/settings/gdpr-cookies",
  paymentGatewaySettings: "/settings/payment-gateways",
  taxRates: "/settings/tax-rates",
  siteMap: "/settings/sitemap",
  clearCache: "/settings/clear-cache",
  storage: "/settings/storage",
  cronJob: "/settings/cronjob",
  databaseBackup: "/settings/database-backup",
  systemUpdate: "/settings/system-update",
  systemBackup: "/settings/system-backup",
  bankAccounts: "/settings/bank-accounts",
  banIpAddress: "/settings/ban-ip-address",
};
