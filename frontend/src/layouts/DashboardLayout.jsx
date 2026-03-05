
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({children}) => {

  return (

    <div style={{display:"flex"}}>

      <Sidebar/>

      <div style={{
        marginLeft:"220px",
        padding:"40px",
        width:"100%",
        minHeight:"100vh",
        background:"#020617",
        color:"white"
      }}>

        {children}

      </div>

    </div>

  );

};

export default DashboardLayout;