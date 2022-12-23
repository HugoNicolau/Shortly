import { Router } from "express";
import { validateSchemaUsers } from "../middlewares/usersMiddlewares.js";
import { postSignUp } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", validateSchemaUsers, postSignUp);


export default router;