import { Request, Response } from "express";
import * as rapportService from "../services/rapport";

export function listAllRapport (req:Request , res : Response){
    const rapport = rapportService.getAllRapports();
    if(rapport){
        res.json(rapport);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function listRapportByID(req : Request , res : Response){
    const {id} = req.params;
    const rapport = rapportService.getRapportByID(id);

    if (rapport){
        res.json(rapport);
    }
    else {
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function createRapport(req : Request , res : Response){
    const data = req.body;
    const rapport = rapportService.createRapport(data);

    if (rapport){
        res.json(rapport);
    }
    else {
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function updateRapportByID(req : Request , res : Response){
    const {id} = req.params;
    const  data =req.body;
    const rapport = rapportService.updateRapportByID(id , data);

    if (rapport){
        res.json(rapport);
    }

    else {
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function deleteRapportByID(req: Request , res:Response){
    const {id} = req.params;
    const rapport = rapportService.deleteRapportByID(id);

    if (rapport){
        res.json(rapport);
    }
    else {
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}