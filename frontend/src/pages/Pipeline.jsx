import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getApplications, updateApplication } from "../api/applicationApi";
import { getCompanies } from "../api/companyApi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Pipeline = () => {

  const [applications,setApplications] = useState([]);
  const [companies,setCompanies] = useState([]);

  const statuses = ["Applied","Interview","Offer","Rejected"];

  const statusColors = {
    Applied:"#3b82f6",
    Interview:"#f59e0b",
    Offer:"#10b981",
    Rejected:"#ef4444"
  };

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


  const getCompanyName = (app) => {

    if (app.companyId?.name) return app.companyId.name;

    const company = companies.find(c => c._id === app.companyId);

    return company?.name || "Unknown";

  };


  const getTimeline = (app) => {

    if(!app.history || app.history.length === 0) return null;

    return app.history.map((h,i)=>(
      <span key={i}>
        {h.status}
        {i !== app.history.length-1 && " → "}
      </span>
    ));

  };


  const formatDate = (date) => {

    if(!date) return null;

    return new Date(date).toLocaleDateString("en-US",{
      month:"short",
      day:"numeric"
    });

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

                  {(provided,snapshot)=>(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        ...columnStyle,
                        borderTop:`3px solid ${statusColors[status]}`,
                        background:snapshot.isDraggingOver ? "#1f2937" : "#111827"
                      }}

                      onMouseEnter={(e)=>{
                        e.currentTarget.style.transform="translateY(-8px)";
                        e.currentTarget.style.boxShadow="0 18px 40px rgba(0,0,0,0.6)";
                      }}

                      onMouseLeave={(e)=>{
                        e.currentTarget.style.transform="translateY(0px)";
                        e.currentTarget.style.boxShadow="0 6px 16px rgba(0,0,0,0.4)";
                      }}
                    >

                      <h3 style={columnHeader}>
                        {status}
                        <span style={countBadge}>
                          {columnApps.length}
                        </span>
                      </h3>

                      {columnApps.map((app,index)=>(

                        <Draggable
                          key={app._id}
                          draggableId={app._id}
                          index={index}
                        >

                          {(provided,snapshot)=>(
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...cardStyle,
                                boxShadow:snapshot.isDragging
                                  ? "0 12px 28px rgba(0,0,0,0.7)"
                                  : "0 0 0 rgba(59,130,246,0)",
                                ...provided.draggableProps.style
                              }}

                              onMouseEnter={(e)=>{
                                e.currentTarget.style.boxShadow =
                                  "0 0 18px rgba(59,130,246,0.35)";
                              }}

                              onMouseLeave={(e)=>{
                                e.currentTarget.style.boxShadow =
                                  "0 2px 6px rgba(0,0,0,0.4)";
                              }}

                            >

                              <div style={{display:"flex",alignItems:"center",gap:"8px"}}>

                                <span
                                  style={{
                                    width:"8px",
                                    height:"8px",
                                    borderRadius:"50%",
                                    background:statusColors[app.status]
                                  }}
                                />

                                <strong>
                                  {getCompanyName(app)}
                                </strong>

                              </div>

                              <div style={roleBadge}>
                                {app.role}
                              </div>

                              {app.createdAt && (
                                <div style={dateStyle}>
                                  Applied: {formatDate(app.createdAt)}
                                </div>
                              )}

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



const boardStyle={
  display:"grid",
  gridTemplateColumns:"repeat(4,1fr)",
  gap:"20px"
};

const columnStyle={
  background:"#111827",
  padding:"15px",
  borderRadius:"10px",
  minHeight:"380px",
  transition:"all 0.25s ease",
  transform:"translateY(0px)",
  boxShadow:"0 6px 16px rgba(0,0,0,0.4)"
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
  padding:"14px",
  borderRadius:"10px",
  marginBottom:"12px",
  border:"1px solid #1e293b",
  cursor:"grab",
  transition:"all 0.25s ease"
};

const roleBadge={
  background:"#1e293b",
  padding:"3px 8px",
  borderRadius:"6px",
  fontSize:"11px",
  display:"inline-block",
  marginTop:"6px"
};

const dateStyle={
  fontSize:"11px",
  marginTop:"6px",
  opacity:0.7
};

const timelineStyle={
  fontSize:"11px",
  marginTop:"6px",
  opacity:0.7
};

export default Pipeline;