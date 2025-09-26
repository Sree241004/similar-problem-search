import { Router } from "express";
import { connectToDB } from "../db/mongo.js";
import { embedText } from "../embeddings/embeddings.js";

const router = Router();

/**
 * POST /api/v1/ingest
 * Insert a new problem with embedding
 */
router.post("/ingest", async (req, res) => {
  try {
    const { title, description, difficulty, tags } = req.body;
    console.log("📥 Incoming body:", req.body);

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    // Connect to DB
    const db = await connectToDB();
    console.log("✅ Connected to MongoDB");

    const problems = db.collection("problems");

    // Generate embedding
    const embedding = await embedText(description);
    console.log("✅ Generated embedding, length:", embedding?.length);

    const newProblem = {
      title,
      description,
      difficulty: difficulty || "unspecified",
      tags: tags || [],
      embedding,
      createdAt: new Date(),
    };

    await problems.insertOne(newProblem);
    console.log("✅ Problem inserted into Mongo");

    res.json({ message: "Problem inserted successfully", problem: newProblem });
  } catch (err) {
    console.error("❌ Error inserting problem:", err);
    res.status(500).json({ error: err.message || "Failed to insert problem" });
  }
});

/**
 * GET /api/v1/ingest
 * Fetch all problems
 */
router.get("/ingest", async (req, res) => {
  try {
    const db = await connectToDB();
    console.log("✅ Connected to MongoDB");

    const problems = db.collection("problems");
    const allProblems = await problems.find().toArray();

    console.log(`📦 Found ${allProblems.length} problems`);
    res.json(allProblems);
  } catch (err) {
    console.error("❌ Error fetching problems:", err);
    res.status(500).json({ error: err.message || "Failed to fetch problems" });
  }
});

export default router;
