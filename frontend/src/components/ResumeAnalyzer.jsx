import { useState } from "react";
import axios from "../api/axiosConfig";

const ResumeAnalyzer = () => {

  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      const response = await axios.post(
        "/resume/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("AI RESPONSE:", response.data);

      // ensure analysis is always string
      const result =
        typeof response.data.analysis === "string"
          ? response.data.analysis
          : JSON.stringify(response.data.analysis, null, 2);

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

  return (
    <div style={{ marginTop: "40px", padding: "20px" }}>

      <h2>AI Resume Analyzer</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadResume} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "15px" }}>
          {error}
        </p>
      )}

      {analysis && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#0f172a",
            borderRadius: "10px",
            color: "white"
          }}
        >

          <h3>AI Resume Analysis</h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.6"
            }}
          >
            {analysis}
          </pre>

        </div>
      )}

    </div>
  );
};

export default ResumeAnalyzer;