import { Router } from "express";
import * as medecinControleur from "../controllers/medecin";

const router = Router();

router.get('/medecins' , medecinControleur.listAllMedecins);

router.get('/medecin/:id' , medecinControleur.listMedecinsByID);

router.post('/medecin' , medecinControleur.createMedecin);

router.put('/medecin/:id' , medecinControleur.updateMedecinByID);

router.delete('/medecin' , medecinControleur.deleteMedecinByID);