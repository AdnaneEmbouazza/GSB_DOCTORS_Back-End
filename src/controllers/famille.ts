import { Request, Response } from "express";
import * as familleService from "../services/famille";
import { NotFoundError, BadRequestError } from "../error";
import logger from "../utils/logger";

export async function listAllFamilles(req: Request, res: Response): Promise<void> {
    const familles = await familleService.getAllFamilles();
    logger.info(`${familles.length} familles récupérées`);
    res.json(familles);
}

export async function listFamilleByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const famille = await familleService.getFamilleByID(id);
    
    if (!famille) {
        logger.warn(`Tentative d'accès à une famille inexistante : ${id}`);
        throw new NotFoundError('Famille non trouvée');
    }
    
    logger.info(`Famille ${id} récupérée`);
    res.json(famille);
}

export async function createFamille(req: Request, res: Response): Promise<void> {
    const data = req.body;
    
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de la famille sont requises');
    }
    
    const newFamille = await familleService.createFamille(data);
    logger.info(`Nouvelle famille créée`);
    res.json(newFamille);
}

export async function updateFamilleByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = req.body;
    
    // Gestion erreur 400 (donnés manquantes ou invalides)
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de mise à jour sont requises');
    }
    
    const updatedFamille = await familleService.updateFamilleByID(id, data);
    
    // gestion erreur 404 (non trouvé)
    if (!updatedFamille) {
        throw new NotFoundError('Famille non trouvée');
    }
    
    logger.info(`Famille ${id} mise à jour`);
    res.json(updatedFamille);
}

export async function deleteFamilleByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    const deletedFamille = await familleService.deleteFamilleByID(id);
    
    if (!deletedFamille) {
        throw new NotFoundError('Famille non trouvée');
    }
    
    logger.info(`Famille ${id} supprimée`);
    res.json(deletedFamille);
}