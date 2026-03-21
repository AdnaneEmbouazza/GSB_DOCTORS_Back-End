import { Router } from "express";
import {isloggedOn} from "../middleware/auth";
import * as offrirControlleur from "../controllers/offrir";

const router = Router();


// ROUTES PRIVEES (authentification )

/*
GET /GSB/offrir => affiche la liste de tous les offre
GET /GSB/offrir/:id => affiche les infos d'un offre spécifique
POST /GSB/offrir => crée un nouveau offre
PUT /GSB/offrir/:id => modifie un offre spécifique
DELETE /GSB/offrir/:id => supprime un offre spécifique
*/

router.get('/offrir' ,isloggedOn , offrirControlleur.listAllOffre);

router.get('/offrir/:id' , isloggedOn , offrirControlleur.listOffreByID);

router.post('/offrir' , isloggedOn , offrirControlleur.createOffre);

router.put('/offrir/:id' , isloggedOn , offrirControlleur.updateOffreByID);

router.delete('/offrir/:id' , isloggedOn , offrirControlleur.deleteOffreByID);
 

export default router;