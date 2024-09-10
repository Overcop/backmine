import { Router } from "express";
import { browse } from "../../controllers/auth.action.js";

const router = Router();

router.get("/", browse)

export default router;