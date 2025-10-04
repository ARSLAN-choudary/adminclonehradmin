const BASE_URL_API = "https://my-planent-ld47.onrender.com";
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
};
