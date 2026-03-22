import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as medecinControleur from "../controllers/medecin";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

// ROUTES PRIVES (authentification )

/* 
GET /GSB/medecins => affiche la liste de toutes les familles
GET /GSB/medecin/:id => affiche les infos d'une médecin spécifique
POST /GSB/medecin => crée un nouveau médecin
PUT /GSB/medecin/:id => modifie un médecin spécifique
DELETE /GSB/medecin/:id => supprime un médecin spécifique
*/

router.get('/medecins' , isloggedOn , asyncHandler(medecinControleur.listAllMedecins));

router.get('/medecin/:id' , isloggedOn , asyncHandler(medecinControleur.listMedecinsByID));

router.post('/medecin' , isloggedOn , asyncHandler(medecinControleur.createMedecin));

router.put('/medecin/:id' , isloggedOn , asyncHandler(medecinControleur.updateMedecinByID));

router.delete('/medecin/:id' , isloggedOn , asyncHandler(medecinControleur.deleteMedecinByID));

export default router;