import express from "express";
import { checkAuth } from "../middlewares/auth.js";
import {
    renderLandingPage,
    renderSignupPage,
    renderLoginPage,
    renderDashboard,
    renderSingleURLDetails,
    renderAnalytics,
} from "../controllers/views.js";

const viewRouter = express.Router();

viewRouter.get("/", renderLandingPage);
viewRouter.get("/signup", renderSignupPage);
viewRouter.get("/login", renderLoginPage);
viewRouter.get("/dashboard", checkAuth, renderDashboard);
viewRouter.get("/dashboard/url/:shortId", checkAuth, renderSingleURLDetails);
viewRouter.get("/dashboard/analytics/:shortId", checkAuth, renderAnalytics);

export default viewRouter;
