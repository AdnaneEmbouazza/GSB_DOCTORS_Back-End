import { Request, Response } from "express";
import * as medicamentsServices from "../services/medicaments";

export async function listAllMedicaments(req: Request , res:Response) : Promise<void>{
    try{
        const medicaments = await medicamentsServices.getAllMedicaments();
        if (medicaments){
            res.json(medicaments);
        }
    }catch(error){
        res.status(500).json({ message: "Erreur lors de la récupération des médicaments" });
    }
};

export async function listMedicamentsByID(req: Request , res:Response) : Promise<void>{
    const {id} = req.params;
    try{
        const medicament =await medicamentsServices.getMedicamentByID(id);
        if (medicament){
            res.json(medicament);
        }
    }catch(error){
        res.status(500).json({ message: "Erreur lors de la récupération du médicament" });
    }
};

export async function createMedicament(req: Request , res:Response) : Promise<void>{
    const data = req.body;
    try{
        const newMedicament = await medicamentsServices.createMedicament(data);
        if (newMedicament){
            res.json(newMedicament);
        }
    }catch(error){
        res.status(500).json({ message: "Erreur lors de la création du médicament" });
    }
};

export async function updateMedicamentByID(req: Request , res:Response) : Promise<void>{
    const {id} = req.params;
    const data = req.body;
    try {
        const updatedMedicament = await medicamentsServices.updateMedicamentByID(id, data);
        if (updatedMedicament){
            res.json(updatedMedicament);
        }
    }catch(error){
        res.status(500).json({ message: "Erreur lors de la mise à jour du médicament" });
    }
};

export async function deleteMedicamentByID(req: Request , res:Response) : Promise<void>{
    const {id} = req.params;
    try {
        const deleteMedicamentByID = await medicamentsServices.deleteMedicamentByID(id);
        if(deleteMedicamentByID){
            res.json(deleteMedicamentByID);
        }
    }catch(error){
        res.status(500).json({ message: "Erreur lors de la suppression du médicament" });
    }
};