import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as rapportControleur from "../controllers/rapport";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

// ROUTES PRIVEES (authentification )

/*
GET /GSB/rapports => affiche la liste de tous les rapports
GET /GSB/rapport/:id => affiche les infos d'un rapport spécifique
POST /GSB/rapport => crée un nouveau rapport
PUT /GSB/rapport/:id => modifie un rapport spécifique
DELETE /GSB/rapport/:id => supprime un rapport spécifique
*/

router.get('/rapports' , isloggedOn , asyncHandler(rapportControleur.listAllRapport));

router.get('/rapport/:id' , isloggedOn , asyncHandler(rapportControleur.listRapportByID));

router.post('/rapport' , isloggedOn , asyncHandler(rapportControleur.createRapport));

router.put('/rapport/:id' , isloggedOn , asyncHandler(rapportControleur.updateRapportByID));

router.delete('/rapport/:id' , isloggedOn , asyncHandler(rapportControleur.deleteRapportByID));

export default router;