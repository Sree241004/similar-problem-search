import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ status: "ok", message: "Health check passed ✅" });
});

export default router;
