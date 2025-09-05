import express from "express";
import { Octokit } from "octokit";
import Gemini from "./gemini.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.post("/summary", async (req, res) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) return res.status(400).json({ error: "Repo URL is required" });

    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)(?:\.git)?/);
    if (!match) return res.status(400).json({ error: "Invalid GitHub repo URL" });

    const owner = match[1];
    const repo = match[2];

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const { data: repoData } = await octokit.request('GET /repos/{owner}/{repo}', { owner, repo });

    const impData = {
      name: repoData.name,
      full_name: repoData.full_name,
      html_url: repoData.html_url,
      description: repoData.description ?? "No description provided",
      owner: repoData.owner,
      language: repoData.language,
      topics: repoData.topics ?? [],
      license: repoData.license ?? null,
      created_at: repoData.created_at,
      updated_at: repoData.updated_at,
    };

    const repoString = JSON.stringify(impData, null, 2);

    const readmeData = await Gemini(repoString);

    res.status(200).json({ repoUrl, sections: readmeData });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
