import { nanoid } from "nanoid";
import URL from "../models/url.js";

export async function handleGetAllUrls(req, res) {
    try {
        const allURLs = await URL.find({
            createdBy: req.user._id,
        })
            .sort({ createdAt: -1 })
            .lean();
        res.render("home", {
            allURLs: allURLs,
            user: req.user,
        });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return res.status(500).send("Server Error");
    }
}

export async function handleGenerateNewShortURL(req, res) {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).send("Please provide a valid URL");
        }
        const existing = await URL.findOne({
            redirectURL: url,
            createdBy: req.user._id,
        });
        if (existing) {
            return res.redirect(`/urls/url/${existing.shortId}`);
        }
        const newShortId = nanoid(10);
        const newUrl = await URL.create({
            shortId: newShortId,
            redirectURL: url,
            createdBy: req.user._id,
        });
        return res.redirect(`/urls/url/${newUrl.shortId}`);
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).send("Server Error");
    }
}

export async function handleDeleteURL(req, res) {
    try {
        const { id } = req.params;

        await URL.findOneAndDelete({
            _id: id,
            createdBy: req.user._id,
        });

        return res.redirect("/urls");
    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).send("Server Error");
    }
}

export async function handleGetSingleURL(req, res) {
    try {
        const entry = await URL.findOne({
            shortId: req.params.id,
            createdBy: req.user._id,
        }).lean();
        if (!entry) {
            return res.status(404).send("Short URL not found");
        }
        res.render("single-url", { url: entry });
    } catch (error) {
        console.error("Error fetching URL:", error);
        return res.status(500).send("Server Error");
    }
}
