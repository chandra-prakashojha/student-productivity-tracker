const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

exports.analyzeResumeAI = async (resumeText, role) => {

 const prompt = `
You are an expert ATS resume evaluator.

Analyze the following resume for the role of ${role}.

Return the analysis in the following format:

Resume Score: <score out of 100>

ATS Score: <score out of 100>

Strengths:
1. <strength>
2. <strength>

Weaknesses:
1. <weakness>
2. <weakness>

Improvements Required:
1. <suggestion>
2. <suggestion>

Suggested Job Roles:
1. <role>
2. <role>

Interview Questions:
1. <question>
2. <question>

Resume:
${resumeText}
`;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    model: "llama-3.1-8b-instant"
  });
  console.log("GROQ KEY:", process.env.GROQ_API_KEY);
  console.log("Groq key loaded:", process.env.GROQ_API_KEY);

  return {
    analysis: completion.choices[0].message.content
  };
};