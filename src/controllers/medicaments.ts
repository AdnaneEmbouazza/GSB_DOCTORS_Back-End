import { Request, Response } from "express";
import * as medicamentsServices from "../services/medicaments.js";

export function listAllMedicaments(req: Request , res:Response){
    const medicaments = medicamentsServices.getAllMedicaments();
    if (medicaments){
        res.json(medicaments);
    }
}

export function listAllMedicamentsByID(req: Request , res:Response){
    const {id} = req.params;
    const medicament = medicamentsServices.getMedicamentByID(id);
    if (medicament){
        res.json(medicament);
    }
}

export function createMedicament(req: Request , res:Response){
    const data = req.body;
    const newMedicament = medicamentsServices.createMedicament(data);
    if (newMedicament){
        res.json(newMedicament);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function updateMedicamentByID(req: Request , res:Response){
    const {id} = req.params;
    const data = req.body;
    const updatedMedicament = medicamentsServices.updateMedicamentByID(Number(id), data);
    if (updatedMedicament){
        res.json(updatedMedicament);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function deleteMedicamentByID(req: Request , res:Response){
    const {id} = req.params;
    const deleteMedicamentByID = medicamentsServices.deleteMedicamentByID(Number(id));
    if (deleteMedicamentByID){
        res.json(deleteMedicamentByID);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}