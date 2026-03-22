import { Router } from "express";
import { isloggedOn } from "../middleware/authHandler";
import * as visiteurControleur from "../controllers/visiteur.js";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

// ROUTES PUBLIQUES (no authentification )
// =======================================

/* 
POST /GSB/visiteurs/login => authentification 
POST /GSB/visiteurs/inscription => création d'un compte 
*/

router.post('/login' , asyncHandler(visiteurControleur.login));
router.post('/inscription' , asyncHandler(visiteurControleur.inscription));

// ROUTES PRIVEES (authentification obligatoire)
// =======================================

/*
GET /GSB/visiteurs/account/:id => affiche les infos du compte pour l'utilisateur connecté
PUT /GSB/visiteurs/account/:id => modifie les infos du compte par l'utilisateur connecté
DELETE /GSB/visiteurs/account/:id => supprime le compte de l'utilisateur connectés
GET /GSB/visiteurs/ => affiche la liste de tous les visiteurs (admin uniquement)
GET /GSB/visiteurs/:id => affiche les infos d'un visiteur spécifique (admin uniquement)
*/

router.get ('/account/:id' , isloggedOn , asyncHandler(visiteurControleur.getVisiteurByID));
router.put ('/account/:id' , isloggedOn , asyncHandler(visiteurControleur.updateVisiteur));
router.delete ('/account/:id' , isloggedOn , asyncHandler(visiteurControleur.deleteVisiteur));
router.get ('/' , isloggedOn , asyncHandler(visiteurControleur.getAllVisiteurs));
router.get ('/:id' , isloggedOn , asyncHandler(visiteurControleur.getVisiteurByID));

export default router;



