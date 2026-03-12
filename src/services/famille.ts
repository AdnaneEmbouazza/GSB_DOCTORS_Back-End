import { Famille } from "../client/generated/prisma";
import { CreateFamilleDTO , UpdateFamilleDTO } from "../models/famille";

export function getAllFamilles(): Promise<Famille[]> {

}

export function getFamilleByID (id: string): Promise<Famille> {

} 

export function createFamille (data: CreateFamilleDTO): Promise<Famille> {

}

export function updateFamilleByID (id: string, data: UpdateFamilleDTO): Promise<Famille> {

}

export function deleteFamilleByID (id: string ): Promise<Famille> {

}
