import { Router } from "express";
import { chatController } from "../controllers/chatController.js";
import {
  getChatHistory,
  listChatConversations,
} from "../controllers/chatHistoryController.js";
import { optionalAuth } from "../middleware/requireAuth.js";

const router = Router();

router.post("/chat", optionalAuth, chatController);
router.get("/chat/conversations", listChatConversations);
router.get("/chat/history/:conversationId", getChatHistory);

export default router;
