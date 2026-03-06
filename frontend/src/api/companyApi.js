
import axios from "./axios";

export const getCompanies = async () => {
  const res = await axios.get("/companies");
  return res.data;
};

export const createCompany = async (data) => {
  const res = await axios.post("/companies", data);
  return res.data;
};

export const deleteCompany = async (id) => {
  const res = await axios.delete(`/companies/${id}`);
  return res.data;
};