import { Request, Response } from 'express';
import { loginUser } from '../service/loginUser';


export const Getlogin = async (req: Request, res: Response) => {
    console.log(req.body.email);
    try {
        // Create a new user
        const userValue = await loginUser(req);
        console.log("this is your value ", userValue);
        if (userValue?.status == 404)
            return res.status(404).json({ message: 'User not found' });
        if (userValue?.status == 401)
            return res.status(401).json({ message: 'Invalid password' });
        return res.status(200).json({ message: 'Login successful', userValue });
    } catch (error: any) {
        return res.status(400).json({ message: error.errors[0].message });
    }
}