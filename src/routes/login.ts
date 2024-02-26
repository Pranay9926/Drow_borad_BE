import express from 'express';
import { Getlogin } from '../controller/login';

const router = express.Router();

router.post("/login", Getlogin);

export default router;