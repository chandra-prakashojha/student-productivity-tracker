import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getCompanies,
  createCompany,
  deleteCompany
} from "../api/companyApi";

const Companies = () => {

  const [companies,setCompanies] = useState([]);
  const [showModal,setShowModal] = useState(false);

  const [form,setForm] = useState({
    name:"",
    location:"",
    website:""
  });

  const fetchCompanies = async () => {

    try{

      const data = await getCompanies();
      setCompanies(data);

    }catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{
    fetchCompanies();
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

      await createCompany(form);

      setForm({
        name:"",
        location:"",
        website:""
      });

      setShowModal(false);

      fetchCompanies();

    }catch(err){
      console.log(err);
    }
  };

  const handleDelete = async (id)=>{

    if(!window.confirm("Delete company?")) return;

    try{

      await deleteCompany(id);
      fetchCompanies();

    }catch(err){
      console.log(err);
    }

  };

  return(

    <DashboardLayout>

      <div style={{padding:"30px"}}>

        <div style={{
          display:"flex",
          justifyContent:"space-between",
          marginBottom:"20px"
        }}>

          <h2>Companies</h2>

          <button
            onClick={()=>setShowModal(true)}
            style={addButton}
          >
            + Add Company
          </button>

        </div>


        <div style={tableContainer}>

          <table style={table}>

            <thead>

              <tr>
                <th align="left">Name</th>
                <th align="left">Location</th>
                <th align="left">Website</th>
                <th align="left">Actions</th>
              </tr>

            </thead>

            <tbody>

              {companies.length === 0 ?(

                <tr>
                  <td colSpan="4">No companies yet</td>
                </tr>

              ):(
                companies.map(c=>(
                  <tr key={c._id}>

                    <td>{c.name}</td>
                    <td>{c.location}</td>
                    <td>{c.website}</td>

                    <td>

                      <button
                        style={deleteBtn}
                        onClick={()=>handleDelete(c._id)}
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

            <h3>Add Company</h3>

            <form onSubmit={handleSubmit}>

              <input
                name="name"
                placeholder="Company name"
                value={form.name}
                onChange={handleChange}
                required
                style={input}
              />

              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                style={input}
              />

              <input
                name="website"
                placeholder="Website"
                value={form.website}
                onChange={handleChange}
                style={input}
              />

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


const addButton={
  background:"#3b82f6",
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

const deleteBtn={
  background:"#ef4444",
  border:"none",
  padding:"6px 12px",
  color:"white",
  borderRadius:"4px",
  cursor:"pointer"
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
  justifyContent:"center"
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

export default Companies;