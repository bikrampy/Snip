import { getUser } from "../services/auth.js";

export function checkAuth(req, res, next) {
    const sessionId = req.cookies.uid;
    if (!sessionId) {
        return res.redirect("/user/login");
    }
    const user = getUser(sessionId);
    if (!user) {
        return res.redirect("/user/login");
    }
    req.user = user;
    next();
}
