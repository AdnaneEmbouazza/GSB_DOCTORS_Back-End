import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as medicamentsControleur from "../controllers/medicaments";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/medicaments:
 *   get:
 *     summary: Récupérer la liste de tous les médicaments
 *     description: Retourne la liste complète de tous les médicaments
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Médicaments
 *     responses:
 *       200:
 *         description: Liste des médicaments récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nomcommercial:
 *                     type: string
 *                   idfamille:
 *                     type: string
 *                   composition:
 *                     type: string
 *                   effets:
 *                     type: string
 *                   contreindications:
 *                     type: string
 *       401:
 *         description: Non authentifié
 */
router.get('/medicaments' ,isloggedOn , asyncHandler(medicamentsControleur.listAllMedicaments));

/**
 * @swagger
 * /api/medicament/{id}:
 *   get:
 *     summary: Récupérer un médicament par ID
 *     description: Retourne les détails d'un médicament spécifique
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Médicaments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du médicament
 *     responses:
 *       200:
 *         description: Médicament récupéré avec succès
 *       404:
 *         description: Médicament non trouvé
 *       401:
 *         description: Non authentifié
 */
router.get('/medicament/:id' , isloggedOn , asyncHandler(medicamentsControleur.listMedicamentsByID));

// /**
//  * @swagger
//  * /api/medicament:
//  *   post:
//  *     summary: Créer un nouveau médicament
//  *     security:
//  *       - BearerAuth: []
//  *     tags:
//  *       - Médicaments
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               id:
//  *                 type: string
//  *               nomcommercial:
//  *                 type: string
//  *               idfamille:
//  *                 type: string
//  *               composition:
//  *                 type: string
//  *               effets:
//  *                 type: string
//  *               contreindications:
//  *                 type: string
//  *             required:
//  *               - id
//  *               - nomcommercial
//  *               - idfamille
//  *     responses:
//  *       201:
//  *         description: Médicament créé avec succès
//  *       400:
//  *         description: Données invalides
//  *       401:
//  *         description: Non authentifié
//  */
// router.post('/medicament' , isloggedOn , asyncHandler(medicamentsControleur.createMedicament));

// /**
//  * @swagger
//  * /api/medicament/{id}:
//  *   put:
//  *     summary: Modifier un médicament
//  *     security:
//  *       - BearerAuth: []
//  *     tags:
//  *       - Médicaments
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID du médicament
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               nomcommercial:
//  *                 type: string
//  *               composition:
//  *                 type: string
//  *               effets:
//  *                 type: string
//  *               contreindications:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Médicament modifié avec succès
//  *       404:
//  *         description: Médicament non trouvé
//  *       401:
//  *         description: Non authentifié
//  */
// router.put('/medicament/:id' , isloggedOn , asyncHandler(medicamentsControleur.updateMedicamentByID));

// /**
//  * @swagger
//  * /api/medicament/{id}:
//  *   delete:
//  *     summary: Supprimer un médicament
//  *     security:
//  *       - BearerAuth: []
//  *     tags:
//  *       - Médicaments
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID du médicament
//  *     responses:
//  *       200:
//  *         description: Médicament supprimé avec succès
//  *       404:
//  *         description: Médicament non trouvé
//  *       401:
//  *         description: Non authentifié
//  */
// router.delete('/medicament/:id' , isloggedOn , asyncHandler(medicamentsControleur.deleteMedicamentByID));

export default router;