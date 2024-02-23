import express from 'express';
import { Add_user } from '../controller/adduser';

const router = express.Router();

router.post("/add_user", Add_user);

export default router;