// src/app.js
import express from "express";
import router from "./routes.js";

const app = express();
app.use(express.json());

// All API routes will be under /api/v1
app.use("/api/v1", router);

export default app;
