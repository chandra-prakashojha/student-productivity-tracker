import API from "./axios";

// Get dashboard stats
export const getDashboardStats = async () => {
  const res = await API.get("/dashboard");
  return res.data;
};

// Get application trend
export const getApplicationTrend = async () => {
  const res = await API.get("/dashboard/trend");
  return res.data;
};