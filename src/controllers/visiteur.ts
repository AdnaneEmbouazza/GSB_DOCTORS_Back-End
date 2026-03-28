import { Request, Response } from "express";
import * as visiteurService from "../services/visiteur";
import { UnauthorizedError, BadRequestError, NotFoundError } from "../error";
import { UpdateVisiteurDTO , CreateVisiteurDTO , LoginDTO } from "../models/visiteur";
import { generateAccessToken, TokenPayload } from "../utils/token";
import logger from "../utils/logger";

export async function login(req: Request, res: Response): Promise<void> {
    const { login, mdp } : LoginDTO = req.body;

    // Gestion erreur 400 (donnés manquantes)
    if (!login?.trim() || !mdp?.trim()) {
        throw new BadRequestError('Login et mot de passe sont requis');
    }
    
    const token = await visiteurService.login(login, mdp);
    
    // Envoyer le token en HttpOnly cookie
    res.cookie('authToken', token, {
        httpOnly: true,      // Pas accessible à JavaScript (prévient XSS)
        secure: process.env.NODE_ENV === 'production', // HTTPS seulement en prod
        sameSite: 'strict',  // CSRF protection
        maxAge: 15 * 60 * 1000 // 15 minutes en millisecondes
    });
    
    logger.info(`Visiteur ${login} connecté`);
    res.status(200).json({ token , message: 'Authentification réussie' });
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
    
    // Si aucune date d'embauche n'est fournie, utiliser la date du jour
    if (!data.dateembauche) {
        data.dateembauche = new Date();
    }
    
    const visiteur = await visiteurService.createVisiteur(data);
    logger.info(`Nouveau visiteur inscrit`);
    res.status(201).json(visiteur);
};

export async function getAllVisiteurs(req: Request, res: Response): Promise<void> {
    const visiteurs = await visiteurService.getAllVisiteurs();
    logger.info(`${visiteurs.length} visiteurs récupérés`);
    res.status(200).json(visiteurs);
};

export async function getCurrentVisiteur(req: Request, res: Response): Promise<void> {
    const payload : TokenPayload | undefined = req.visiteur ;
    
    // gestion erreur 401 (token manquant ou invalide)
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    const visiteur = await visiteurService.getCurrentVisiteur(payload);
    
    // gestion erreur 404 (non trouvé)
    if (!visiteur) {
        logger.warn(`Visiteur du token introuvable : ${payload.id}`);
        throw new NotFoundError('Visiteur non trouvé');
    }
    
    logger.info(`Visiteur ${payload.id} récupéré (depuis le token)`);
    res.status(200).json(visiteur);
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

export async function updateCurrentVisiteur(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const payload : TokenPayload | undefined = req.visiteur;
    const data : UpdateVisiteurDTO = req.body;
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    // Gestion erreur 400 (donnés manquantes ou invalides)
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('Les données de mise à jour sont requises');
    }
    
    const visiteur = await visiteurService.updateCurrentVisiteurByID(id, data, payload);
    
    // gestion erreur 404 (non trouvé)
    if (!visiteur) {
        throw new NotFoundError('Visiteur non trouvé');
    }
    
    logger.info(`Visiteur ${id} mis à jour`);
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

export async function deleteCurrentVisiteur(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const payload : TokenPayload | undefined = req.visiteur;
    
    if (!payload) {
        throw new UnauthorizedError('Token invalide');
    }
    
    const visiteur = await visiteurService.deleteCurrentVisiteurByID(id, payload);
    
    // gestion erreur 404 (non trouvé)
    if (!visiteur) {
        throw new NotFoundError('Visiteur non trouvé');
    }
    
    logger.info(`Visiteur ${id} supprimé`);
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

export async function logout(req: Request, res: Response): Promise<void> {
    // Effacer le cookie authToken
    res.clearCookie('authToken');
    logger.info('Utilisateur déconnecté');
    res.status(200).json({ message: 'Déconnexion réussie' });
};