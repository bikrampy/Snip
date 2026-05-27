import express from "express";
import viewRouter from "./views.js";
import urlRouter from "./url.js";
import userRouter from "./user.js";
import redirectRouter from "./redirect.js";

const mainRouter = express.Router();

// 1. Render/View Routes
mainRouter.use("/", viewRouter);

// 2. Authentication API/Action Routes
mainRouter.use("/user", userRouter);

// 3. URL API/Action Routes
mainRouter.use("/urls", urlRouter);

// 4. Public Short Link Redirect Route (mounted last so it doesn't conflict with static sub-paths)
mainRouter.use("/", redirectRouter);

export default mainRouter;
