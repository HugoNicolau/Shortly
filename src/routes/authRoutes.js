import { Router } from "express";
import { validateSchemaLogin, validateSchemaUsers } from "../middlewares/usersMiddlewares.js";
import { postSignIn, postSignUp } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", validateSchemaUsers, postSignUp);
router.post("/signin", validateSchemaLogin, postSignIn);

export default router;