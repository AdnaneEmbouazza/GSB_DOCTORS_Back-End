import { Offrir } from '@prisma/client';
import prisma from '../prisma';
import { CreateOffrirDTO , UpdateOffrirDTO} from '../models/offrir';
import { UnauthorizedError, BadRequestError } from '../error';
import { TokenPayload } from '../utils/token';

// Vérifier que le rapport appartient au visiteur
async function verifyRapportBelongsToVisiteur(idrapport: number, visiteurId: number): Promise<boolean> {
    const rapport = await prisma.rapport.findUnique({
        where: { id: idrapport },
        select: { idvisiteur: true }
    });
    
    if (!rapport) {
        return false;
    }
    
    return rapport.idvisiteur === visiteurId;
}

// getAllOffreByVisiteur : renvoie les offres liées aux rapports du visiteur
export async function getAllOffreByVisiteur(visiteurId: number): Promise<Offrir[]> {
    return prisma.offrir.findMany({
        where: {
            rapport: {
                idvisiteur: visiteurId
            }
        }
    });
};

// getOffreByIDAndVisiteur : renvoie une offre si elle appartient au visiteur
export async function getOffreByIDAndVisiteur(idrapport: number, idmedicament: string, visiteurId: number): Promise<Offrir | null> {
    // Vérifier que le rapport appartient au visiteur
    const belongsToVisiteur = await verifyRapportBelongsToVisiteur(idrapport, visiteurId);
    
    if (!belongsToVisiteur) {
        throw new UnauthorizedError('Vous n\'avez pas accès à cette offre');
    }
    
    return prisma.offrir.findUnique({
        where: {
            idrapport_idmedicament: {
                idrapport,
                idmedicament
            }
        }
    });
};

// createOffreByVisiteur : crée une offre mais vérifie que le rapport appartient au visiteur
export async function createOffreByVisiteur(data: CreateOffrirDTO, visiteurId: number): Promise<Offrir> {
    // Vérifier que le rapport appartient au visiteur
    const belongsToVisiteur = await verifyRapportBelongsToVisiteur(data.idrapport, visiteurId);
    
    if (!belongsToVisiteur) {
        throw new UnauthorizedError('Vous ne pouvez créer une offre que pour vos propres rapports');
    }

    // Vérifier que l'offre n'existe pas déjà
    const existingOffre = await getOffreByID(data.idrapport, data.idmedicament);
    if (existingOffre) {
        throw new BadRequestError(`Cette offre existe déjà pour ce rapport. Utilisez PUT pour mettre à jour la quantité.`);
    }
    
    return prisma.offrir.create({
        data: {
            idrapport: data.idrapport,
            idmedicament: data.idmedicament,
            quantite: data.quantite
        }
    });
};

// updateOffreByIDAndVisiteur : met à jour une offre si elle appartient au visiteur
export async function updateOffreByIDAndVisiteur(idrapport: number, idmedicament: string, data: UpdateOffrirDTO, visiteurId: number): Promise<Offrir> {
    // Vérifier que le rapport appartient au visiteur
    const belongsToVisiteur = await verifyRapportBelongsToVisiteur(idrapport, visiteurId);
    
    if (!belongsToVisiteur) {
        throw new UnauthorizedError('Vous ne pouvez modifier que vos propres offres');
    }
    
    return prisma.offrir.update({
        where: {
            idrapport_idmedicament: {
                idrapport,
                idmedicament
            }
        },
        data: {
            quantite: data.quantite
        }
    });
};

// deleteOffreByIDAndVisiteur : supprime une offre si elle appartient au visiteur
export async function deleteOffreByIDAndVisiteur(idrapport: number, idmedicament: string, visiteurId: number): Promise<Offrir> {
    // Vérifier que le rapport appartient au visiteur
    const belongsToVisiteur = await verifyRapportBelongsToVisiteur(idrapport, visiteurId);
    
    if (!belongsToVisiteur) {
        throw new UnauthorizedError('Vous ne pouvez supprimer que vos propres offres');
    }
    
    return prisma.offrir.delete({
        where: {
            idrapport_idmedicament: {
                idrapport,
                idmedicament
            }
        }
    });
};

// getAllOffre : renvoie une liste de toutes les offres
export function getAllOffre(): Promise<Offrir[]> {
    return prisma.offrir.findMany();
};

// getOffreByID : renvoie une offre en fonction de son ID
export function getOffreByID (idrapport: number, idmedicament: string): Promise<Offrir | null> {
    return prisma.offrir.findUnique({
        where: {
            idrapport_idmedicament: {
                idrapport,
                idmedicament
            }
        }
    });
};

// createOffre : crée une nouvelle offre à partir des données fournies
export async function createOffre (data: CreateOffrirDTO): Promise<Offrir> {
    // Vérifier que l'offre n'existe pas déjà
    const existingOffre = await getOffreByID(data.idrapport, data.idmedicament);
    if (existingOffre) {
        throw new BadRequestError(`Cette offre existe déjà pour ce rapport. Utilisez PUT pour mettre à jour la quantité.`);
    }

    return prisma.offrir.create({
        data: {
            idrapport: data.idrapport,
            idmedicament: data.idmedicament,
            quantite: data.quantite
        }
    });
};

// updateOffreByID : met à jour une offre existante en fonction de son ID et des données fournies
export function updateOffreById (idrapport: number, idmedicament: string, data: UpdateOffrirDTO): Promise<Offrir> {
    return prisma.offrir.update({
        where: {
            idrapport_idmedicament: {
                idrapport,
                idmedicament
            }
        },
        data: {
            quantite: data.quantite
        }
    });
};

// deleteOffreByID : supprime une offre en fonction de son ID
export function deleteOffreByID (idrapport: number, idmedicament: string): Promise<Offrir> {
    return prisma.offrir.delete({
        where: {
            idrapport_idmedicament: {
                idrapport,
                idmedicament
            }
        }
    });
};