import { Router } from "express";
import {isloggedOn} from "../middleware/auth";
import * as familleControlleur from '../controllers/famille';

const router = Router();

// ROUTES PRIVES (authentification )

/* 
GET /GSB/familles => affiche la liste de toutes les familles
GET /GSB/famille/:id => affiche les infos d'une famille spécifique
POST /GSB/famille => crée une nouvelle famille
PUT /GSB/famille/:id => modifie une famille spécifique
DELETE /GSB/famille/:id => supprime une famille spécifique
*/

router.get('/familles', isloggedOn , familleControlleur.listAllFamilles);

router.get('/famille/:id', isloggedOn , familleControlleur.listFamilleByID);

router.post('/famille' , isloggedOn ,familleControlleur.createFamille);

router.put('/famille/:id' , isloggedOn , familleControlleur.updateFamilleByID);

router.delete('/famille/:id' , isloggedOn , familleControlleur.deleteFamilleByID);

export default router;