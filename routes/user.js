import express from "express";

import {
    handleGetUserSignup,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin,
    handleUserLogout,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/signup", handleGetUserSignup);
userRouter.post("/signup", handlePostUserSignUp);
userRouter.get("/login", handleGetUserLogin);
userRouter.post("/login", handlePostUserLogin);
userRouter.get("/logout", handleUserLogout);
export default userRouter;
