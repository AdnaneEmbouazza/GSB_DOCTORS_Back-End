import { Router } from "express";
import * as visiteurControleur from "../controllers/visiteur.js";
import { isloggedOn , isAdmin} from "../middleware/auth";

const router = Router();

// ROUTES PUBLIQUES (no authentification )
// =======================================

/* 
POST /GSB/visiteurs/login => authentification 
POST /GSB/visiteurs/inscription => création d'un compte 
*/

router.post('/login' , visiteurControleur.login);
router.post('/inscription' , visiteurControleur.inscription);

// ROUTES PRIVEES (authentification obligatoire)
// =======================================

/*
GET /GSB/visiteurs/account/:id => affiche les infos du compte pour l'utilisateur connecté
PUT /GSB/visiteurs/account/:id => modifie les infos du compte par l'utilisateur connecté
DELETE /GSB/visiteurs/account/:id => supprime le compte de l'utilisateur connectés
*/

router.get ('/account/:id' , isloggedOn , visiteurControleur.getVisiteurByID);
router.put ('/account/:id' , isloggedOn , visiteurControleur.updateVisiteur);
router.delete ('/account/:id' , isloggedOn , visiteurControleur.deleteVisiteur);

// ROUTES ADMIN (authentification + rôle admin) => implique mofification dans la BDD
// =======================================

/*
GET /GSB/visiteurs/ => affiche la liste de tous les visiteurs (admin uniquement)
GET /GSB/visiteurs/:id => affiche les infos d'un visiteur spécifique (admin uniquement)
*/

router.get ('/' , isloggedOn , isAdmin , visiteurControleur.getAllVisiteurs);
router.get ('/:id' , isloggedOn , isAdmin , visiteurControleur.getVisiteurByID);

export default router;



