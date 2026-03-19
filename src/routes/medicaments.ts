import { Router } from "express";
import * as medicamentsControleur from "../controllers/medicaments";

const router = Router();

router.get('/medicaments' , medicamentsControleur.listAllMedicaments);

router.get('/medicament' , medicamentsControleur.listAllMedicamentsByID);

router.post('/medicament/:id' , medicamentsControleur.createMedicament);

router.put('/medicament/:id' , medicamentsControleur.updateMedicamentByID);

router.delete('/medicament/:id' , medicamentsControleur.deleteMedicamentByID);