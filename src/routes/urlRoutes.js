import { Router } from "express";
import { validateDelete, validateSchemaUrls } from "../middlewares/urlsMiddlewares.js";
import { postUrl, getUrlId, openUrl, deleteUrl } from "../controllers/urlsControllers.js";


const router = Router();

router.post("/urls/shorten", validateSchemaUrls, postUrl);
router.get("/urls/:id", getUrlId);
router.get("/urls/open/:shortUrl", openUrl);
router.delete("/urls/:id", validateDelete, deleteUrl);

export default router;