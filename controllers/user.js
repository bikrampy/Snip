import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export async function handlePostUserSignUp(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send("All fields are required");
        }
        const cleanEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: cleanEmail });
        if (existingUser) {
            return res.redirect("/signup");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email: cleanEmail,
            password: hashedPassword,
        });
        return res.redirect("/login");
    } catch (error) {
        console.error("Signup error:", error);
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
            return res.redirect("/login");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.redirect("/login");
        }
        const token = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000, // 1 hour
        });
        return res.redirect("/dashboard");
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send("Server Error");
    }
}

export function handleUserLogout(req, res) {
    res.clearCookie("token");
    return res.redirect("/login");
}
