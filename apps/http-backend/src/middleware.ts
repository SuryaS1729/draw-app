import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction): void {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return; // ✅ Ensure function exits
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        if (!decoded) {
            res.status(403).json({ message: "Unauthorized: Invalid token" });
            return; // ✅ Ensure function exits
        }

        // @ts-ignore TODO
        req.userId = decoded.userId;
        next(); // ✅ Correctly calls the next middleware
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(403).json({ message: "Unauthorized: Invalid token" });
        return; // ✅ Ensure function exits
    }
}