import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as medicamentsControleur from "../controllers/medicaments";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

// ROUTES PRIVEES (authentification )

/*
GET /GSB/medicaments => affiche la liste de tous les medicaments
GET /GSB/medicament/:id => affiche les infos d'un medicament spécifique
POST /GSB/medicament => crée un nouveau medicament
PUT /GSB/medicament/:id => modifie un medicament spécifique
DELETE /GSB/medicament/:id => supprime un medicament spécifique
*/

router.get('/medicaments' ,isloggedOn , asyncHandler(medicamentsControleur.listAllMedicaments));

router.get('/medicament' , isloggedOn , asyncHandler(medicamentsControleur.listMedicamentsByID));

router.post('/medicament/:id' , isloggedOn , asyncHandler(medicamentsControleur.createMedicament));

router.put('/medicament/:id' , isloggedOn , asyncHandler(medicamentsControleur.updateMedicamentByID));

router.delete('/medicament/:id' , isloggedOn , asyncHandler(medicamentsControleur.deleteMedicamentByID));

export default router;