// The service uses Axios for HTTP requests and Local Storage for user information & JWT.
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (
  email,
  password,
  firstName,
  lastName,
  country,
  street,
  apt,
  city,
  state,
  zip,
  phone
) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
    firstName,
    lastName,
    country,
    street,
    apt,
    city,
    state,
    zip,
    phone,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
