
import API from "./axios";

export const testConnection = async () => {
  const res = await API.get("/students");
  console.log(res.data);
};