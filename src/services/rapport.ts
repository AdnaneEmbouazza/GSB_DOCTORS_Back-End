import { Rapport } from '@prisma/client';
import prisma from '../prisma';
import { CreateRapportDTO, UpdateRapportDTO} from '../models/rapport';

// getAllRapports : renvoie une liste de tous les rapports
export function getAllRapports(): Promise<Rapport[]> {
    return prisma.rapport.findMany();
}

// getRapportByID : renvoie un rapport en fonction de son ID
export function getRapportByID (id: number): Promise<Rapport | null> {
    return prisma.rapport.findUnique({
        where: { id }
    });
}

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
}

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
}

// deleteRapportByID : supprime un rapport en fonction de son ID
export function deleteRapportByID (id: number): Promise<Rapport> {
    return prisma.rapport.delete({
        where: { id }
    });
}