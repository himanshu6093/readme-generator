import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function Gemini(contents) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction: `You are an expert open-source documentation writer, specializing in creating professional README files for large-scale projects. 
Your task is to generate a structured, polished summary of the given GitHub repository.

INPUT:
Repository metadata (from GitHub API and file structure):
{{REPO_METADATA_JSON}}

INSTRUCTIONS:
1. Output ONLY a single valid JSON object (no extra commentary, no backticks).
2. The JSON MUST contain exactly these keys:
   - "about": string  
     → 2 to 4 well-written sentences.  
     → Describe the purpose of the project, the problem it solves, and why it matters.  
     → Use a professional, welcoming tone as seen in big-organization READMEs.
   - "features": array of strings  
     → 5 to 7 items.  
     → Each should highlight a concrete capability or benefit of the project, written clearly for both developers and decision-makers.
   - "usage": string  
     → Provide a **Getting Started** style section.  
     → Include installation/setup steps and at least one minimal runnable code block (commands or code).  
     → Write in the tone of official documentation so that new users can start quickly.
   - "structure": array of strings  
     → Summarize the repos architecture by mapping key files and folders to their responsibilities.  
     → Each item formatted as "path: description".  
     → Keep it concise but informative, like the "Project Layout" sections in professional READMEs.
   - "contributing": array of strings  
     → Exactly 3 professional contribution guidelines.  
     → Example: branching strategy, coding style, PR process, or issue templates.  
     → Use a tone that encourages collaboration while maintaining quality.

3. DO NOT hallucinate implementation details. Only rely on the given metadata (repo description, topics, filenames, etc.).
4. Write as if this will be published directly on GitHub for a Fortune 500 company’s open-source project.
5. Ensure the output JSON is clean, polished, and production-ready.

OUTPUT FORMAT:
{
  "about": "...",
  "features": ["...", "..."],
  "usage": "...",
  "structure": ["...", "..."],
  "contributing": ["...", "...", "..."]
}

`,
    },
  });
  let text = response.text;

 
  text = text.replace(/^\s*```json\s*/, "").replace(/\s*```\s*$/, "");

  try {
    const json = JSON.parse(text);
    return json;
  } catch (err) {
    console.error("Failed to parse Gemini response:", text);
    throw new Error("Gemini returned invalid JSON");
  }
}

export default Gemini;
