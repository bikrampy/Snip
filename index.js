import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ejs from "ejs";
import path from "path";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./connection.js";
import { getUser } from "./services/auth.js";

import urlRouter from "./routes/url.js";
import userRouter from "./routes/user.js";

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
app.use((req, res, next) => {
    const sessionId = req.cookies.uid;

    if (sessionId) {
        const user = getUser(sessionId);
        req.user = user;
        res.locals.user = user;
    }

    next();
});

app.get("/", (req, res) => {
    res.render("landing");
});
app.use("/urls", urlRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
