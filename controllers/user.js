import bcrypt from "bcrypt";
import User from "../models/user.js";
import { createSession, deleteSession } from "../services/auth.js";

export async function handlePostUserSignUp(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send("All fields are required");
        }
        const cleanEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: cleanEmail });
        if (existingUser) {
            return res.redirect("/user/signup");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email: cleanEmail,
            password: hashedPassword,
        });
        return res.redirect("/urls");
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).send("Server Error");
    }
}

export async function handleGetUserSignup(req, res) {
    try {
        return res.render("signup", { error: null });
    } catch (error) {
        console.error("Error loading login page:", error);
        return res.status(500).send("Server Error");
    }
}

export async function handlePostUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }
        const cleanEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: cleanEmail });
        if (!user) {
            return res.redirect("/user/login");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.redirect("/user/login");
        }
        const sessionId = createSession(user);
        res.cookie("uid", sessionId);
        return res.redirect("/urls");
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send("Server Error");
    }
}

export async function handleGetUserLogin(req, res) {
    try {
        return res.render("login", { error: null });
    } catch (error) {
        console.error("Error loading signup page:", error);
        return res.status(500).send("Server Error");
    }
}

export function handleUserLogout(req, res) {
    const sessionId = req.cookies.uid;
    deleteSession(sessionId);
    res.clearCookie("uid");
    return res.redirect("/user/login");
}
