import { Request , Response , NextFunction} from "express";

/*
Ce middleware permet de gérer les erreurs dans les fonctions asynchrones des contrôleurs.
Il prend une fonction asynchrone en argument et retourne une nouvelle fonction 
qui exécute la fonction asynchrone et capture les erreurs éventuelles pour les passer au middleware de gestion des erreurs d'Express.
*/

function asyncHandler(fn : Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        // Exécute la fonction asynchrone et capture les erreurs
        Promise.resolve(fn(req, res, next))
        .catch(next);
    }
}

export default asyncHandler;