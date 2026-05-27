import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export function checkAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/login");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.redirect("/login");
    }
}
