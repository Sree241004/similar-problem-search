import express from "express";
import dotenv from "dotenv";
import ingestRoutes from "./src/api/ingest.js";
import searchRoutes from "./src/api/search.js";   // 👈 import

dotenv.config();

const app = express();
app.use(express.json());

// Mount routes
app.use("/api/v1", ingestRoutes);  // 👈 adds POST + GET for /ingest
app.use("/api/v1", searchRoutes);  // 👈 adds /search

// Health check
app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
