import express from 'express';
import { Getlogin } from '../controller/login';

const router = express.Router();

router.get("/login", Getlogin);

export default router;