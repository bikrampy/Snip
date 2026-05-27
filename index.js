import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import { connectMongoDB } from "./connection.js";
import mainRouter from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8000;

connectMongoDB(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected successfully.");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

// Mount the aggregator router
app.use("/", mainRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
