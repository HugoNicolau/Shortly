import { Router } from "express";
import { validateSchemaUrls } from "../middlewares/urlsMiddlewares.js";
import { postUrl, getUrlId, openUrl } from "../controllers/urlsControllers.js";


const router = Router();

router.post("/urls/shorten", validateSchemaUrls, postUrl);
router.get("/urls/:id", getUrlId);
router.get("/urls/open/:shortUrl", openUrl);


export default router;