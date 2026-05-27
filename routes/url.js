import express from "express";
import {
    handleGenerateNewShortURL,
    handleDeleteURL,
} from "../controllers/url.js";
import { checkAuth } from "../middlewares/auth.js";

const urlRouter = express.Router();

urlRouter.use(checkAuth);

urlRouter.post("/", handleGenerateNewShortURL);
urlRouter.post("/delete/:id", handleDeleteURL);

export default urlRouter;
