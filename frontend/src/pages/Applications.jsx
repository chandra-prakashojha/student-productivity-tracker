import { useEffect, useState, useContext } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication
} from "../api/applicationApi";
import { getCompanies } from "../api/companyApi";
import { AppContext } from "../context/AppContext";

const Applications = () => {

  const { triggerDashboardRefresh } = useContext(AppContext);

  const [applications,setApplications] = useState([]);
  const [companies,setCompanies] = useState([]);

  const [showModal,setShowModal] = useState(false);
  const [editingId,setEditingId] = useState(null);

  const [search,setSearch] = useState("");
  const [statusFilter,setStatusFilter] = useState("");

  const [currentPage,setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [form,setForm] = useState({
    companyId:"",
    role:"",
    status:"Applied"
  });

  /* FETCH APPLICATIONS */

  const fetchApplications = async () => {

    try{

      const data = await getApplications();

      const apps =
        data?.applications ||
        data?.data?.applications ||
        data?.data ||
        data ||
        [];

      setApplications(Array.isArray(apps) ? apps : []);

    }catch(err){
      console.log(err);
    }

  };

  /* FETCH COMPANIES */

  const fetchCompanies = async () => {

    try{

      const data = await getCompanies();

      setCompanies(Array.isArray(data) ? data : []);

    }catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{
    fetchApplications();
    fetchCompanies();
  },[]);


  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };


  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    if (editingId) {

      await updateApplication(editingId, {
        companyId: form.companyId,
        role: form.role,
        status: form.status
      });

      setEditingId(null);

    } else {

      await createApplication({
        companyId: form.companyId,
        role: form.role,
        status: form.status
      });

    }

    setForm({
      companyId: "",
      role: "",
      status: "Applied"
    });

    setShowModal(false);

    triggerDashboardRefresh();

    fetchApplications();

  } catch (err) {

    console.log(err);

  }

};


  const handleEdit = (app)=>{

    setForm({
      companyId:app.companyId?._id || app.companyId || "",
      role:app.role,
      status:app.status
    });

    setEditingId(app._id);

    setShowModal(true);

  };


  const handleDelete = async (id)=>{

    const confirmDelete = window.confirm("Delete this application?");
    if(!confirmDelete) return;

    try{

      await deleteApplication(id);

      triggerDashboardRefresh();

      fetchApplications();

    }catch(err){
      console.log(err);
    }

  };


  /* EXPORT CSV */

  const exportCSV = () => {

    if(applications.length === 0){
      alert("No applications to export");
      return;
    }

    const headers = ["Company","Role","Status"];

    const rows = applications.map(app => [

      app.companyId?.name ||
      companies.find(c => c._id === app.companyId)?.name ||
      "Unknown",

      app.role,
      app.status
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map(e => e.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "applications.csv");

    document.body.appendChild(link);

    link.click();

  };


  /* STATUS COUNTERS */

  const statusCounts = {

    Applied: applications.filter(a => a.status === "Applied").length,
    Interview: applications.filter(a => a.status === "Interview").length,
    Offer: applications.filter(a => a.status === "Offer").length,
    Rejected: applications.filter(a => a.status === "Rejected").length

  };


  /* SEARCH + FILTER */

  const filteredApplications = applications.filter(app=>{

    const companyName =
      app.companyId?.name ||
      companies.find(c => c._id === app.companyId)?.name ||
      "";

    const matchesSearch =
      companyName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || app.status === statusFilter;

    return matchesSearch && matchesStatus;

  });


  /* PAGINATION */

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentApplications =
    filteredApplications.slice(indexOfFirst,indexOfLast);

  const totalPages =
    Math.ceil(filteredApplications.length / itemsPerPage);


  return(

    <DashboardLayout>

      <div style={{padding:"30px"}}>

        <div style={{
          display:"flex",
          justifyContent:"space-between",
          marginBottom:"20px"
        }}>

          <h2>Applications</h2>

          <div style={{display:"flex",gap:"10px"}}>

            <button
              onClick={exportCSV}
              style={exportButton}
            >
              Export CSV
            </button>

            <button
              onClick={()=>setShowModal(true)}
              style={addButton}
            >
              + Add Application
            </button>

          </div>

        </div>


        <div style={tableContainer}>

          <table style={table}>

            <thead>

              <tr>
                <th align="left">Company</th>
                <th align="left">Role</th>
                <th align="left">Status</th>
                <th align="left">Actions</th>
              </tr>

            </thead>

            <tbody>

              {currentApplications.length === 0 ?(

                <tr>
                  <td colSpan="4">No applications found</td>
                </tr>

              ):(
                currentApplications.map(app=>(

                    <tr
                   key={app._id}
                    style={{ cursor: "pointer" }}
                     onClick={() => window.location.href = `/applications/${app._id}`}
                      >

                    <td>
                      {app.companyId?.name ||
                       companies.find(c => c._id === app.companyId)?.name ||
                       "Unknown"}
                    </td>

                    <td>{app.role}</td>

                    <td>
                      <span style={statusBadge(app.status)}>
                        {app.status}
                      </span>
                    </td>

                    <td>

                      <button
                        style={editBtn}
                        onClick={()=>handleEdit(app)}
                      >
                        Edit
                      </button>

                      <button
                        style={deleteBtn}
                        onClick={()=>handleDelete(app._id)}
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


      {showModal &&(

        <div style={modalOverlay}>

          <div style={modal}>

            <h3>{editingId ? "Edit Application" : "Add Application"}</h3>

            <form onSubmit={handleSubmit}>

              <select
                name="companyId"
                value={form.companyId}
                onChange={handleChange}
                required
                style={input}
              >

                <option value="">Select Company</option>

                {companies.map(company => (

                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>

                ))}

              </select>

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

              <div style={{marginTop:"15px"}}>

                <button type="submit" style={saveBtn}>
                  Save
                </button>

                <button
                  type="button"
                  onClick={()=>setShowModal(false)}
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


/* STYLES */

const addButton={
  background:"#3b82f6",
  color:"white",
  border:"none",
  padding:"10px 16px",
  borderRadius:"6px",
  cursor:"pointer"
};

const exportButton={
  background:"#10b981",
  color:"white",
  border:"none",
  padding:"10px 16px",
  borderRadius:"6px",
  cursor:"pointer"
};

const tableContainer={
  background:"#111827",
  padding:"20px",
  borderRadius:"10px"
};

const table={
  width:"100%",
  color:"white"
};

const editBtn={
  background:"#2563eb",
  border:"none",
  padding:"6px 12px",
  marginRight:"8px",
  color:"white",
  borderRadius:"4px",
  cursor:"pointer"
};

const deleteBtn={
  background:"#ef4444",
  border:"none",
  padding:"6px 12px",
  color:"white",
  borderRadius:"4px",
  cursor:"pointer"
};

const statusBadge=(status)=>{

  const colors={
    Applied:"#2563eb",
    Interview:"#f59e0b",
    Offer:"#10b981",
    Rejected:"#ef4444"
  };

  return{
    background:colors[status]||"#64748b",
    padding:"4px 10px",
    borderRadius:"999px",
    fontSize:"12px"
  };

};

const modalOverlay={
  position:"fixed",
  top:0,
  left:0,
  width:"100%",
  height:"100%",
  background:"rgba(0,0,0,0.6)",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  zIndex:1000
};

const modal={
  background:"#020617",
  padding:"30px",
  borderRadius:"10px",
  width:"320px",
  color:"white"
};

const input={
  width:"100%",
  padding:"10px",
  marginTop:"10px",
  background:"#0f172a",
  border:"1px solid #334155",
  borderRadius:"6px",
  color:"white"
};

const saveBtn={
  background:"#10b981",
  border:"none",
  padding:"8px 12px",
  marginRight:"10px",
  color:"white",
  cursor:"pointer"
};

const cancelBtn={
  background:"#ef4444",
  border:"none",
  padding:"8px 12px",
  color:"white",
  cursor:"pointer"
};

export default Applications;