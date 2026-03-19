import { Request, Response } from "express";
import * as offrirService from "../services/offrir";

export function listAllOffre (req : Request , res : Response){
    const offre = offrirService.getAllOffre();
    if(offre){
        res.json(offre);
    }
}

export function listOffreByID (req : Request , res: Response){
    const {id} = req.params;
    const offre = offrirService.getOffreByID(id);
    if(offre){
        res.json(offre);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function createOffre(req : Request , res:Response){
    const data = req.body;
    const offre = offrirService.createOffre(data);

    if(offre){
        res.json(offre);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function updateOffreByID(req: Request , res: Response){
    const {id} = req.params;
    const data = req.body;
    const offre = offrirService.updateOffreById(id , data);

    if (offre){
        res.json(offre);
    }
    else{
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}

export function deleteOffreByID(req : Request , res: Response){
    const {id} = req.params;
    const offre = offrirService.deleteOffreByID(id);

    if(offre){
        res.json(offre);
    }
    else {
        // gérer les cas d'erreur , mettre en place une gestion d'erreur plus robuste
    }
}