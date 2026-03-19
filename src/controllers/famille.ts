import { Request, Response } from "express";
import * as familleService from "../services/famille";

export async function listAllFamilles(req: Request, res: Response) : Promise<void>{
    try {
        const familles = await familleService.getAllFamilles();
        res.json(familles);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des familles" });
    }
};

export async function listFamilleByID(req: Request, res: Response) : Promise<void>{
    const {id} = req.params;
    try {
        const famille = await familleService.getFamilleByID(id);
        if (famille) {
            res.json(famille);
        } else {
            res.status(404).json({ message: "Famille non trouvée" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la famille" });
    }
};

export async function createFamille (req: Request, res: Response) : Promise<void>{
    const data = req.body;
    try{
        const newFamille = await familleService.createFamille(data);
        if (newFamille) {
            res.json(newFamille);
        }
    }catch(error){
        res.status(500).json({ message: "Erreur lors de la création de la famille" });
    }
};

export async function updateFamilleByID (req: Request, res: Response) : Promise<void>{
    const {id} = req.params;
    const data = req.body;
    try{
        const updatedFamille = await familleService.updateFamilleByID(id, data);
        if (updatedFamille) {
            res.json(updatedFamille);
        }
    }catch(error){
        res.status(500).json({ message: "Erreur lors de la mise à jour de la famille" });
    }
};

export async function deleteFamilleByID (req: Request , res: Response) : Promise<void>{
    const {id} = req.params;
    try {
        const deleteFamilleByID = await familleService.deleteFamilleByID(id);
        if (deleteFamilleByID) {
            res.json(deleteFamilleByID);
            }
    } catch (error) {    
    res.status(500).json({ message: "Erreur lors de la suppression de la famille" });
}
};