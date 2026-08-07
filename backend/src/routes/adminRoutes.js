import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  getClient,
  getConversation,
  getCurrentAdmin,
  getDashboard,
  getSettings,
  listClients,
  listConversations,
  updateClient,
  updateSettings,
} from "../controllers/adminController.js";

const router = Router();
router.use(requireAdmin);
router.get("/me", getCurrentAdmin);
router.get("/dashboard", getDashboard);
router.get("/clients", listClients);
router.get("/clients/:id", getClient);
router.patch("/clients/:id", updateClient);
router.get("/conversations", listConversations);
router.get("/conversations/:id", getConversation);
router.get("/settings", getSettings);
router.patch("/settings", updateSettings);

export default router;
