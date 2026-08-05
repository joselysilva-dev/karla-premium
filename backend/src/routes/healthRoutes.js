import { Router } from "express";
import { databaseHealthController } from "../controllers/databaseHealthController.js";

const router = Router();

router.get("/health/database", databaseHealthController);

export default router;
