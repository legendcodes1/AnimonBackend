// middleware/authMiddleware.ts
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    const decoded = jwt.decode(token) as any;
    req.userId = decoded?.sub;
    
    if (!req.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};