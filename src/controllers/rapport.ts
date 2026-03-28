import { Request, Response } from "express";
import * as rapportService from "../services/rapport";
import { NotFoundError, BadRequestError, UnauthorizedError } from "../error";
import { TokenPayload } from "../utils/token";
import logger from "../utils/logger";
import { CreateRapportDTO, UpdateRapportDTO } from "../models/rapport";

export async function listAllRapport(req: Request, res: Response): Promise<void> {
    const payload: TokenPayload | undefined = req.visiteur;
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    const rapport = await rapportService.getAllRapportsByVisiteur(payload.id);
    logger.info(`${rapport.length} rapports récupérés pour le visiteur ${payload.id}`);
    res.status(200).json(rapport);
};

export async function getRapportsByDate(req: Request, res: Response): Promise<void> {
    const { date, idvisiteur } = req.query;
    
    if (!date || typeof date !== 'string' || !date.trim()) {
        throw new BadRequestError('La date est requise au format YYYY-MM-DD');
    }
    
    // Valider le format de la date
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        throw new BadRequestError('Format de date invalide. Utilisez le format YYYY-MM-DD');
    }
    
    // Utiliser l'idvisiteur fourni ou celui de l'utilisateur connecté
    let visiteurId: number;
    if (idvisiteur && typeof idvisiteur === 'string') {
        visiteurId = Number(idvisiteur);
        if (isNaN(visiteurId)) {
            throw new BadRequestError('idvisiteur doit être un nombre');
        }
    } else {
        const payload: TokenPayload | undefined = req.visiteur;
        if (!payload) {
            throw new UnauthorizedError('Token invalide');
        }
        visiteurId = payload.id;
    }
    
    const rapports = await rapportService.getRapportsByVisiteurAndDate(visiteurId, date);
    logger.info(`${rapports.length} rapports récupérés pour le visiteur ${visiteurId} à la date ${date}`);
    res.status(200).json(rapports);
};

export async function listRapportByID(req: Request, res: Response): Promise<void> {
    const payload: TokenPayload | undefined = req.visiteur;
    const id = Number(req.params.id);
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    const rapport = await rapportService.getRapportByIDAndVisiteur(id, payload.id);
    
    if (!rapport) {
        logger.warn(`Tentative d'accès à un rapport inexistant : ${id}`);
        throw new NotFoundError('Rapport non trouvé');
    }
    
    logger.info(`Rapport ${id} récupéré pour le visiteur ${payload.id}`);
    res.status(200).json(rapport);
};

export async function createRapport(req: Request, res: Response): Promise<void> {
    const payload: TokenPayload | undefined = req.visiteur;
    const data : CreateRapportDTO = req.body;
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }

    if (!data.date || !data.bilan || !data.motif || data.idmedecin === undefined) {
        throw new BadRequestError('Tous les champs sont requis');
    }

    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données du rapport sont requises');
    }
    
    const rapport = await rapportService.createRapportByVisiteur(data, payload.id);
    logger.info(`Nouveau rapport créé pour le visiteur ${payload.id}`);
    res.status(201).json(rapport);
};

export async function updateRapportByID(req: Request, res: Response): Promise<void> {
    const payload: TokenPayload | undefined = req.visiteur;
    const id = Number(req.params.id); 
    const data : UpdateRapportDTO = req.body;
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de mise à jour sont requises');
    }
    
    const rapport = await rapportService.updateRapportByIDAndVisiteur(id, data, payload.id);
    
    if (!rapport) {
        throw new NotFoundError('Rapport non trouvé');
    }
    
    logger.info(`Rapport ${id} mis à jour pour le visiteur ${payload.id}`);
    res.status(200).json(rapport);
};

export async function deleteRapportByID(req: Request, res: Response): Promise<void> {
    const payload: TokenPayload | undefined = req.visiteur;
    const id = Number(req.params.id);
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    const rapport = await rapportService.deleteRapportByIDAndVisiteur(id, payload.id);
    
    if (!rapport) {
        throw new NotFoundError('Rapport non trouvé');
    }
    
    logger.info(`Rapport ${id} supprimé pour le visiteur ${payload.id}`);
    res.status(200).json(rapport);
};