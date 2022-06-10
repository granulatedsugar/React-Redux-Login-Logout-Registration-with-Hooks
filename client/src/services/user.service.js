// Now we define a service for accessing data.
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getManagerBoard = () => {
  return axios.get(API_URL + "shopmanager", { headers: authHeader() });
};

const getSpecialistBoard = () => {
  return axios.get(API_URL + "specialist", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getManagerBoard,
  getSpecialistBoard,
  getAdminBoard,
};
