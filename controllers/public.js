import URL from "../models/url.js";

export async function handleRedirectToOriginalURL(req, res) {
    try {
        const { shortId } = req.params;
        const entry = await URL.findOne({ shortId }).lean();

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        // Redirect visitor immediately
        res.redirect(entry.redirectURL);

        // Record clickCount asynchronously in the background
        URL.updateOne(
            { shortId },
            {
                $inc: { clickCount: 1 },
            },
        ).catch((err) => {
            console.error(
                `Failed to increment clickCount for shortId ${shortId}:`,
                err,
            );
        });
    } catch (error) {
        console.error("Redirect error:", error);
        return res.status(500).send("Server Error");
    }
}
