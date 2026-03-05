import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

const Students = () => {

  const [students,setStudents] = useState([]);
  const [search,setSearch] = useState("");
  const [page,setPage] = useState(1);

  const [form,setForm] = useState({
    name:"",
    email:"",
    branch:"",
    year:""
  });

  const studentsPerPage = 5;

  const fetchStudents = async () => {

    try{

      const res = await API.get("/students");

      setStudents(res.data.students || []);

    }catch(err){

      console.log(err);

    }

  };

  useEffect(()=>{
    fetchStudents();
  },[]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      await API.post("/students",form);

      setForm({
        name:"",
        email:"",
        branch:"",
        year:""
      });

      fetchStudents();

    }catch(err){

      console.log(err);

    }

  };

  const deleteStudent = async (id) => {

    try{

      await API.delete(`/students/${id}`);

      fetchStudents();

    }catch(err){

      console.log(err);

    }

  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = page * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;

  const currentStudents = filteredStudents.slice(indexOfFirst,indexOfLast);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return(

    <DashboardLayout>

      <h1 style={{marginBottom:"20px"}}>Students</h1>

      {/* Search */}

      <input
        placeholder="Search student..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
          padding:"10px",
          marginBottom:"20px",
          borderRadius:"6px",
          border:"1px solid #334155",
          background:"#020617",
          color:"white"
        }}
      />

      {/* Add Student */}

      <form
        onSubmit={handleSubmit}
        style={{
          background:"#0f172a",
          padding:"20px",
          borderRadius:"10px",
          marginBottom:"30px",
          maxWidth:"500px"
        }}
      >

        <h3>Add Student</h3>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          style={inputStyle}
        />

        <button style={buttonStyle}>
          Add Student
        </button>

      </form>

      {/* Students Table */}

      <table style={tableStyle}>

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {currentStudents.map(student => (

            <tr key={student._id}>

              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.branch}</td>
              <td>{student.year}</td>

              <td>

                <button
                  onClick={()=>deleteStudent(student._id)}
                  style={deleteButton}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Pagination */}

      <div style={{marginTop:"20px"}}>

        {Array.from({length:totalPages},(_,i)=>(

          <button
            key={i}
            onClick={()=>setPage(i+1)}
            style={{
              marginRight:"10px",
              padding:"6px 12px",
              background:"#2563eb",
              border:"none",
              borderRadius:"6px",
              color:"white"
            }}
          >
            {i+1}
          </button>

        ))}

      </div>

    </DashboardLayout>

  );

};

const inputStyle = {

  width:"100%",
  padding:"10px",
  marginBottom:"10px",
  borderRadius:"6px",
  border:"1px solid #334155",
  background:"#020617",
  color:"white"

};

const buttonStyle = {

  padding:"10px 20px",
  background:"#2563eb",
  border:"none",
  borderRadius:"6px",
  color:"white",
  cursor:"pointer"

};

const deleteButton = {

  padding:"6px 12px",
  background:"#dc2626",
  border:"none",
  borderRadius:"6px",
  color:"white",
  cursor:"pointer"

};

const tableStyle = {

  width:"100%",
  borderCollapse:"collapse",
  background:"#0f172a"

};

export default Students;