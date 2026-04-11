import express from "express";
import {
    handleGetAllUrls,
    handleGenerateNewShortURL,
    handleRedirectToOriginalURL,
    handleGetSingleURL,
} from "../controllers/url.js";
import { checkAuth } from "../middlewares/auth.js";

const urlRouter = express.Router();

urlRouter.get("/", checkAuth, handleGetAllUrls);
urlRouter.post("/", checkAuth, handleGenerateNewShortURL);
urlRouter.get("/u/:id", handleRedirectToOriginalURL);
urlRouter.get("/url/:id", checkAuth, handleGetSingleURL);

export default urlRouter;
