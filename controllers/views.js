import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import Url from "../models/url.js";

export function renderLandingPage(req, res) {
    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, process.env.SECRET_KEY);
            return res.redirect("/dashboard");
        } catch (error) {
            return res.render("landing");
        }
    }
    return res.render("landing");
}

export function renderSignupPage(req, res) {
    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, process.env.SECRET_KEY);
            return res.redirect("/dashboard");
        } catch (error) {}
    }
    return res.render("signup");
}

export function renderLoginPage(req, res) {
    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, process.env.SECRET_KEY);
            return res.redirect("/dashboard");
        } catch (error) {}
    }
    return res.render("login");
}

export async function renderDashboard(req, res) {
    try {
        const allURLs = await Url.find({
            createdBy: req.user._id,
        })
            .sort({ createdAt: -1 })
            .lean();
        return res.render("home", {
            allURLs: allURLs,
            user: req.user,
        });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return res.status(500).send("Server Error");
    }
}

export async function renderSingleURLDetails(req, res) {
    try {
        const entry = await Url.findOne({
            shortId: req.params.shortId,
            createdBy: req.user._id,
        }).lean();
        if (!entry) {
            return res.status(404).send("Short URL not found");
        }
        return res.render("single-url", { url: entry });
    } catch (error) {
        console.error("Error fetching URL:", error);
        return res.status(500).send("Server Error");
    }
}

export async function renderAnalytics(req, res) {
    try {
        const entry = await Url.findOne({
            shortId: req.params.shortId,
            createdBy: req.user._id,
        }).lean();

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        return res.render("analytics", {
            url: entry,
            totalClicks: entry.clickCount || 0,
        });
    } catch (error) {
        console.error("Error loading analytics:", error);
        return res.status(500).send("Server Error");
    }
}
