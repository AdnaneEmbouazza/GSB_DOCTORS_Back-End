import { Request, Response } from "express";
import * as rapportService from "../services/rapport";
import { NotFoundError, BadRequestError } from "../error";
import logger from "../utils/logger";
import { CreateRapportDTO, UpdateRapportDTO } from "../models/rapport";

export async function listAllRapport(req: Request, res: Response): Promise<void> {
    const rapport = await rapportService.getAllRapports();
    logger.info(`${rapport.length} rapports récupérés`);
    res.status(200).json(rapport);
};

export async function listRapportByID(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const rapport = await rapportService.getRapportByID(id);
    
    if (!rapport) {
        logger.warn(`Tentative d'accès à un rapport inexistant : ${id}`);
        throw new NotFoundError('Rapport non trouvé');
    }
    
    logger.info(`Rapport ${id} récupéré`);
    res.status(200).json(rapport);
};

export async function createRapport(req: Request, res: Response): Promise<void> {
    const data : CreateRapportDTO = req.body;

    if (!data.date || !data.bilan || !data.motif || data.idmedecin === undefined || !data.idvisiteur) {
        throw new BadRequestError('Tous les champs sont requis');
    }

    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données du rapport sont requises');
    }
    
    const rapport = await rapportService.createRapport(data);
    logger.info(`Nouveau rapport créé`);
    res.status(201).json(rapport);
};

export async function updateRapportByID(req: Request, res: Response): Promise<void> {
    const  id  = Number(req.params.id); 
    const data : UpdateRapportDTO = req.body;
    
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de mise à jour sont requises');
    }
    
    const rapport = await rapportService.updateRapportByID(id, data);
    
    if (!rapport) {
        throw new NotFoundError('Rapport non trouvé');
    }
    
    logger.info(`Rapport ${id} mis à jour`);
    res.status(200).json(rapport);
};

export async function deleteRapportByID(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const rapport = await rapportService.deleteRapportByID(id);
    
    if (!rapport) {
        throw new NotFoundError('Rapport non trouvé');
    }
    
    logger.info(`Rapport ${id} supprimé`);
    res.status(200).json(rapport);
};