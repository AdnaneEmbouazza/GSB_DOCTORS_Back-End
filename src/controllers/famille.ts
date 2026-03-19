import { Request, Response } from "express";
import * as familleService from "../services/famille";

export function listAllFamilles(req: Request, res: Response) {
  const familles = familleService.getAllFamilles();
  if(familles){
    res.json(familles);
  }
}

export function listFamilleByID(req: Request, res: Response){
    const {id} = req.params;
    const famille = familleService.getFamilleByID(id);
    if (famille) {
        res.json(famille);
    } else {
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function createFamille (req: Request, res: Response){
    const data = req.body;
    const newFamille = familleService.createFamille(data);
    if (newFamille) {
        res.json(newFamille);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function updateFamilleByID (req: Request, res: Response){
    const {id} = req.params;
    const data = req.body;
    const updatedFamille = familleService.updateFamilleByID(id, data);
    if (updatedFamille) {
        res.json(updatedFamille);
    } else {
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function deleteFamilleByID (req: Request , res: Response){
    const {id} = req.params;
    const deleteFamilleByID = familleService.deleteFamilleByID(id);
    if (deleteFamilleByID) {
        res.json(deleteFamilleByID);
    } else {
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}