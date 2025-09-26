import { Router } from "express";
import healthRoutes from "./api/health.js";
import ingestRoutes from "./api/ingest.js";
import searchRoutes from "./api/search.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/ingest", ingestRoutes);
router.use("/search", searchRoutes);

export default router;
