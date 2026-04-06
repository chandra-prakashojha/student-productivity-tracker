import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendar.css";

const localizer = momentLocalizer(moment);

const InterviewCalendar = () => {

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {

    const fetchInterviews = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/dashboard/upcoming-interviews",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const formattedEvents = res.data.map((interview) => {

          let color = "#3b82f6";

          if (interview.roundName.toLowerCase().includes("hr")) {
            color = "#22c55e";
          }

          if (interview.roundName.toLowerCase().includes("technical")) {
            color = "#3b82f6";
          }

          if (interview.roundName.toLowerCase().includes("manager")) {
            color = "#a855f7";
          }

          if (interview.roundName.toLowerCase().includes("final")) {
            color = "#f97316";
          }

          return {
            title: `${interview.companyName} | ${interview.roundName}`,
            start: new Date(interview.date),
            end: new Date(interview.date),
            allDay: true,
            color: color
          };

        });

        setEvents(formattedEvents);

      } catch (err) {
        console.error("Error fetching interviews:", err);
      }

    };

    fetchInterviews();

  }, []);

  return (

    <div style={calendarCard}>

      <h3 style={{ marginBottom: "20px" }}>
        Interview Calendar
      </h3>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 500 }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
            borderRadius: "6px",
            border: "none",
            color: "white"
          }
        })}
        onSelectEvent={(event) => {
          setSelectedEvent(event);
        }}
        onSelectSlot={(slotInfo) => {
          alert(`Selected date: ${slotInfo.start.toDateString()}`);
        }}
      />

     {selectedEvent && (

  <div style={modalOverlay}>

    <div style={modalCard}>
      <button
  onClick={() => setSelectedEvent(null)}
  style={closeIcon}
>
  ✕
</button>

      <h3 style={{ marginBottom: "15px" }}>
        Interview Details
      </h3>

      <p style={{ marginBottom: "8px" }}>
        <strong>Company:</strong> {selectedEvent.title.split("|")[0]}
      </p>

      <p style={{ marginBottom: "8px" }}>
        <strong>Round:</strong> {selectedEvent.title.split("|")[1]}
      </p>

      <p style={{ marginBottom: "8px" }}>
        <strong>Date:</strong> {selectedEvent.start.toDateString()}
      </p>

      <button
        style={closeBtn}
        onClick={() => setSelectedEvent(null)}
      >
        Close
      </button>

    </div>

  </div>

)}

    </div>

  );

};

const calendarCard = {
  background: "#0f172a",
  padding: "25px",
  borderRadius: "10px",
  marginBottom: "40px"
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.45)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const modalCard = {
  position: "relative",
  background: "#0f172a",
  padding: "28px",
  borderRadius: "12px",
  width: "320px",
  color: "white",
  boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
};

const closeBtn = {
  marginTop: "18px",
  padding: "8px 16px",
  border: "none",
  background: "#3b82f6",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  transition: "0.2s"
};
const closeIcon = {
  position: "absolute",
  top: "12px",
  right: "16px",
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "18px",
  cursor: "pointer"
};

export default InterviewCalendar;