import { nanoid } from "nanoid";
import URL from "../models/url.js";

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
            return res.redirect(`/dashboard/url/${existing.shortId}`);
        }
        const newShortId = nanoid(10);
        const newUrl = await URL.create({
            shortId: newShortId,
            redirectURL: url,
            createdBy: req.user._id,
        });
        return res.redirect(`/dashboard/url/${newUrl.shortId}`);
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

        return res.redirect("/dashboard");
    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).send("Server Error");
    }
}
