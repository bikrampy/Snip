import express from "express";
import { handleRedirectToOriginalURL } from "../controllers/public.js";

const redirectRouter = express.Router();

redirectRouter.get("/:shortId", handleRedirectToOriginalURL);

export default redirectRouter;
