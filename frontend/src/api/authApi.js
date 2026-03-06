import API from "./axios";

export const loginUser = async (data) => {

  const res = await API.post("/auth/login", data);

  // save token
  localStorage.setItem("token", res.data.token);

  // save user object
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;

};


export const registerUser = async (data) => {

  const res = await API.post("/auth/register", data);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;

};