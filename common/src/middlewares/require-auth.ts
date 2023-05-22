import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.currentUser;
    
    if (!user || !user.role.includes(role)) {
      throw new NotAuthorizedError();
    }

    
    next();
  };
};
