import { Router } from "express";
import * as familleControlleur from '../controllers/famille';

const router = Router();

router.get('/familles' , familleControlleur.listAllFamilles);

router.get('/famille/:id' , familleControlleur.listFamilleByID);

router.post('/famille' , familleControlleur.createFamille);

router.put('/famille/:id' , familleControlleur.updateFamilleByID);

router.delete('/famille/:id' , familleControlleur.deleteFamilleByID);