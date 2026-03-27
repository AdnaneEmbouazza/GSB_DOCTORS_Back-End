import { Medecin } from "@prisma/client";
import prisma from "../prisma";
import {CreateMedecinDTO , UpdateMedecinDTO } from "../models/medecin";

// getAllMedecins : renvoie une liste de tous les medecins
export function getAllMedecins(): Promise<Medecin[]> {
    return prisma.medecin.findMany();
};

// getMedecinByID : renvoie un medecin en fonction de son ID
export function getMedecinByID (id: number): Promise<Medecin | null> {
    return prisma.medecin.findUnique({
        where: { id }
    });
};

// createMedecin : crée un nouveau medecin à partir des données fournies
export function createMedecin (data: CreateMedecinDTO): Promise<Medecin> {
    return prisma.medecin.create({
        data: {
            nom: data.nom,
            prenom: data.prenom,
            adresse: data.adresse,
            tel: data.tel,
            specialitecomplementaire: data.specialitecomplementaire,
            departement: data.departement
        }
    });
};

// updateMedecinByID : met à jour un medecin existant en fonction de son ID et des données fournies
export function updateMedecinByID (id: number, data: UpdateMedecinDTO): Promise<Medecin> {
    return prisma.medecin.update({
        where: { id },
        data: {
            nom: data.nom,
            prenom: data.prenom,
            adresse: data.adresse,
            tel: data.tel,
            specialitecomplementaire: data.specialitecomplementaire,
            departement: data.departement
        }
    });
};

// deleteMedecinByID : supprime un medecin en fonction de son ID
export function deleteMedecinByID (id: number): Promise<Medecin> {
    return prisma.medecin.delete({
        where: { id }
    });
};