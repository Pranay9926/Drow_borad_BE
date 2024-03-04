import express from "express";
import { Getlogin } from "../controller/login";
import { loginMiddleware } from "../middleware/loginMiddleware";

const router = express.Router();

router.post("/login", loginMiddleware, Getlogin);

export default router;
