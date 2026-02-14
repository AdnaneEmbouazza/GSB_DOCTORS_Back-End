import { Request, Response, NextFunction } from "express";

// MIDDLEWARE POUR VERIFIER SI L'UTILISATEUR EST CONNECTE AVANT D'ACCEDER A CERTAINES ROUTES
export const isloggedOn = (req: Request, res: Response, next: NextFunction) => {}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {}