import { Request, Response } from 'express';
import { loginUser } from '../service/loginUser';
import bcrypt from "bcrypt";
import { generateToken } from '../helpers/token';


export const Getlogin = async (req: Request, res: Response) => {
    console.log(req.body.email);
    try {
        // Create a new user
        const { email, password } = req.body;
        const userValue = await loginUser(email);
        console.log("this is your value ", userValue);
        if (!userValue) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, userValue.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = generateToken(req.body);
        console.log("this is your token value", token);
        return res.status(200).json({ message: 'Login successful', token, userValue });
    } catch (error: any) {
        console.log("this is your error");

        return res.status(400).json({ message: error });
    }
}