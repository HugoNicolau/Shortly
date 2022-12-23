import { Router } from "express";
import { validateToken } from "../middlewares/usersMiddlewares.js";
import { getUser } from "../controllers/usersControllers.js"
const router = Router();

router.get("/users/me", validateToken, getUser);

export default router;