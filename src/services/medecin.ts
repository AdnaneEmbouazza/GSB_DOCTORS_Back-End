import { Medecin } from "../client/generated/prisma";
//import {prisma} from "prisma";
import {CreateMedecinDTO , UpdateMedecinDTO } from "../models/medecin";

export function getAllMedecins(): Promise<Medecin[]> {

};

export function getMedecinByID (id: number): Promise<Medecin> {

};

export function createMedecin (data: CreateMedecinDTO): Promise<Medecin> {

};

export function updateMedecinByID (id: number, data: UpdateMedecinDTO): Promise<Medecin> {

};

export function deleteFamilleByID (id: number ): Promise<Medecin> {

};