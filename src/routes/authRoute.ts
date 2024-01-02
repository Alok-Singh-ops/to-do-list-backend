import express from "express";
import { UserController } from "../controllers/userController";

const authRouter = express.Router();

authRouter.post("/signUp", UserController.signUp);
authRouter.post("/signIn", UserController.signIn);

export default authRouter;
