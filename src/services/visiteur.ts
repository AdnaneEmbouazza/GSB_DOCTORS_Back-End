import { Visiteur } from "@prisma/client";
import prisma from "../prisma";
import {CreateVisiteurDTO , UpdateVisiteurDTO } from "../models/visiteur";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { generateAccessToken, TokenPayload } from "../utils/token";
import { UnauthorizedError } from "../error";

// getAllVisiteurs : renvoie une liste de tous les visiteurs
export function getAllVisiteurs() {
    return prisma.visiteur.findMany({
        select: {
            id: true,
            nom: true,
            prenom: true,
            login: true,
            adresse: true,
            cp: true,
            ville: true,
            dateembauche: true,
            acesstoken: true,
            rapport: true
        }
    });
};

// getCurrentVisiteur : renvoie le visiteur actuellement connecté en fonction de l'ID du token
export async function getCurrentVisiteur(payload: TokenPayload) {
    return prisma.visiteur.findUnique({
        where: { id: payload.id },
        select: {
            id: true,
            nom: true,
            prenom: true,
            login: true,
            adresse: true,
            cp: true,
            ville: true,
            dateembauche: true,
            acesstoken: true,
            rapport: true
        }
    });
};

// getVisiteurByID : renvoie un visiteur en fonction de son ID
export function getVisiteurByID (id: number) {
    return prisma.visiteur.findUnique({
        where: { id },
        select: {
            id: true,
            nom: true,
            prenom: true,
            login: true,
            adresse: true,
            cp: true,
            ville: true,
            dateembauche: true,
            acesstoken: true,
            rapport: true
        }
    });
};

// createVisiteur : crée un nouveau visiteur à partir des données fournies
export async function createVisiteur (data: CreateVisiteurDTO) {
    // Hasher le mot de passe avant de le stocker
    const hashedPassword = await hashPassword(data.mdp);
    
    return prisma.visiteur.create({
        data: {
            nom: data.nom,
            prenom: data.prenom,
            login: data.login,
            mdp: hashedPassword,
            adresse: data.adresse,
            cp: data.cp,
            ville: data.ville,
            dateembauche: data.dateembauche
        },
        select: {
            id: true,
            nom: true,
            prenom: true,
            login: true,
            adresse: true,
            cp: true,
            ville: true,
            dateembauche: true,
            acesstoken: true,
            rapport: true
        }
    });
};

// updateCurrentVisiteurByID : met à jour un visiteur existant en fonction de son ID et des données fournies
// L'utilisateur ne peut modifier que son propre compte
export function updateCurrentVisiteurByID (id: number, data: UpdateVisiteurDTO, payload: TokenPayload) {
    // Vérifier que l'utilisateur ne modifie que son propre compte
    if (payload.id !== id) {
        throw new UnauthorizedError('Vous ne pouvez modifier que votre propre compte');
    }

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
        },
        select: {
            id: true,
            nom: true,
            prenom: true,
            login: true,
            adresse: true,
            cp: true,
            ville: true,
            dateembauche: true,
            acesstoken: true,
            rapport: true
        }
    });
};

// deleteCurrentVisiteurByID : supprime un visiteur en fonction de son ID
// L'utilisateur ne peut supprimer que son propre compte
export function deleteCurrentVisiteurByID (id: number, payload: TokenPayload) {
    // Vérifier que l'utilisateur ne supprime que son propre compte
    if (payload.id !== id) {
        throw new UnauthorizedError('Vous ne pouvez supprimer que votre propre compte');
    }

    return prisma.visiteur.delete({
        where: { id },
        select: {
            id: true,
            nom: true,
            prenom: true,
            login: true,
            adresse: true,
            cp: true,
            ville: true,
            dateembauche: true,
            acesstoken: true,
            rapport: true
        }
    });
};

// updateVisiteurByID : met à jour un visiteur existant en fonction de son ID et des données fournies
export function updateVisiteurByID (id: number, data: UpdateVisiteurDTO) {
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
        },
        select: {
            id: true,
            nom: true,
            prenom: true,
            login: true,
            adresse: true,
            cp: true,
            ville: true,
            dateembauche: true,
            acesstoken: true,
            rapport: true
        }
    });
};

// deleteVisiteurByID : supprime un visiteur en fonction de son ID
export function deleteVisiteurByID (id: number) {
    return prisma.visiteur.delete({
        where: { id },
        select: {
            id: true,
            nom: true,
            prenom: true,
            login: true,
            adresse: true,
            cp: true,
            ville: true,
            dateembauche: true,
            acesstoken: true,
            rapport: true
        }
    });
};

// login : authentifie un visiteur avec login et mot de passe, retourne un token JWT
// Hashe les mots de passe en clair lors de la connexion
export async function login(login: string, mdp: string): Promise<string> {
    // Chercher le visiteur par login
    const visiteur = await prisma.visiteur.findUnique({
        where: { login }
    });

    if (!visiteur) {
        throw new UnauthorizedError('Login ou mot de passe incorrect');
    }

    // Vérifier si le mdp est déjà hashé (commence par $2a$, $2b$, ou $2y$)
    const isBcrypt = /^\$2[aby]\$/.test(visiteur.mdp);
    
    let isPasswordValid = false;
    
    if (isBcrypt) {
        // Mdp déjà hashé - utiliser bcrypt pour la comparaison
        isPasswordValid = await comparePassword(mdp, visiteur.mdp);
    } else {
        // Mdp en clair - comparaison directe
        isPasswordValid = mdp === visiteur.mdp;
        
        // Si le mdp correspond, le hasher et le sauvegarder pour sécuriser le compte
        if (isPasswordValid) {
            const hashedPassword = await hashPassword(mdp);
            await prisma.visiteur.update({
                where: { id: visiteur.id },
                data: { mdp: hashedPassword }
            });
        }
    }

    if (!isPasswordValid) {
        throw new UnauthorizedError('Mot de passe incorrect');
    }

    // Générer et retourner le token JWT
    const token = generateAccessToken({
        id: visiteur.id,
        login: visiteur.login
    });

    return token;
};

// searchVisiteursByNom : recherche les visiteurs par nom ou prénom (LIKE en SQL)
export function searchVisiteursByNom(searchTerm: string) {
    return prisma.visiteur.findMany({
        where: {
            OR: [
                { nom: { contains: searchTerm } },
                { prenom: { contains: searchTerm } }
            ]
        },
        select: {
            id: true,
            nom: true,
            prenom: true,
            login: true,
            adresse: true,
            cp: true,
            ville: true,
            dateembauche: true,
            acesstoken: true,
            rapport: true
        }
    });
};