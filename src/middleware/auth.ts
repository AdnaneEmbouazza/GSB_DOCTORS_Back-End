import { Request, Response, NextFunction } from "express";

// MIDDLEWARE POUR VERIFIER SI L'UTILISATEUR EST CONNECTE AVANT D'ACCEDER A CERTAINES ROUTES
export const isloggedOn = (req: Request, res: Response, next: NextFunction) => {};

// MIDDLEWARE POUR VERIFIER SI L'UTILISATEUR A LE ROLE ADMIN AVANT D'ACCEDER A CERTAINES ROUTES
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {};

// MIDDLEWARE POUR LOGUER LES REQUETES ENTRANTES 
export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString(); // Obtenir la date et l'heure actuelles au format ISO
    console.log(`[${timestamp}] ${req.method} ${req.url}`); // Afficher la méthode HTTP et l'URL de la requête

    next(); // Passage au middleware suivant
};