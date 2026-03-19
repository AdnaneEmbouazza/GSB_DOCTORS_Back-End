import { Router } from "express";
import {isloggedOn} from "../middleware/auth";
import * as medicamentsControleur from "../controllers/medicaments";

const router = Router();

// ROUTES PRIVEES (authentification )

/*
GET /GSB/medicaments => affiche la liste de tous les medicaments
GET /GSB/medicament/:id => affiche les infos d'un medicament spécifique
POST /GSB/medicament => crée un nouveau medicament
PUT /GSB/medicament/:id => modifie un medicament spécifique
DELETE /GSB/medicament/:id => supprime un medicament spécifique
*/

router.get('/medicaments' ,isloggedOn , medicamentsControleur.listAllMedicaments);

router.get('/medicament' , isloggedOn , medicamentsControleur.listMedicamentsByID);

router.post('/medicament/:id' , isloggedOn , medicamentsControleur.createMedicament);

router.put('/medicament/:id' , isloggedOn , medicamentsControleur.updateMedicamentByID);

router.delete('/medicament/:id' , isloggedOn , medicamentsControleur.deleteMedicamentByID);

export default router;