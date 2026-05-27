import express from "express";

import {
    handleGetAllUrls,
    handleGenerateNewShortURL,
    handleDeleteURL,
    handleGetSingleURL,
} from "../controllers/url.js";

import { checkAuth } from "../middlewares/auth.js";

const urlRouter = express.Router();

urlRouter.get("/", checkAuth, handleGetAllUrls);
urlRouter.post("/", checkAuth, handleGenerateNewShortURL);
urlRouter.post("/delete/:id", checkAuth, handleDeleteURL);
urlRouter.get("/url/:id", checkAuth, handleGetSingleURL);

export default urlRouter;
