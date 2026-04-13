const fs = require("fs");
const pdfParse = require("pdf-parse");
const { analyzeResumeAI } = require("../services/aiService");

exports.analyzeResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No resume uploaded"
      });
    }

    const filePath = req.file.path;
    const role = req.body.role || "Software Developer";

    // read uploaded file
    const buffer = fs.readFileSync(filePath);

    // extract pdf text
    const data = await pdfParse(buffer);

    const resumeText = data.text;

    // send text to AI service
   const aiResult = await analyzeResumeAI(resumeText, role);

    // delete file after processing
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      analysis: aiResult
    });

  } catch (error) {

    console.error("Resume analysis error FULL:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};