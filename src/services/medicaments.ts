import { Medicament } from '@prisma/client';
import prisma from '../prisma';
import { CreateMedicamentDTO , UpdateMedicamentDTO} from '../models/medicaments';

// getAllMedicaments : renvoie une liste de tous les medicaments
export function getAllMedicaments(): Promise<Medicament[]> {
    return prisma.medicament.findMany();
};

// getMedicamentByID : renvoie un medicament en fonction de son ID
export function getMedicamentByID (id: string): Promise<Medicament | null> {
    return prisma.medicament.findUnique({
        where: { id }
    });
};

// createMedicament : crée un nouveau medicament à partir des données fournies
export function createMedicament (data: CreateMedicamentDTO): Promise<Medicament> {
    return prisma.medicament.create({
        data: {
            id: data.id,
            nomcommercial: data.nomcommercial,
            idfamille: data.idfamille,
            composition: data.composition,
            effets: data.effets,
            contreindications: data.contreindications
        }
    });
};

// updateMedicamentByID : met à jour un medicament existant en fonction de son ID et des données fournies
export function updateMedicamentByID (id: string, data: UpdateMedicamentDTO): Promise<Medicament> {
    return prisma.medicament.update({
        where: { id },
        data: {
            nomcommercial: data.nomcommercial,
            idfamille: data.idfamille,
            composition: data.composition,
            effets: data.effets,
            contreindications: data.contreindications
        }
    });
};

// deleteMedicamentByID : supprime un medicament en fonction de son ID
export function deleteMedicamentByID (id: string): Promise<Medicament> {
    return prisma.medicament.delete({
        where: { id }
    });
};


