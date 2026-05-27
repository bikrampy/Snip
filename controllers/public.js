import URL from "../models/url.js";

export async function handleRedirectToOriginalURL(req, res) {
    try {
        const { shortId } = req.params;
        const entry = await URL.findOne({
            shortId,
        }).lean();
        if (!entry) {
            return res.status(404).send("Short URL not found");
        }
        return res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Redirect error:", error);
        return res.status(500).send("Server Error");
    }
}
