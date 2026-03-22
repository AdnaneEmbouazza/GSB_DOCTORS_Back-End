import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as medecinControleur from "../controllers/medecin";

const router = Router();

// ROUTES PRIVES (authentification )

/* 
GET /GSB/medecins => affiche la liste de toutes les familles
GET /GSB/medecin/:id => affiche les infos d'une médecin spécifique
POST /GSB/medecin => crée un nouveau médecin
PUT /GSB/medecin/:id => modifie un médecin spécifique
DELETE /GSB/medecin/:id => supprime un médecin spécifique
*/

router.get('/medecins' , isloggedOn , medecinControleur.listAllMedecins);

router.get('/medecin/:id' , isloggedOn , medecinControleur.listMedecinsByID);

router.post('/medecin' , isloggedOn , medecinControleur.createMedecin);

router.put('/medecin/:id' , isloggedOn , medecinControleur.updateMedecinByID);

router.delete('/medecin' , isloggedOn , medecinControleur.deleteMedecinByID);

export default router;