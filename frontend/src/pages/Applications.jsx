import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getApplications,
  createApplication,
  deleteApplication
} from "../api/applicationApi";

const Applications = () => {

  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied"
  });

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createApplication(form);

      setForm({
        company: "",
        role: "",
        status: "Applied"
      });

      setShowModal(false);

      fetchApplications();

    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Delete this application?");

    if(!confirmDelete) return;

    try {

      await deleteApplication(id);

      fetchApplications();

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <DashboardLayout>

      <div style={{ padding: "30px" }}>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}>

          <h2>Applications</h2>

          <button
            onClick={() => setShowModal(true)}
            style={addButton}
          >
            + Add Application
          </button>

        </div>

        <div style={tableContainer}>

          <table style={table}>

            <thead>
              <tr>
                <th align="left">Company</th>
                <th align="left">Role</th>
                <th align="left">Status</th>
                <th align="left">Action</th>
              </tr>
            </thead>

            <tbody>

              {applications.length === 0 ? (
                <tr>
                  <td colSpan="4">No applications yet</td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id}>

                    <td>{app.company}</td>

                    <td>{app.role}</td>

                    <td>
                      <span style={statusBadge(app.status)}>
                        {app.status}
                      </span>
                    </td>

                    <td>
                      <button
                        style={deleteBtn}
                        onClick={() => handleDelete(app._id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* Modal */}

      {showModal && (

        <div style={modalOverlay}>

          <div style={modal}>

            <h3>Add Application</h3>

            <form onSubmit={handleSubmit}>

              <input
                name="company"
                placeholder="Company"
                value={form.company}
                onChange={handleChange}
                required
                style={input}
              />

              <input
                name="role"
                placeholder="Role"
                value={form.role}
                onChange={handleChange}
                required
                style={input}
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={input}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>

              <div style={{ marginTop: "15px" }}>

                <button type="submit" style={saveBtn}>
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={cancelBtn}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </DashboardLayout>

  );

};


/* styles */

const addButton = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer"
};

const tableContainer = {
  background: "#111827",
  padding: "20px",
  borderRadius: "10px"
};

const table = {
  width: "100%",
  color: "white"
};

const deleteBtn = {
  background: "#ef4444",
  border: "none",
  padding: "6px 12px",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer"
};

const statusBadge = (status) => {

  const colors = {
    Applied: "#2563eb",
    Interview: "#f59e0b",
    Offer: "#10b981",
    Rejected: "#ef4444"
  };

  return {
    background: colors[status] || "#64748b",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px"
  };

};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const modal = {
  background: "#020617",
  padding: "30px",
  borderRadius: "10px",
  width: "320px",
  color: "white"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "6px",
  color: "white"
};

const saveBtn = {
  background: "#10b981",
  border: "none",
  padding: "8px 12px",
  marginRight: "10px",
  color: "white",
  cursor: "pointer"
};

const cancelBtn = {
  background: "#ef4444",
  border: "none",
  padding: "8px 12px",
  color: "white",
  cursor: "pointer"
};

export default Applications;