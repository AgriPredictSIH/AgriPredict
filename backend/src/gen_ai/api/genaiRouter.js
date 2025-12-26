import express from "express";
import { diseaseController } from "../controllers/diseaseController.js";
import { chatController } from "../controllers/chatController.js";
import { ragAdd, ragQuery } from "../controllers/ragController.js";
import { hybridController } from "../controllers/hybridController.js";
import { protect } from "../../middlewares/authMiddleware.js";
import { getCropHistory } from "../controllers/cropHistoryController.js";
const router = express.Router();

router.get("/health", (_, res) => res.json({ status: "ok" }));

router.post("/chat",protect, chatController);
router.post("/rag/add", ragAdd);
router.post("/rag/query", ragQuery);
router.post("/hybrid", protect,hybridController);
router.get("/crop-history", protect, getCropHistory);
router.post("/disease", diseaseController);


export default router;
