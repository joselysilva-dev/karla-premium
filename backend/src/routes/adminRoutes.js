import { Router } from "express";
import { requireAdmin, requireAdminAal2 } from "../middleware/requireAdmin.js";
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
import {
  getClientPremiumAccess,
  inviteClientPremiumAccess,
  updatePremiumAccessStatus,
} from "../controllers/adminPremiumAccessController.js";

const router = Router();
router.get("/me", requireAdmin, getCurrentAdmin);
router.use(requireAdminAal2);
router.get("/dashboard", getDashboard);
router.get("/clients", listClients);
router.get("/clients/:id", getClient);
router.patch("/clients/:id", updateClient);
router.get("/clients/:id/premium-access", getClientPremiumAccess);
router.post("/clients/:id/premium-access", inviteClientPremiumAccess);
router.patch("/premium-access/:id", updatePremiumAccessStatus);
router.get("/conversations", listConversations);
router.get("/conversations/:id", getConversation);
router.get("/settings", getSettings);
router.patch("/settings", updateSettings);

export default router;
