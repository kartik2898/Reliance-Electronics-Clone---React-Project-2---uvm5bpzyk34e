import http from "../http-interceptor";

const login = (email, password) => {
  return http.post(`https://academics.newtonschool.co/api/v1/user/login`, { email: email, password: password, "appType": "ecommerce" });
};
const signUp = (firstName,lastName,email, password) => {
  return http.post(`https://academics.newtonschool.co/api/v1/user/signup`, {name: firstName, lastName: lastName, email: email, password: password, "appType": "ecommerce" });
};
const AuthService = {
  login,
  signUp
};

export default AuthService