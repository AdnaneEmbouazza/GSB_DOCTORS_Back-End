import { Rapport } from '@prisma/client';
import prisma from '../prisma';
import { CreateRapportDTO, UpdateRapportDTO} from '../models/rapport';
import { UnauthorizedError } from '../error';

// ============= SERVICES FILTRÉS PAR VISITEUR =============

// getAllRapportsByVisiteur : renvoie les rapports du visiteur
export function getAllRapportsByVisiteur(visiteurId: number): Promise<Rapport[]> {
    return prisma.rapport.findMany({
        where: { idvisiteur: visiteurId }
    });
};

// getRapportsByVisiteurAndDate : renvoie les rapports du visiteur à une date spécifique
export async function getRapportsByVisiteurAndDate(visiteurId: number, date: string): Promise<Rapport[]> {
    return prisma.rapport.findMany({
        where: {
            idvisiteur: visiteurId,
            date: new Date(date)
        }
    });
};

// getRapportByIDAndVisiteur : renvoie un rapport si le visiteur en est propriétaire
export async function getRapportByIDAndVisiteur(id: number, visiteurId: number): Promise<Rapport | null> {
    const rapport = await prisma.rapport.findUnique({
        where: { id }
    });
    
    if (!rapport) {
        return null;
    }
    
    // Vérifier que le rapport appartient au visiteur
    if (rapport.idvisiteur !== visiteurId) {
        throw new UnauthorizedError('Vous n\'avez pas accès à ce rapport');
    }
    
    return rapport;
};

// createRapportByVisiteur : crée un rapport pour le visiteur
export function createRapportByVisiteur(data: CreateRapportDTO, visiteurId: number): Promise<Rapport> {
    return prisma.rapport.create({
        data: {
            date: data.date,
            motif: data.motif,
            bilan: data.bilan,
            idvisiteur: visiteurId,  // Force l'ID du visiteur actuellement connecté
            idmedecin: data.idmedecin
        }
    });
};

// updateRapportByIDAndVisiteur : met à jour un rapport si le visiteur en est propriétaire
export async function updateRapportByIDAndVisiteur(id: number, data: UpdateRapportDTO, visiteurId: number): Promise<Rapport> {
    const rapport = await prisma.rapport.findUnique({
        where: { id }
    });
    
    if (!rapport) {
        throw new Error('Rapport non trouvé');
    }
    
    // Vérifier que le rapport appartient au visiteur
    if (rapport.idvisiteur !== visiteurId) {
        throw new UnauthorizedError('Vous ne pouvez modifier que vos propres rapports');
    }
    
    return prisma.rapport.update({
        where: { id },
        data: {
            date: data.date,
            motif: data.motif,
            bilan: data.bilan,
            // Ne pas modifier idvisiteur - force le rapport à rester du visiteur
            idmedecin: data.idmedecin
        }
    });
};

// deleteRapportByIDAndVisiteur : supprime un rapport si le visiteur en est propriétaire
export async function deleteRapportByIDAndVisiteur(id: number, visiteurId: number): Promise<Rapport> {
    const rapport = await prisma.rapport.findUnique({
        where: { id }
    });
    
    if (!rapport) {
        throw new Error('Rapport non trouvé');
    }
    
    // Vérifier que le rapport appartient au visiteur
    if (rapport.idvisiteur !== visiteurId) {
        throw new UnauthorizedError('Vous ne pouvez supprimer que vos propres rapports');
    }
    
    return prisma.rapport.delete({
        where: { id }
    });
};

// ============= SERVICES ORIGINAUX (CONSERVÉS) =============

// getAllRapports : renvoie une liste de tous les rapports
export function getAllRapports(): Promise<Rapport[]> {
    return prisma.rapport.findMany();
};

// getRapportByID : renvoie un rapport en fonction de son ID
export function getRapportByID (id: number): Promise<Rapport | null> {
    return prisma.rapport.findUnique({
        where: { id }
    });
};

// createRapport : crée un nouveau rapport à partir des données fournies
export function createRapport (data: CreateRapportDTO): Promise<Rapport> {
    return prisma.rapport.create({
        data: {
            date: data.date,
            motif: data.motif,
            bilan: data.bilan,
            idvisiteur: data.idvisiteur,
            idmedecin: data.idmedecin
        }
    });
};

// updateRapportByID : met à jour un rapport existant en fonction de son ID et des données fournies
export function updateRapportByID (id: number, data: UpdateRapportDTO): Promise<Rapport> {
    return prisma.rapport.update({
        where: { id },
        data: {
            date: data.date,
            motif: data.motif,
            bilan: data.bilan,
            idvisiteur: data.idvisiteur,
            idmedecin: data.idmedecin
        }
    });
};

// deleteRapportByID : supprime un rapport en fonction de son ID
export function deleteRapportByID (id: number): Promise<Rapport> {
    return prisma.rapport.delete({
        where: { id }
    });
};