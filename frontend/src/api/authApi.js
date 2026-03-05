import axios from "axios";

const API = axios.create({
  baseURL: "/api"
});

export const registerUser = async (data) => {
  return await API.post("/auth/register", data);
};

export const loginUser = async (data) => {
  return await API.post("/auth/login", data);
};

export default API;