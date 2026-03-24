import { Famille } from "@prisma/client";
import prisma from "../prisma";
import { CreateFamilleDTO , UpdateFamilleDTO } from "../models/famille";

// getAllFamilles : renvoie une liste de toutes les familles
export function getAllFamilles(): Promise<Famille[]> {
    return prisma.famille.findMany();
}

// getFamilleByID : renvoie une famille en fonction de son ID
export function getFamilleByID (id: string): Promise<Famille | null> {
    return prisma.famille.findUnique({
        where: { id }
    });
}

// createFamille : crée une nouvelle famille à partir des données fournies
export function createFamille (data: CreateFamilleDTO): Promise<Famille> {
    return prisma.famille.create({
        data: {
            id: data.id,
            libelle: data.libelle
        }
    });
}

// updateFamilleByID : met à jour une famille existante en fonction de son ID et des données fournies
export function updateFamilleByID (id: string, data: UpdateFamilleDTO): Promise<Famille> {
    return prisma.famille.update({
        where: { id },
        data: {
            libelle: data.libelle
        }
    });
}

// deleteFamilleByID : supprime une famille en fonction de son ID
export function deleteFamilleByID (id: string): Promise<Famille> {
    return prisma.famille.delete({
        where: { id }
    });
}
