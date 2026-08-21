import { Router } from "express";
import { databaseHealthController } from "../controllers/databaseHealthController.js";

const router = Router();
router.get('/health', (req, res) => res.json({ status: 'ok', service: 'karla-premium-api' }));

router.get("/health/database", databaseHealthController);

export default router;
