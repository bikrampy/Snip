import express from "express";
import {
    handlePostUserSignUp,
    handlePostUserLogin,
    handleUserLogout,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/signup", handlePostUserSignUp);
userRouter.post("/login", handlePostUserLogin);
userRouter.get("/logout", handleUserLogout);

export default userRouter;
