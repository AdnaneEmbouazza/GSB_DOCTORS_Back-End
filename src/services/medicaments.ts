import { Medicament } from '../client/generated/prisma';
import { CreateMedicamentDTO , UpdateMedicamentDTO} from '../models/medicaments';

export function getAllMedicaments(): Promise<Medicament[]> {

}

export function getMedicamentByID (id: number): Promise<Medicament> {

}

export function createMedicament (data: CreateMedicamentDTO): Promise<Medicament> {

}

export function updateMedicamentByID (id: number, data: UpdateMedicamentDTO): Promise<Medicament> {

}

export function deleteMedicamentByID (id: number ): Promise<Medicament> {

}


