// const BASE_URL_API = "https://my-planent-ld47.onrender.com";
const BASE_URL_API = "https://my-planent-admin.fly.dev";
const BASE_URL_BOLT =
  "https://node.bolt.eu/fleet-integration-gateway/fleetIntegration/v1";
// const BASE_URL_API = '';

export const CONFIG = {
  login: BASE_URL_API + "/api/auth/login",
  forgetPassword: BASE_URL_API + "/api/auth/forgetpassword",
  verifyOtp: BASE_URL_API + "/api/auth/verifyotp",
  addCompany: BASE_URL_API + "/api/company/addCompany",
  getCompany: BASE_URL_API + "/api/company/getlist",
  getManageUsers: BASE_URL_API + "/api/users/userslist",
  addUser: BASE_URL_API + "/api/users/adduser",
  updateUser: BASE_URL_API + "/api/users/updateuser",
  updateApplication: BASE_URL_API + "/api/application/update",
  updateCompany: BASE_URL_API + "/api/company/update",
  deleteUser: BASE_URL_API + "/api/users/Delete",
  deleteCompany: BASE_URL_API + "/api/company/delete",
  deleteApplication: BASE_URL_API + "/api/application/delete",
  addApplication: BASE_URL_API + "/api/application/add",
  applicationResend: BASE_URL_API + "/api/application/resend",
  getApplications: BASE_URL_API + "/api/application/list",
  addUserDetail: BASE_URL_API + "/api/application/userdetail",
  uploadPdfFiles: BASE_URL_API + "/api/application/upload",
  getApplicationDetails: BASE_URL_API + "/api/application/get",
  boltTokenFromServer: "https://oidc.bolt.eu/token",
  getBoltCompanies: BASE_URL_BOLT + "/getCompanies",
  getBoltFleetOrder: BASE_URL_BOLT + "/getFleetOrders",
  getBoltDrivers: BASE_URL_BOLT + "/getDrivers",
  GetBoltVehicle: BASE_URL_BOLT + "/getVehicles",
  getBoltFleetStateLogs: BASE_URL_BOLT + "/getFleetStateLogs",
  verifyregisterapi: BASE_URL_API + "/api/auth/register",
  registerapi: BASE_URL_API + "/api/auth/uservarify",
  verifyUser: BASE_URL_API + "/api/users/userstatus",
  verifyRole: BASE_URL_API + "/api/users/userrole",
  getCountryList: BASE_URL_API + "/api/position/getposition",
  updateDocStatus: BASE_URL_API + "/api/users/updatedocuments",
  uploadDocuments: BASE_URL_API + "/api/users/uploaddocuments",
  userDetail: BASE_URL_API + "/api/users/userbyId",
  applicationDetail : BASE_URL_API + "/api/application/get",

  uploadContract: BASE_URL_API + "/api/users/uploadcontract",
  getUploadContract: BASE_URL_API + "/api/users/getUploadContract",

};
