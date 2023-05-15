import { NextFunction, Request, Response } from "express";
export declare const requireAuth: (role: string) => (req: Request, res: Response, next: NextFunction) => void;
