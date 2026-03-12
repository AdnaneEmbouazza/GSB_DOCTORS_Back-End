import { Router } from "express";
import * as familleControlleur from '../controllers/famille';

const router = Router();

router.get('/familles' , familleControlleur.listAllFamilles);

router.get('/familles/:id' , familleControlleur.listFamilleByID);

router.post('/familles' , familleControlleur.createFamille);

router.put('/familles/:id' , familleControlleur.updateFamilleByID);

router.delete('/familles/:id' , familleControlleur.deleteFamilleByID);