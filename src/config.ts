const BASE_URL_API = "https://my-planent.onrender.com";
// const BASE_URL_API = '';

export const CONFIG = {
  login: BASE_URL_API + "/api/auth/login",
  addCompany: BASE_URL_API + "/api/company/addCompany",
  getCompany: BASE_URL_API + "/api/company/getlist",
  getManageUsers: BASE_URL_API + "/api/users/userslist",
  addUser: BASE_URL_API + "/api/users/adduser",
  updateUser: BASE_URL_API + "/api/users/updateuser",
  deleteUser: BASE_URL_API + "/api/users/Delete",
  addApplication: BASE_URL_API + "/api/application/add"
};
