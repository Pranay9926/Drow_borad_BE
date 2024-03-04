import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (err: any) {
    // console.log("this is your error", err);
    res.status(400).send(err.errors[0].message);
  }
};
