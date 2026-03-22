import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as familleControlleur from '../controllers/famille';
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

// ROUTES PRIVES (authentification )

/* 
GET /GSB/familles => affiche la liste de toutes les familles
GET /GSB/famille/:id => affiche les infos d'une famille spécifique
POST /GSB/famille => crée une nouvelle famille
PUT /GSB/famille/:id => modifie une famille spécifique
DELETE /GSB/famille/:id => supprime une famille spécifique
*/

// Async handler pour gérer les throw d'erreurs dans les fonctions asynchrones du contrôleurs

router.get('/familles', isloggedOn , asyncHandler(familleControlleur.listAllFamilles));

router.get('/famille/:id', isloggedOn , asyncHandler(familleControlleur.listFamilleByID));

router.post('/famille' , isloggedOn , asyncHandler(familleControlleur.createFamille));

router.put('/famille/:id' , isloggedOn , asyncHandler(familleControlleur.updateFamilleByID));

router.delete('/famille/:id' , isloggedOn , asyncHandler(familleControlleur.deleteFamilleByID));

export default router;