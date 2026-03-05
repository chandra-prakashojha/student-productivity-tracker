import { useEffect, useState, useContext } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication
} from "../api/applicationApi";
import { AppContext } from "../context/AppContext";

const Applications = () => {

  const { triggerDashboardRefresh } = useContext(AppContext);

  const [applications,setApplications] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [editingId,setEditingId] = useState(null);

  const [search,setSearch] = useState("");
  const [statusFilter,setStatusFilter] = useState("");

  const [currentPage,setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [form,setForm] = useState({
    company:"",
    role:"",
    status:"Applied"
  });


  const fetchApplications = async () => {

    try{
      const data = await getApplications();
      setApplications(data);
    }catch(err){
      console.log(err);
    }

  };


  useEffect(()=>{
    fetchApplications();
  },[]);



  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };



  const handleSubmit = async (e)=>{

    e.preventDefault();

    try{

      if(editingId){

        await updateApplication(editingId,form);
        setEditingId(null);

      }else{

        await createApplication(form);

      }

      setForm({
        company:"",
        role:"",
        status:"Applied"
      });

      setShowModal(false);

      triggerDashboardRefresh();

      fetchApplications();

    }catch(err){
      console.log(err);
    }

  };



  const handleEdit = (app)=>{

    setForm({
      company:app.company,
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



  /* SEARCH + FILTER */

  const filteredApplications = applications.filter(app=>{

    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase());

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

          <button
            onClick={()=>setShowModal(true)}
            style={addButton}
          >
            + Add Application
          </button>

        </div>



        {/* Search + Filter */}

        <div style={filterContainer}>

          <input
            placeholder="Search company..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={searchInput}
          />

          <select
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
            style={searchInput}
          >
            <option value="">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

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



        {/* Pagination */}

        <div style={paginationContainer}>

          <button
            disabled={currentPage === 1}
            onClick={()=>setCurrentPage(prev=>prev-1)}
            style={pageBtn}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={()=>setCurrentPage(prev=>prev+1)}
            style={pageBtn}
          >
            Next
          </button>

        </div>

      </div>



      {/* Modal */}

      {showModal &&(

        <div style={modalOverlay}>

          <div style={modal}>

            <h3>{editingId ? "Edit Application" : "Add Application"}</h3>

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



/* styles */

const addButton = {
  background:"#3b82f6",
  color:"white",
  border:"none",
  padding:"10px 16px",
  borderRadius:"6px",
  cursor:"pointer"
};

const filterContainer = {
  display:"flex",
  gap:"10px",
  marginBottom:"20px"
};

const searchInput = {
  padding:"8px",
  background:"#0f172a",
  border:"1px solid #334155",
  borderRadius:"6px",
  color:"white"
};

const tableContainer = {
  background:"#111827",
  padding:"20px",
  borderRadius:"10px"
};

const table = {
  width:"100%",
  color:"white"
};

const editBtn = {
  background:"#2563eb",
  border:"none",
  padding:"6px 12px",
  marginRight:"8px",
  color:"white",
  borderRadius:"4px",
  cursor:"pointer"
};

const deleteBtn = {
  background:"#ef4444",
  border:"none",
  padding:"6px 12px",
  color:"white",
  borderRadius:"4px",
  cursor:"pointer"
};

const paginationContainer = {
  display:"flex",
  justifyContent:"space-between",
  marginTop:"20px",
  alignItems:"center"
};

const pageBtn = {
  background:"#2563eb",
  border:"none",
  padding:"6px 12px",
  color:"white",
  borderRadius:"4px",
  cursor:"pointer"
};

const statusBadge = (status)=>{

  const colors={
    Applied:"#2563eb",
    Interview:"#f59e0b",
    Offer:"#10b981",
    Rejected:"#ef4444"
  };

  return{
    background:colors[status] || "#64748b",
    padding:"4px 10px",
    borderRadius:"999px",
    fontSize:"12px"
  };

};

const modalOverlay = {
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

const modal = {
  background:"#020617",
  padding:"30px",
  borderRadius:"10px",
  width:"320px",
  color:"white"
};

const input = {
  width:"100%",
  padding:"10px",
  marginTop:"10px",
  background:"#0f172a",
  border:"1px solid #334155",
  borderRadius:"6px",
  color:"white"
};

const saveBtn = {
  background:"#10b981",
  border:"none",
  padding:"8px 12px",
  marginRight:"10px",
  color:"white",
  cursor:"pointer"
};

const cancelBtn = {
  background:"#ef4444",
  border:"none",
  padding:"8px 12px",
  color:"white",
  cursor:"pointer"
};

export default Applications;