import { Famille } from "../client/generated/prisma";
import { CreateFamilleDTO , UpdateFamilleDTO } from "../models/famille";

export function getAllFamilles(): Promise<Famille[]> {

}

export function getFamilleByID (id: number): Promise<Famille> {

} 

export function createFamille (data: CreateFamilleDTO): Promise<Famille> {

}

export function updateFamilleByID (id: number, data: UpdateFamilleDTO): Promise<Famille> {

}

export function deleteFamilleByID (id: number ): Promise<Famille> {

}
