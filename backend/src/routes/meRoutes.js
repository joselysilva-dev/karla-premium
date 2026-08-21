import { Router } from "express";
import { claimVisitor, getMe, updateMe } from "../controllers/meController.js";
import { getPremiumAccess } from "../controllers/premiumAccessController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();
router.use(['/me', '/auth/claim-visitor'], requireAuth);
router.get("/me/access", getPremiumAccess);
router.get("/me", getMe);
router.patch("/me", updateMe);
router.post("/auth/claim-visitor", claimVisitor);
export default router;
