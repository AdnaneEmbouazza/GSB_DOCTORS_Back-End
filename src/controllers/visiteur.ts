import { Request, Response } from "express";
import * as visiteurService from "../services/visiteur";

// CONTROLEURS POUR LES CONNEXIONS DES VISITEURS
export async function login (req: Request, res: Response) : Promise<void> {
    // Récupérer les données de connexion du corps de la requête
    const { email, password } = req.body;
    try {
        // Appeler le service de connexion pour vérifier les informations d'identification
        const token = await visiteurService.login(email, password);

        // Si la connexion est réussie, retourner un token d'authentification
        if(token){
            res.status(200).json({ token });
        }
    } catch (error) {
        res.status(501).json({ message: "Email ou mot de passe incorrect" });
    }
}

// CONTROLEURS POUR LA CREATION DE COMPTES POUR VISITEURS
export async function inscription (req: Request, res: Response){
    const data = req.body;
    try {
        const visiteur = await visiteurService.createVisiteur(data);
        if(visiteur){
            res.status(201).json(visiteur);
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du compte" });
    }
}

// CONTROLLEURS POUR LA RECUPERATION DES INFORMATIONS VISITEURS
export async function getVisiteurByID (req: Request, res: Response){
    const {id} = req.params;
    try {
        const visiteur = await visiteurService.getVisiteurByID(id);
        if(visiteur){
            res.status(200).json(visiteur);
        }
    } catch (error) {
        res.status(404).json({ message: "Visiteur non trouvé" });
    }
}

// CONTROLEURS POUR LA MODIFICATION DES INFORMATIONS VISITEURS
export async function updateVisiteur (req: Request, res: Response){
    const {id} = req.params;
    const data = req.body;
    try {
        const visiteur = await visiteurService.updateVisiteurByID(id, data);
        if(visiteur){
            res.status(200).json(visiteur);
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du compte" });
    }
}

// CONTROLEURS POUR LA SUPPRESSION DES COMPTES VISITEURS
export async function deleteVisiteur (req: Request, res: Response){
    const {id} = req.params;
    try {
        const visiteur = await visiteurService.deleteVisiteurByID(id);
        if (visiteur) {
        res.status(200).json(visiteur);
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du compte" });
    }
}

// CONTROLEURS POUR LA RECUPERATION DE TOUS LES VISITEURS (ADMIN UNIQUEMENT)
export async function getAllVisiteurs (req: Request, res: Response){
    try {
        const visiteurs = await visiteurService.getAllVisiteurs();
        if (visiteurs) {
        res.status(200).json(visiteurs);
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des visiteurs" });
    }
}
