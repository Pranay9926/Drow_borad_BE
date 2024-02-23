import { Request, Response } from 'express';


export const Getlogin =async (req:Request,res:Response) => {
    res.json({ message: "Hello, API!" });
    console.log("hit api");
    
}