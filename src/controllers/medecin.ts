import { Request, Response } from "express";
import * as medecinService from "../services/medecin";
import { NotFoundError, BadRequestError } from "../error";
import logger from "../utils/logger";
import { CreateMedecinDTO , UpdateMedecinDTO } from "../models/medecin";

export async function listAllMedecins(req: Request, res: Response): Promise<void> {
    const medecins = await medecinService.getAllMedecins();
    logger.info(`${medecins.length} médecins récupérés`);
    res.status(200).json(medecins);
};

export async function listMedecinsByID(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const medecin = await medecinService.getMedecinByID(id);
    
    if (!medecin) {
        logger.warn(`Tentative d'accès à un médecin inexistant : ${id}`);
        throw new NotFoundError('Médecin non trouvé');
    }
    
    logger.info(`Médecin ${id} récupéré`);
    res.status(200).json(medecin);
};

export async function createMedecin(req: Request, res: Response): Promise<void> {
    const data : CreateMedecinDTO = req.body;
    
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données du médecin sont requises');
    }

    if (!data.nom || !data.prenom || !data.adresse || data.departement === undefined) {
        throw new BadRequestError('Les champs nom, prenom, adresse et departement sont requis');
    }
    
    const newMedecin = await medecinService.createMedecin(data);
    logger.info(`Nouveau médecin créé`);
    res.status(201).json(newMedecin);
};

export async function updateMedecinByID(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const data : UpdateMedecinDTO = req.body;

    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de mise à jour sont requises');
    }
    
    const updateMedecin = await medecinService.updateMedecinByID(id, data);
    
    if (!updateMedecin) {
        throw new NotFoundError('Médecin non trouvé');
    }
    
    logger.info(`Médecin ${id} mis à jour`);
    res.status(200).json(updateMedecin);
};

export async function deleteMedecinByID(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    
    const deleteMedecin = await medecinService.deleteMedecinByID(id);
    
    if (!deleteMedecin) {
        throw new NotFoundError('Médecin non trouvé');
    }
    
    logger.info(`Médecin ${id} supprimé`);
    res.status(200).json(deleteMedecin);
};

export async function searchMedecinsByNom(req: Request, res: Response): Promise<void> {
    const { search } = req.query;

    // Gestion erreur 400 (paramètre manquant)
    if (!search || typeof search !== 'string' || !search.trim()) {
        throw new BadRequestError('Le paramètre de recherche est requis');
    }

    const medecins = await medecinService.searchMedecinsByNom(search.trim());
    
    logger.info(`Recherche effectuée pour: "${search}" - ${medecins.length} résultats trouvés`);
    res.status(200).json(medecins);
};