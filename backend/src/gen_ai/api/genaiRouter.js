import express from "express";
import { chatController } from "../controllers/chatController.js";
import { ragAdd, ragQuery } from "../controllers/ragController.js";
import { hybridController } from "../controllers/hybridController.js";
import { protect } from "../../middlewares/authMiddleware.js";
import { getCropHistory } from "../../controllers_backend/cropHistoryController.js";
const router = express.Router();

router.get("/health", (_, res) => res.json({ status: "ok" }));

router.post("/chat", chatController);
router.post("/rag/add", ragAdd);
router.post("/rag/query", ragQuery);
router.post("/hybrid", protect,hybridController);
router.get("/crop-history", protect, getCropHistory);


export default router;
