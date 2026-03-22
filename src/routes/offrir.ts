import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as offrirControlleur from "../controllers/offrir";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();


// ROUTES PRIVEES (authentification )

/*
GET /GSB/offrir => affiche la liste de tous les offre
GET /GSB/offrir/:id => affiche les infos d'un offre spécifique
POST /GSB/offrir => crée un nouveau offre
PUT /GSB/offrir/:id => modifie un offre spécifique
DELETE /GSB/offrir/:id => supprime un offre spécifique
*/

router.get('/offrir' ,isloggedOn , asyncHandler(offrirControlleur.listAllOffre));

router.get('/offrir/:id' , isloggedOn , asyncHandler(offrirControlleur.listOffreByID));

router.post('/offrir' , isloggedOn , asyncHandler(offrirControlleur.createOffre));

router.put('/offrir/:id' , isloggedOn , asyncHandler(offrirControlleur.updateOffreByID));

router.delete('/offrir/:id' , isloggedOn , asyncHandler(offrirControlleur.deleteOffreByID));
 

export default router;