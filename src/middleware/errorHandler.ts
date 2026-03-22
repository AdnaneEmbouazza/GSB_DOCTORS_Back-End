import {Request , Response , NextFunction} from "express";
import { AppError , NotFoundError , InternalServerError , BadRequestError , UnauthorizedError , ForbiddenError } from "../error";
import logger from "../utils/logger";

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        logger.error(`[${req.method} ${req.url}] ${err.name}: ${err.statusCode} - ${err.message}`); // Log de l'erreur avec les détails de la requête

        // Envoi de la réponse au client
        return res.status(err.statusCode).json({
            success : false,
            error : err.message,
            statusCode : err.statusCode
        });
    }
    else {
        logger.error(`Erreur Serveur : ${err.message} , {stack : ${err.stack}}`); // Log de l'erreur serveur
        res.status(500).json({
            success : false,
            error : "Une erreur interne est survenue. Veuillez réessayer plus tard.",
            statusCode : 500
        });
    }

    next(); // Passage au middleware suivant (si nécessaire)
};