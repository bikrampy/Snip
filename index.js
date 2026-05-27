import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ejs from "ejs";
import path from "path";
import cookieParser from "cookie-parser";

import { connectMongoDB } from "./connection.js";

import urlRouter from "./routes/url.js";
import userRouter from "./routes/user.js";

import { handleRedirectToOriginalURL } from "./controllers/public.js";

const app = express();
const PORT = process.env.PORT;

connectMongoDB(process.env.MONGO_URL).then((data) => {
    console.log("MongoDB connected successfully.");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

import jwt from "jsonwebtoken";

app.get("/", (req, res) => {
    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, process.env.SECRET_KEY);
            return res.redirect("/urls");
        } catch (error) {
            return res.render("landing");
        }
    }
    return res.render("landing");
});
app.use("/urls", urlRouter);
app.use("/user", userRouter);
app.get("/:shortId", handleRedirectToOriginalURL);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
