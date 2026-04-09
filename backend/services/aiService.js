const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

exports.analyzeResumeAI = async (resumeText) => {

  const prompt = `
You are an AI career advisor.

Analyze the resume and provide:

1. Resume score out of 100
2. Strengths
3. Weaknesses
4. Improvements required
5. Suggested job roles
6. 3 interview questions based on the resume

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