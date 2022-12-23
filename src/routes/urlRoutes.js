import { Router } from "express";
import { validateSchemaUrls } from "../middlewares/urlsMiddlewares.js";
import { postUrl } from "../controllers/urlsControllers.js";

const router = Router();

router.post("/urls/shorten", validateSchemaUrls, postUrl);


export default router;