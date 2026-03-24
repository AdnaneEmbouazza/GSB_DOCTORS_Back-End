import { Request, Response } from "express";
import * as visiteurService from "../services/visiteur";
import { UnauthorizedError, BadRequestError, NotFoundError } from "../error";
import { UpdateVisiteurDTO , CreateVisiteurDTO , LoginDTO } from "../models/visiteur";
import logger from "../utils/logger";

export async function login(req: Request, res: Response): Promise<void> {
    const { login, mdp } : LoginDTO = req.body;

    // Gestion erreur 400 (donnés manquantes)
    if (!login?.trim() || !mdp?.trim()) {
        throw new BadRequestError('Login et mot de passe sont requis');
    }
    
    const token = await visiteurService.login(login, mdp);
    
    // Gestion erreur 401 (authentification échouée)
    if (!token) {
        logger.warn(`Tentative de connexion échouée pour ${login}`);
        throw new UnauthorizedError('Login ou mot de passe incorrect');
    }
    
    logger.info(`Visiteur ${login} connecté`);
    res.status(200).json({ token });
};

export async function inscription(req: Request, res: Response): Promise<void> {
    const data : CreateVisiteurDTO = req.body;

    if (!data.login || !data.mdp) {
        throw new BadRequestError('Login et mot de passe sont requis');
    }

    // Gestion erreur 400 (donnés manquantes ou invalides)
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de visiteur sont requises');
    }
    
    const visiteur = await visiteurService.createVisiteur(data);
    logger.info(`Nouveau visiteur inscrit`);
    res.status(201).json(visiteur);
};

export async function getVisiteurByID(req: Request, res: Response): Promise<void> {
    const  id  = Number(req.params.id);
    const visiteur = await visiteurService.getVisiteurByID(id);
    
    // gestion erreur 404 (non trouvé)
    if (!visiteur) {
        logger.warn(`Tentative d'accès à un visiteur inexistant : ${id}`);
        throw new NotFoundError('Visiteur non trouvé');
    }
    
    logger.info(`Visiteur ${id} récupéré`);
    res.status(200).json(visiteur);
};

export async function updateVisiteur(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const data : UpdateVisiteurDTO = req.body;
    
    // Gestion erreur 400 (donnés manquantes ou invalides)
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de mise à jour sont requises');
    }
    
    const visiteur = await visiteurService.updateVisiteurByID(id, data);
    
    // gestion erreur 404 (non trouvé)
    if (!visiteur) {
        throw new NotFoundError('Visiteur non trouvé');
    }
    
    logger.info(`Visiteur ${id} mis à jour`);
    res.status(200).json(visiteur);
};

export async function deleteVisiteur(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    
    const visiteur = await visiteurService.deleteVisiteurByID(id);
    
    // gestion erreur 404 (non trouvé)
    if (!visiteur) {
        throw new NotFoundError('Visiteur non trouvé');
    }
    
    logger.info(`Visiteur ${id} supprimé`);
    res.status(200).json(visiteur);
};

export async function getAllVisiteurs(req: Request, res: Response): Promise<void> {
    const visiteurs = await visiteurService.getAllVisiteurs();
    logger.info(`${visiteurs.length} visiteurs récupérés`);
    res.status(200).json(visiteurs);
};
