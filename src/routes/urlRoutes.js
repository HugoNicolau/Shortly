import { Router } from "express";
import { validateSchemaUrls } from "../middlewares/urlsMiddlewares.js";
import { postUrl, getUrlId } from "../controllers/urlsControllers.js";

const router = Router();

router.post("/urls/shorten", validateSchemaUrls, postUrl);
router.get("/urls/:id", getUrlId);

export default router;