import { Router } from "express";
import { chatController } from "../controllers/chatController.js";
import {
  getChatHistory,
  listChatConversations,
} from "../controllers/chatHistoryController.js";

const router = Router();

router.post("/chat", chatController);
router.get("/chat/conversations", listChatConversations);
router.get("/chat/history/:conversationId", getChatHistory);

export default router;
