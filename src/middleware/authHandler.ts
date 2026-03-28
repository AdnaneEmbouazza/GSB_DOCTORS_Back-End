import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../error";
import { verifyAccessToken, extractTokenFromHeader, generateAccessToken, TokenPayload } from "../utils/token";

// Étendre le type Request pour ajouter les données du visiteur
declare global {
    namespace Express {
        interface Request {
            visiteur?: TokenPayload;
        }
    }
}

/**
 * MIDDLEWARE POUR VERIFIER SI L'UTILISATEUR EST CONNECTE AVANT D'ACCEDER A CERTAINES ROUTES
 * Extrait le token JWT du cookie HttpOnly et le valide
 * Ajoute les données du visiteur à req.visiteur si valide
 * Génère un nouveau token (sliding window) et l'ajoute au cookie de réponse
 */
export const isloggedOn = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Récupérer le token depuis le cookie au lieu du header
        const token = req.cookies.authToken;

        if (!token) {
            throw new UnauthorizedError('Token d\'authentification manquant');
        }

        const payload = verifyAccessToken(token);
        req.visiteur = payload;
        
        // Générer un nouveau token (sliding window) - réinitialise la durée d'expiration
        // Extraire juste id et login du payload (sans exp, iat, etc.)
        const newToken = generateAccessToken({ 
            id: payload.id, 
            login: payload.login 
        });
        
        // Envoyer le nouveau token en HttpOnly cookie
        res.cookie('authToken', newToken, {
            httpOnly: true,      // Pas accessible à JavaScript (prévient XSS)
            secure: process.env.NODE_ENV === 'production', // HTTPS seulement en prod
            sameSite: 'strict',  // CSRF protection
            maxAge: 15 * 60 * 1000 // 15 minutes en millisecondes
        });
        
        next();
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            throw error;
        }
        throw new UnauthorizedError(error instanceof Error ? error.message : 'Authentification échouée');
    }
};
