import { Request, Response } from "express";
//import * as visiteurService from "../services/visiteur";

// CONTROLEURS POUR LES CONNEXIONS DES VISITEURS
export const login = async (req: Request, res: Response) => {}

// CONTROLEURS POUR LA CREATION DE COMPTES POUR VISITEURS
export const inscription = async (req: Request, res: Response) => {}

// CONTROLLEURS POUR LA RECUPERATION DES INFORMATIONS VISITEURS
export const getVisiteurByID = async (req: Request, res: Response) => {}

// CONTROLEURS POUR LA MODIFICATION DES INFORMATIONS VISITEURS
export const updateVisiteur = async (req: Request, res: Response) => {}

// CONTROLEURS POUR LA SUPPRESSION DES COMPTES VISITEURS
export const deleteVisiteur = async (req: Request, res: Response) => {}

// CONTROLEURS POUR LA RECUPERATION DE TOUS LES VISITEURS (ADMIN UNIQUEMENT)
export const getAllVisiteurs = async (req: Request, res: Response) => {}

// CONTROLEURS POUR LA RECUPERATION DES INFORMATIONS D'UN VISITEUR SPECIFIQUE (ADMIN UNIQUEMENT)
export const getVisiteurByIDAdmin = async (req: Request, res: Response) => {}