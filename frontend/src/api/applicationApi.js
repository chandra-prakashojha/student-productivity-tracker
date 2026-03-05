import API from "./axios";

// Get all applications
export const getApplications = async () => {
  const res = await API.get("/applications");
  return res.data;
};

// Create a new application
export const createApplication = async (data) => {
  const res = await API.post("/applications", data);
  return res.data;
};

// Delete an application
export const deleteApplication = async (id) => {
  const res = await API.delete(`/applications/${id}`);
  return res.data;
};

// Get recent applications (for dashboard)
export const getRecentApplications = async () => {
  const res = await API.get("/applications/recent");
  return res.data;
};

// Update an application (optional but good for full CRUD)
export const updateApplication = async (id, data) => {
  const res = await API.put(`/applications/${id}`, data);
  return res.data;
};