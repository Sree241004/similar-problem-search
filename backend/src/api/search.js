import { Router } from "express";
import { connectToDB } from "../db/mongo.js";
import { embedText } from "../embeddings/embeddings.js";

const router = Router();

router.get("/search", async (req, res) => {
  const { query, k = 10 } = req.query;
  const db = await connectDB();
  const problems = db.collection("problems");

  // 1. Keyword Search
  const keywordResults = await problems
    .find({ $text: { $search: query } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .limit(Number(k))
    .toArray();

  if (keywordResults.length > 0) {
    return res.json(keywordResults);
  }

  // 2. Semantic Search (Atlas Vector Search)
  const embedding = await embedText(query);
  const semanticResults = await problems
    .aggregate([
      {
        $vectorSearch: {
          queryVector: embedding,
          path: "embedding",
          numCandidates: 200,
          limit: Number(k),
          index: "EmbeddingIndex",
        },
      },
    ])
    .toArray();

  res.json(semanticResults);
});

export default router;
