import {menu} from "./sidebar.model";

export interface pageSelection {
    skip: number;
    limit: number;
}

export interface Star {
    show?: boolean;
    half?: boolean;
}

export interface apiResultFormat {
    data: [];
    totalData: number;
}

export interface contactList {
    isSelected: boolean;
    id: number;
    Name: string;
    Role: string;
    Phone: string;
    Tags: string;
    Location: string;
    Rating: string;
    Image: string;
    Flags: string;
    Status: string;
    isStarActive: boolean;
}

export interface companiesList {
    isSelected: boolean;
    id: number;
    Image: string;
    Name: string;
    Email: string;
    Tags: string;
    Owner: string;
    Owner_Img: string;
    Status: string;
    isStarActive: boolean;
}

export interface languageSetting {
    sNo: number;
    language: string;
    code: string;
    rtl: string;
    total: string;
    done: string;
    progress: string;
    status: string;
    img: string;
    isSelected?: boolean;
}

export interface file {
    sNo: number;
    name: string;
    lastModified: string;
    size: string;
    ownedMember: string;
    modified: string;
    memberimg: string;
    folderimg: string;
    isSelected?: boolean;
}

export interface callHistory {
    sNo: number;
    username: string;
    phoneNumber: string;
    callType: string;
    duration: string;
    dateTime: string;
    img: string;
    video: boolean;
    audio: boolean;
    isSelected?: boolean;
}

export interface videocall {
    sNo: number;
    img: string;
    name: string;
}

export interface fileShared {
    sNo: number;
    name: string;
    lastModified: string;
    size: string;
    ownedMember: string;
    img1: string;
    img2: string;
    isSelected?: boolean;
}

export interface leadsList {
    isSelected: boolean;
    isStarActive: boolean;
    id: number;
    LeadImage: string;
    LeadName: string;
    CompanyName: string;
    Location: string;
    CompanyImage: string;
    Phone: string;
    LeadStatus: string;
    LeadOwner: string;
    OwnerImage: string;
    CreatedDate: string;
}

export interface dealsList {
    id: number;
    isSelected: boolean;
    isStarActive: boolean;
    DealName: string;
    Stage: string;
    DealValue: string;
    Tags: string;
    ExpectedCloseDate: string;
    Probability: string;
    Status: string;
}

export interface languageSettingsWeb {
    isSelected: boolean;
    sNo: number;
    medium: string;
    file: string;
    total: string;
    done: string;
    progress: string;
}

export interface tickets {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    TicketID: string;
    Subject: string;
    AssignedImage: string;
    Assigned: string;
    CreatedOn: string;
    AssigneeImage: string;
    Assignee: string;
    Role: string;
    Priority: string;
    Status: string;
}

export interface contactMessage {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    Name: string;
    Role: string;
    Image: string;
    Phone: string;
    Email: string;
    Message: string;
    Created: string;
    Status: string;
}

export interface blogCategories {
    isSelected: boolean;
    id: number;
    CategoryName: boolean;
    CreatedDate: string;
    Status: string;
}

export interface blogTags {
    isSelected: boolean;
    id: number;
    TagName: boolean;
    CreatedDate: string;
    Status: string;
}

export interface blogComments {
    isSelected: boolean;
    id: number;
    Name: boolean;
    Role: string;
    Image: string;
    Email: string;
    Comment: string;
    CreatedDate: string;
    Status: string;
    isStarActive: boolean;
}

export interface faq {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    Questions: string;
    Category: string;
    Answers: string;
    Createdat: string;
    Status: string;
}

export interface testimonials {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    EstimationBy: string;
    Rating: string;
    Role: string;
    CustomerImage: string;
    Content: string;
    CreatedDate: string;
    Status: string;
}

export interface countries {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    Image: string;
    CountryCode: string;
    CountryID: string;
    CountryName: string;
}

export interface states {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    CountryCode: string;
    Image: string;
    CountryName: string;
    StateName: string;
}

export interface cities {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    CountryName: string;
    Image: string;
    StateName: string;
    CityName: string;
}

export interface source {
    id: number;
    Title: string;
    CreatedDate: string;
    Status: string;
    isSelected: boolean;
}

export interface lostReason {
    CreatedAt: string;
    Title: boolean;
    id: number;
    Status: string;
    isSelected: boolean;
}

export interface contactStage {
    CreatedAt: string;
    Title: boolean;
    id: number;
    Status: string;
    isSelected: boolean;
}

export interface industry {
    CreatedAt: string;
    Title: boolean;
    id: number;
    Status: string;
    isSelected: boolean;
}

export interface calls {
    CreatedAt: string;
    Title: boolean;
    id: number;
    Status: string;
    isSelected: boolean;
}

export interface superAdminSubscriptions {
    subscriber: string;
    plan: boolean;
    id: number;
    billingCycle: string;
    paymentMethod: string;
    amount: string;
    createdDate: string;
    expiringOn: string;
    Image: string;
    AccountURL: string;
    DomainStatus: string;
    InvoiceID: string;
    Email: string;
    status: string;
    isSelected: boolean;
}

export interface superAdminPurchaseTransaction {
    InvoiceID: string;
    Image: string;
    id: number;
    Customer: string;
    Email: string;
    CreatedDate: string;
    Amount: string;
    PaymentMethod: string;
    Status: string;
    isStarActive: boolean;
    isSelected: boolean;
}

export interface superAdminDomain {
    Name: string;
    DomainURL: boolean;
    id: number;
    Image: string;
    Plan: string;
    CreatedDate: string;
    Status: string;
    isStarActive: boolean;
    isSelected: boolean;
}

export interface superAdminPackages {
    PlanName: string;
    PlanType: boolean;
    id: number;
    TotalSubscribers: string;
    Price: string;
    CreatedDate: string;
    Status: string;
    isStarActive: boolean;
    isSelected: boolean;
}

export interface taskReports {
    task_name: string;
    isSelected: boolean;
    id: number;
    piority: string;
    start_date: string;
    type: string;
    status: string;
    created_date: string;
    img: string;
    assignee: string;
    isStarActive: boolean;
}

export interface leadReports {
    isSelected: boolean;
    id: number;
    LeadName: string;
    CompanyName: string;
    Locations: string;
    Phone: string;
    LeadStatus: string;
    CreatedDate: string;
    OwnerImage: string;
    CompanyImage: string;
    LeadImage: string;
    LeadOwner: string;
    isStarActive: boolean;
}

export interface dealReports {
    isSelected: boolean;
    id: number;
    DealName: string;
    Stage: string;
    DealValue: string;
    Tags: string;
    ExpectedCloseDate: string;
    Probability: string;
    Status: string;
    isStarActive: boolean;
}

export interface contactReports {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    Name: string;
    Role: string;
    Image: string;
    Phone: string;
    Tags: string;
    FlagImage: string;
    Location: string;
    Rating: string;
    Status: string;
}

export interface companyReports {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    Name: string;
    Email: string;
    Tags: string;
    Owner: string;
    OwnerImage: string;
    Image: string;
    Contact: string;
    Status: string;
}

export interface projectReports {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    Name: string;
    Image: string;
    Client: string;
    ClientImage: string;
    Priority: string;
    StartDate: string;
    EndDate: string;
    PipelineStage: string;
    Status: string;
}

export interface Star {
    show?: boolean;
    half?: boolean;
}

export interface dataTables {
    isSelected: boolean;
    sNo?: number;
    name?: string;
    position?: string;
    office?: string;
    age?: string;
    salary?: string;
    startDate?: string;
    id?: string;
}

export interface newApplicationDataTable {
    isSelected: boolean;
    _id: string;
    firstName: string;
    jobTitle: string;
    mobile: string;
    email: string;
    createdAt: string;
    status: string;
}

export interface companiesDataTable {
    isDeleted: boolean,
    isSelected: boolean;
    name: string;
    _id: string;
    country: any;
    registrationNo: string;
    vatNo: string;
    website: string;
    incorporatonDate: string;
    status: string;
}

export interface usersDataTable {
    isSelected: boolean;
    _id: string;

    userName: string;
    phone: string;
    email: string;
    createdAt: string;
    role: string;
    status: string;
}

export interface membershipTransactions {
    isSelected: boolean;
    id: number;
    type: string;
    amount: string;
    date: string;
    payment_type: string;
    status: string;
    isStarActive: boolean;
}

export interface manageUsers {
    isSelected: boolean;
    id: number;
    customer_name: string;
    customer_image: string;
    customer_no: string;
    phone: string;
    email: string;
    location: string;
    created: string;
    last_activity: string;
    status: string;
    isStarActive: boolean;
}

export interface rolesPermissions {
    isSelected: boolean;
    isStarActive: boolean;
    id: number;
    roles_name: string;
    created: string;
}

export interface deleteRequest {
    isSelected: boolean;
    isStarActive: boolean;
    id: number;
    CustomerImage: string;
    UserName: string;
    CustomerNo: string;
    RequisitionDate: string;
    DeleteRequestDate: string;
    ReasonforDeletion: string;
    Status: string;
}

export interface pages {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    Title: string;
    PageSlug: string;
    Status: string;
}

export interface sources {
    isSelected: boolean;
    id: number;
    pages: string;
    page_slug: string;
    status: string;
}

export interface projectLists {
    isSelected: boolean;
    id: number;
    name: string;
    client: string;
    pro_img: string;
    client_img: string;
    priority: string;
    start_date: string;
    end_date: string;
    stage: string;
    type: string;
    status: string;
    value: string;
    hrs: string;
    send_img: string;
    mem_image1: string;
    mem_image2: string;
    mem_image3: string;
    pipelineStage: string;
    isStarActive: boolean;
}

export interface activitiesList {
    isSelected: boolean;
    id: number;
    Title: string;
    ActivityType: string;
    DueDate: string;
    Owner: string;
    CreatedAt: string;
    Image: string;
}

export interface compaignList {
    isSelected: boolean;
    id: number;
    isStarActive: boolean;
    Name: string;
    Type: string;
    Opened: string;
    Closed: string;
    Unsubscribe: string;
    Delivered: string;
    Conversation: string;
    Status: string;
}

export interface pipeline {
    id: number;
    isSelected: boolean;
    PipelineName: string;
    TotalDealValue: string;
    NoofDeals: string;
    Stages: string;
    CreatedDate: string;
    Status: string;
}

export interface activityMail {
    isSelected: boolean;
    id: number;
    Title: string;
    ActivityType: string;
    DueDate: string;
    Owner: string;
    CreatedAt: string;
    Image: string;
}

export interface proposalsList {
    isSelected: boolean;
    id: number;
    proposalsID: string;
    subject: string;
    sendTo: string;
    totalValue: string;
    Date: string;
    openTill: string;
    Project: string;
    createdDate: string;
    status: string;
    pro_img: string;
    client_img: string;
}

export interface proposalView {
    isSelected: boolean;
    id: number;
    title: string;
    activityType: string;
    dueDate: string;
    owner: string;
    createdAt: string;
}

export interface contractList {
    isSelected: boolean;
    id: number;
    ContractID: string;
    Subject: string;
    Customer: string;
    ContractType: string;
    StartDate: string;
    EndDate: string;
    Image: string;
}

export interface paymentList {
    isSelected: boolean;
    id: number;
    InvoiceID: string;
    Image: string;
    Client: string;
    Amount: string;
    DueDate: string;
    PaymentMethod: string;
    TransactionID: string;
}

export interface estimationList {
    isSelected: boolean;
    id: number;
    estimationsId: string;
    client: string;
    amount: string;
    dueDate: string;
    paymentMethod: string;
    transactionId: string;
    action: string;
    client_img: string;
    status: string;
    date: string;
    img: string;
    img1: string;
    img3: string;
    project: string;
    expiryDate: string;
    estimationBy: string;
    posting: string;
    isStarActive: boolean;
}

export interface invoiceList {
    isStarActive: boolean;
    isSelected: boolean;
    id: number;
    invoiceId: string;
    client: string;
    project: string;
    dueDate: string;
    amount: string;
    paidAmount: string;
    balanceAmount: string;
    status: string;
    img: string;
    img1: string;
}

export interface PackageList {
    sNo?: number;
    isSelected: boolean;
    Plan_Name: string;
    Plan_Type: string;
    Total_Subscribers: string; // Alternatively, use number if you want a numerical type
    Price: string; // Alternatively, use number if you want to remove the "$" symbol
    Created_Date: string; // Alternatively, use Date if you want to store it as a Date object
    Status: string;
}

export interface CompanyAccount {
    sNo?: number;
    isSelected: boolean;
    CompanyName: string;
    Email: string;
    AccountURL: string;
    Plan: string;
    CreatedDate: string; // Alternatively, use Date if you want to store it as a Date object
    Image: string;
    Status: string;
    isStarActive: boolean;
}

export interface CompanyInfo {
    sNo?: number;
    isSelected: boolean;
    CompanyName: string;
    BillCycle: string;
    PaymentMethod: string;
    paymentMethod: string;
    Email: string;
    AccountURL: string;
    Plan: string;
    CreatedDate: string;
    ExpiringDate: string;
    Image: string;
    Status: string;
    Amount: string;
    DomainStatus: string;
    InvoiceID: string;
    subscriber: string;
    plan: string;
    billingCycle: string;
    amount: string;
    createdDate: string;
    expiringOn: string;
    status: string;
    isStarActive: boolean;
}

export interface superadmincompanies {
    sNo?: number;
    isSelected: boolean;
    id: number;
    Image: string;
    isStarActive: boolean;
    Name: string;
    Email: string;
    url: string;
    Plan: string;
    Created_Date: string;
    Status: string;
}
