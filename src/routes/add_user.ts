import express from "express";
import { Add_user } from "../controller/adduser";
import { userMiddleware } from "../middleware/userMiddleware";

const router = express.Router();

router.post("/add_user", userMiddleware, Add_user);

export default router;
