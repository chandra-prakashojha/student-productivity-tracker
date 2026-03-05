import API from "./axios";

/* Get all applications */
export const getApplications = async () => {
  try {
    const res = await API.get("/applications");
    return res.data;
  } catch (err) {
    console.error("Error fetching applications:", err);
    throw err;
  }
};


/* Create a new application */
export const createApplication = async (data) => {
  try {
    const res = await API.post("/applications", data);
    return res.data;
  } catch (err) {
    console.error("Error creating application:", err);
    throw err;
  }
};


/* Update an application */
export const updateApplication = async (id, data) => {
  try {
    const res = await API.put(`/applications/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating application:", err);
    throw err;
  }
};


/* Delete an application */
export const deleteApplication = async (id) => {
  try {
    const res = await API.delete(`/applications/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting application:", err);
    throw err;
  }
};


/* Get recent applications (Dashboard) */
export const getRecentApplications = async () => {
  try {
    const res = await API.get("/applications/recent");
    return res.data;
  } catch (err) {
    console.error("Error fetching recent applications:", err);
    throw err;
  }
};