import { Rapport } from '../client/generated/prisma';
//import {prisma} from "prisma";
import { CreateRapportDTO, UpdateRapportDTO} from '../models/rapport';

export function getAllRapports(): Promise<Rapport[]> {

};

export function getRapportByID (id: number): Promise<Rapport> {

};

export function createRapport (data: CreateRapportDTO): Promise<Rapport> {

};

export function updateRapportByID (id: number, data: UpdateRapportDTO): Promise<Rapport> {

};

export function deleteRapportByID (id: number ): Promise<Rapport> {

};