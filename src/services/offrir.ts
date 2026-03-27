import { Offrir } from '@prisma/client';
import prisma from '../prisma';
import { CreateOffrirDTO , UpdateOffrirDTO} from '../models/offrir';

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
export function createOffre (data: CreateOffrirDTO): Promise<Offrir> {
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