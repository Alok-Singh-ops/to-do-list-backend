// auth-middleware.ts
import { Request, Response, NextFunction } from "express";
import { User, userManager } from "../Maganers/UserManager";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authenticate(
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.header("Authorization");
  try {
    if (!authHeader) {
      throw new Error("Unauthorized - Token not provided");
    }
    const decoded = jwt.verify(authHeader, "sad2023") as JwtPayload;
    if (!decoded || typeof decoded !== "object" || !("emailId" in decoded)) {
      throw new Error("Unauthorized - Invalid token");
    }
    const emailId = decoded.emailId;
    const expirationTime = decoded.exp ? decoded.exp * 1000 : 0;
    // Check if the token has expired
    const user = userManager.findUserById(emailId);
    if (!user) {
      throw new Error("Unauthorized - User not found");
    }

    req.user = user;
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);
    // Send a 401 response only if the response hasn't been sent yet
    res.status(401).send(error.message);
  }
}
