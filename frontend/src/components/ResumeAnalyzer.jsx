import { useState } from "react";
import axios from "../api/axiosConfig";

const ResumeAnalyzer = () => {

  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  const uploadResume = async () => {

    if (!file) {
      setError("Please upload a resume first");
      return;
    }

    try {

      setLoading(true);
      setError("");
      setAnalysis("");

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("role", role);

      const response = await axios.post(
        "/resume/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      let result = response.data.analysis;

      if (typeof result === "object") {
        result = result.analysis || JSON.stringify(result);
      }

      setAnalysis(result);

    } catch (err) {

      console.error(err);

      setError(
        err?.response?.data?.message ||
        "Resume analysis failed"
      );

    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setAnalysis("");
    setFile(null);
    setError("");
  };

  const copyAnalysis = () => {
    navigator.clipboard.writeText(analysis);
  };

  const scoreMatch = analysis.match(/Resume Score:\s*(\d+)/);
  const score = scoreMatch ? scoreMatch[1] : null;

  const atsMatch = analysis.match(/ATS Score:\s*(\d+)/);
const atsScore = atsMatch ? atsMatch[1] : null;

  let scoreColor = "#22c55e";
  if (score < 80) scoreColor = "#f59e0b";
  if (score < 60) scoreColor = "#ef4444";

  const cleanedAnalysis = analysis.replace(/Resume Score:\s*\d+\/?\d*/i, "");


 

  const formatSections = (text) => {

    if (!text) return [];

    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, "\n\n### $1\n")
      .replace(/(\d+)\.\s*\n\s*/g, "$1. ")
      .replace(/\n\s*:\s*/g, ": ")
      .replace(/\n{2,}/g, "\n");

    const sections = formatted.split("###");

    return sections.map((section, index) => {

      if (index === 0) {
        return {
          title: "",
          content: section
        };
      }

      const lines = section.split("\n");
      const title = lines[0];
      const content = lines.slice(1).join("\n");

      return {
        title,
        content
      };

    });

  };

  const sections = formatSections(cleanedAnalysis);

 const renderPoints = (text) => {

  const rawLines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const merged = [];

  for (let i = 0; i < rawLines.length; i++) {

    const line = rawLines[i];

  if (/^\d+\.\s*$/.test(line)) {

  let combined = line.trim();

  while (rawLines[i + 1] && !/^\d+\./.test(rawLines[i + 1])) {
    combined += " " + rawLines[i + 1].trim();
    i++;
  }

  merged.push(combined);
  continue;
}
    merged.push(line);
  }

  return merged.map((line, i) => {

    const match = line.match(/^(\d+)\.\s*(.*)/);

    if (match) {

      const number = match[1];
      const content = match[2];

      return (
        <p
          key={i}
          style={{
            color: "#e5e7eb",
            marginBottom: "14px",
            lineHeight: "1.6"
          }}
        >
          <span style={{ color: "#60a5fa", fontWeight: "600" }}>
            {number}.
          </span>{" "}
          {content}
        </p>
      );

    }

    return (
      <p key={i} style={{ color: "#e5e7eb", marginBottom: "10px" }}>
        {line}
      </p>
    );

  });

};

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "auto",
        position: "relative",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}
    >

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "rgba(34,197,94,0.15)",
          filter: "blur(120px)",
          top: "-80px",
          left: "-80px",
          zIndex: "-1"
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "rgba(59,130,246,0.15)",
          filter: "blur(120px)",
          bottom: "-80px",
          right: "-80px",
          zIndex: "-1"
        }}
      />

      <div
        style={{
          background:
            "radial-gradient(circle at top left, rgba(34,197,94,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(59,130,246,0.15), transparent 40%), #0f172a",
          padding: "30px",
          borderRadius: "12px",
          marginBottom: "25px",
          color: "white",
          border: "2px dashed #374151",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.35)"
        }}
      >

        <p style={{ marginBottom: "10px", fontSize: "16px" }}>
          Upload your resume (PDF)
        </p>

<div style={{ marginBottom: "15px" }}>
  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    style={{
      padding: "8px",
      borderRadius: "6px",
      background: "#1e293b",
      color: "white",
      border: "1px solid #374151"
    }}
  >
    <option value="">Select Target Role</option>
    <option value="Frontend Developer">Frontend Developer</option>
    <option value="Backend Developer">Backend Developer</option>
    <option value="Full Stack Developer">Full Stack Developer</option>
    <option value="Data Scientist">Data Scientist</option>
    <option value="Cyber Security Analyst">Cyber Security Analyst</option>
  </select>
</div>



        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <button
          onClick={uploadResume}
          disabled={loading}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            background: "#22c55e",
            color: "white",
            cursor: "pointer"
          }}
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>

        {file && (
          <p style={{ marginTop: "12px", color: "#9ca3af" }}>
            Selected File: {file.name}
          </p>
        )}

      </div>

      {score && (
        <div
          style={{
            background: "#111827",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "25px",
            color: "white"
          }}
        >

          <h3 style={{ marginBottom: "10px" }}>
            Resume Score
          </h3>

          <div
            style={{
              width: "100%",
              background: "#374151",
              height: "10px",
              borderRadius: "10px",
              overflow: "hidden"
            }}
          >

            <div
              style={{
                width: `${score}%`,
                background: scoreColor,
                height: "100%",
                transition: "width 0.8s ease"
              }}
            />

          </div>

          <p style={{ marginTop: "10px", color: "#9ca3af" }}>
            {score}/100
          </p>

        </div>
      )}

 {atsScore && (
  <div
    style={{
      background: "#111827",
      padding: "25px",
      borderRadius: "12px",
      marginBottom: "25px",
      color: "white"
    }}
  >

    <h3 style={{ marginBottom: "10px" }}>
      ATS Compatibility Score
    </h3>

    <div
      style={{
        width: "100%",
        background: "#374151",
        height: "10px",
        borderRadius: "10px",
        overflow: "hidden"
      }}
    >

      <div
        style={{
          width: `${atsScore}%`,
          background: "#3b82f6",
          height: "100%",
          transition: "width 0.8s ease"
        }}
      />

    </div>

    <p style={{ marginTop: "10px", color: "#9ca3af" }}>
      {atsScore}/100
    </p>

  </div>
)}





      {/* Analysis */}

      {analysis && (
        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "12px",
            color: "white"
          }}
        >

          <h3 style={{ marginBottom: "20px" }}>
            Resume Analysis
          </h3>

          {sections.map((section, index) => (

            <div key={index} style={{ marginBottom: "25px" }}>

              {section.title && (
                <h3
                  style={{
                    color: "#e5e7eb",
                    fontWeight: "700",
                    marginBottom: "12px"
                  }}
                >
                  {section.title}
                </h3>
              )}

              {renderPoints(section.content)}

            </div>

          ))}

          <div style={{ marginTop: "20px" }}>

            <button
              onClick={copyAnalysis}
              style={{
                marginRight: "10px",
                padding: "8px 14px",
                background: "#374151",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Copy Analysis
            </button>

            <button
              onClick={clearResult}
              style={{
                padding: "8px 14px",
                background: "#ef4444",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Clear Result
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default ResumeAnalyzer;