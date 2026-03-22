import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as rapportControleur from "../controllers/rapport";

const router = Router();

// ROUTES PRIVEES (authentification )

/*
GET /GSB/rapports => affiche la liste de tous les rapports
GET /GSB/rapport/:id => affiche les infos d'un rapport spécifique
POST /GSB/rapport => crée un nouveau rapport
PUT /GSB/rapport/:id => modifie un rapport spécifique
DELETE /GSB/rapport/:id => supprime un rapport spécifique
*/

router.get('/rapports' , isloggedOn , rapportControleur.listAllRapport)

router.get('/rapport/:id' , isloggedOn , rapportControleur.listRapportByID)

router.post('/rapport' , isloggedOn , rapportControleur.createRapport)

router.put('/rapport/:id' , isloggedOn , rapportControleur.updateRapportByID)

router.delete('/rapport/:id' , isloggedOn , rapportControleur.deleteRapportByID)

export default router;