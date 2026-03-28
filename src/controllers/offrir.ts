import { Request, Response } from "express";
import * as offrirService from "../services/offrir";
import { NotFoundError, BadRequestError, UnauthorizedError } from "../error";
import { CreateOffrirDTO, UpdateOffrirDTO } from "../models/offrir";
import { TokenPayload } from "../utils/token";
import logger from "../utils/logger";

// à redéfinir : cette table est une table de liaison entre les médicaments et les rapports, elle n'a pas d'identifiant propre, 

export async function listAllOffre(req: Request, res: Response): Promise<void> {
    const payload: TokenPayload | undefined = req.visiteur;
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    const offre = await offrirService.getAllOffreByVisiteur(payload.id);
    logger.info(`${offre.length} offres récupérées pour le visiteur ${payload.id}`);
    res.status(200).json(offre);
};

export async function listOffreByID(req: Request, res: Response): Promise<void> {
    const payload: TokenPayload | undefined = req.visiteur;
    const idrapport = Number(req.params.idRapport);
    const idmedicament = req.params.idMedicament as string;
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    const offre = await offrirService.getOffreByIDAndVisiteur(idrapport, idmedicament, payload.id);
    
    if (!offre) {
        logger.warn(`Tentative d'accès à une offre inexistante : ${idrapport}-${idmedicament}`);
        throw new NotFoundError('Offre non trouvée');
    }
    
    logger.info(`Offre ${idrapport}-${idmedicament} récupérée pour le visiteur ${payload.id}`);
    res.status(200).json(offre);
};

export async function createOffre(req: Request, res: Response): Promise<void> {
    const payload: TokenPayload | undefined = req.visiteur;
    const data : CreateOffrirDTO = req.body;
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    if (data.idrapport === undefined || data.idrapport === null) {
        throw new BadRequestError('Le champ idrapport est requis');
    }
    if (!data.idmedicament) {
        throw new BadRequestError('Le champ idmedicament est requis');
    }
    if (data.quantite === undefined || data.quantite === null) {
        throw new BadRequestError('Le champ quantite est requis');
    }
    
    const offre = await offrirService.createOffreByVisiteur(data, payload.id);
    logger.info(`Nouvelle offre créée pour le visiteur ${payload.id}`);
    res.status(201).json(offre);
};

export async function updateOffreByID(req: Request, res: Response): Promise<void> {
    const payload: TokenPayload | undefined = req.visiteur;
    const idrapport = Number(req.params.idRapport);
    const idmedicament = req.params.idMedicament as string;
    const data : UpdateOffrirDTO = req.body;
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de mise à jour sont requises');
    }
    
    const offre = await offrirService.updateOffreByIDAndVisiteur(idrapport, idmedicament, data, payload.id);
    
    if (!offre) {
        throw new NotFoundError('Offre non trouvée');
    }
    
    logger.info(`Offre ${idrapport}-${idmedicament} mise à jour pour le visiteur ${payload.id}`);
    res.status(200).json(offre);
};

export async function deleteOffreByID(req: Request, res: Response): Promise<void> {
    const payload: TokenPayload | undefined = req.visiteur;
    const idrapport = Number(req.params.idRapport);
    const idmedicament = req.params.idMedicament as string;
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    const offre = await offrirService.deleteOffreByIDAndVisiteur(idrapport, idmedicament, payload.id);
    
    if (!offre) {
        throw new NotFoundError('Offre non trouvée');
    }
    
    logger.info(`Offre ${idrapport}-${idmedicament} supprimée pour le visiteur ${payload.id}`);
    res.status(200).json(offre);
};