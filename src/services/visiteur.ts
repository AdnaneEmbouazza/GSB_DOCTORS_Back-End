import { Visiteur } from "@prisma/client";
import prisma from "../prisma";
import {CreateVisiteurDTO , UpdateVisiteurDTO } from "../models/visiteur";

// getAllVisiteurs : renvoie une liste de tous les visiteurs
export function getAllVisiteurs(): Promise<Visiteur[]> {
    return prisma.visiteur.findMany();
}

// getCurrentVisiteur : renvoie le visiteur actuellement connecté (en fonction de la session ou du token d'authentification)
export function getCurrentVisiteur(): Promise<Visiteur | null> {
    // TODO: Implémenter avec la session ou le token d'authentification
    return null as any;
}

// getVisiteurByID : renvoie un visiteur en fonction de son ID
export function getVisiteurByID (id: number): Promise<Visiteur | null> {
    return prisma.visiteur.findUnique({
        where: { id }
    });
}

// createVisiteur : crée un nouveau visiteur à partir des données fournies
export function createVisiteur (data: CreateVisiteurDTO): Promise<Visiteur> {
    return prisma.visiteur.create({
        data: {
            nom: data.nom,
            prenom: data.prenom,
            login: data.login,
            mdp: data.mdp,
            adresse: data.adresse,
            cp: data.cp,
            ville: data.ville,
            dateembauche: data.dateembauche
        }
    });
}

// updateVisiteurByID : met à jour un visiteur existant en fonction de son ID et des données fournies
export function updateVisiteurByID (id: number, data: UpdateVisiteurDTO): Promise<Visiteur> {
    return prisma.visiteur.update({
        where: { id },
        data: {
            nom: data.nom,
            prenom: data.prenom,
            login: data.login,
            mdp: data.mdp,
            adresse: data.adresse,
            cp: data.cp,
            ville: data.ville,
            dateembauche: data.dateembauche
        }
    });
}

// deleteVisiteurByID : supprime un visiteur en fonction de son ID
export function deleteVisiteurByID (id: number): Promise<Visiteur> {
    return prisma.visiteur.delete({
        where: { id }
    });
}

// login : authentifie un visiteur en fonction de son email et de son mot de passe, et renvoie un token d'authentification ou une session
export function login (email: string, password: string): Promise<string> {
    // TODO: Implémenter l'authentification avec hashage du mot de passe et génération de token
    return null as any;
}