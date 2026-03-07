import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getApplications, updateApplication } from "../api/applicationApi";
import { getCompanies } from "../api/companyApi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Pipeline = () => {

  const [applications,setApplications] = useState([]);
  const [companies,setCompanies] = useState([]);

  const statuses = ["Applied","Interview","Offer","Rejected"];

  /* FETCH APPLICATIONS */

  const fetchApplications = async () => {

    try {

      const data = await getApplications();

      const apps =
        data?.applications ||
        data?.data?.applications ||
        data?.data ||
        data ||
        [];

      setApplications(Array.isArray(apps) ? apps : []);

    } catch (err) {

      console.log(err);

    }

  };

  /* FETCH COMPANIES */

  const fetchCompanies = async () => {

    try {

      const data = await getCompanies();

      const list =
        data?.companies ||
        data?.data?.companies ||
        data?.data ||
        data ||
        [];

      setCompanies(Array.isArray(list) ? list : []);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(()=>{
    fetchApplications();
    fetchCompanies();
  },[]);


  /* DRAG END */

  const onDragEnd = async (result) => {

  const { destination, draggableId } = result;

  if (!destination) return;

  const newStatus = destination.droppableId;

  try {

    const movedApp = applications.find(a => a._id === draggableId);

    await updateApplication(draggableId, {
      companyId: movedApp.companyId?._id || movedApp.companyId,
      role: movedApp.role,
      status: newStatus
    });

    fetchApplications();

  } catch (err) {

    console.log(err);

  }

};


  /* GET COMPANY NAME SAFELY */

  const getCompanyName = (app) => {

    if (app.companyId?.name) return app.companyId.name;

    const company = companies.find(c => c._id === app.companyId);

    return company?.name || "Unknown";

  };


  /* GET TIMELINE STRING */

  const getTimeline = (app) => {

    if(!app.history || app.history.length === 0) return null;

    return app.history.map((h,i)=>(
      <span key={i}>
        {h.status}
        {i !== app.history.length-1 && " → "}
      </span>
    ));

  };


  return(

    <DashboardLayout>

      <div style={{padding:"30px"}}>

        <h2 style={{marginBottom:"20px"}}>Application Pipeline</h2>

        <DragDropContext onDragEnd={onDragEnd}>

          <div style={boardStyle}>

            {statuses.map(status => {

              const columnApps =
                applications.filter(app => app.status === status);

              return(

                <Droppable droppableId={status} key={status}>

                  {(provided)=>(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={columnStyle}
                    >

                      {/* COLUMN HEADER */}
                      <h3 style={columnHeader}>
                        {status}
                        <span style={countBadge}>
                          {columnApps.length}
                        </span>
                      </h3>

                      {/* APPLICATION CARDS */}

                      {columnApps.map((app,index)=>(

                        <Draggable
                          key={app._id}
                          draggableId={app._id}
                          index={index}
                        >

                          {(provided)=>(
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...cardStyle,
                                ...provided.draggableProps.style
                              }}
                            >

                              <strong>
                                {getCompanyName(app)}
                              </strong>

                              <p style={roleStyle}>
                                {app.role}
                              </p>

                              {/* TIMELINE */}
                              {app.history && (
                                <div style={timelineStyle}>
                                  {getTimeline(app)}
                                </div>
                              )}

                            </div>
                          )}

                        </Draggable>

                      ))}

                      {provided.placeholder}

                    </div>
                  )}

                </Droppable>

              );

            })}

          </div>

        </DragDropContext>

      </div>

    </DashboardLayout>

  );

};


/* STYLES */

const boardStyle={
  display:"grid",
  gridTemplateColumns:"repeat(4,1fr)",
  gap:"20px"
};

const columnStyle={
  background:"#111827",
  padding:"15px",
  borderRadius:"10px",
  minHeight:"450px"
};

const columnHeader={
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:"15px"
};

const countBadge={
  background:"#1e293b",
  padding:"2px 8px",
  borderRadius:"20px",
  fontSize:"12px"
};

const cardStyle={
  background:"#0f172a",
  padding:"12px",
  borderRadius:"8px",
  marginBottom:"10px",
  border:"1px solid #1e293b",
  cursor:"grab"
};

const roleStyle={
  fontSize:"13px",
  marginTop:"4px",
  color:"#cbd5f5"
};

const timelineStyle={
  fontSize:"11px",
  marginTop:"6px",
  opacity:0.7
};

export default Pipeline;