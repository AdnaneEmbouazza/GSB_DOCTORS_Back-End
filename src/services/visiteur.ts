import { Visiteur } from "../client/generated/prisma";
//import {prisma} from "prisma";
import {CreateVisiteurDTO , UpdateVisiteurDTO } from "../models/visiteur";

export function getAllVisiteurs(): Promise<Visiteur[]> {

};

export function getVisiteurByID (id: number): Promise<Visiteur> {

};

export function createVisiteur (data: CreateVisiteurDTO): Promise<Visiteur> {

};

export function updateVisiteurByID (id: number, data: UpdateVisiteurDTO): Promise<Visiteur> {

};

export function deleteVisiteurByID (id: number ): Promise<Visiteur> {

};

export function login (email: string, password: string): Promise<string> {

};