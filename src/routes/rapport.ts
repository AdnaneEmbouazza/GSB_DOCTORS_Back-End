import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as rapportControleur from "../controllers/rapport";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/rapports:
 *   get:
 *     summary: Récupérer la liste de tous les rapports
 *     description: Retourne la liste complète de tous les rapports de visite
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Rapports
 *     responses:
 *       200:
 *         description: Liste des rapports récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   motif:
 *                     type: string
 *                   bilan:
 *                     type: string
 *                   idvisiteur:
 *                     type: integer
 *                   idmedecin:
 *                     type: integer
 *       401:
 *         description: Non authentifié
 */
router.get('/rapports' , isloggedOn , asyncHandler(rapportControleur.listAllRapport));

/**
 * @swagger
 * /api/rapports/{id}:
 *   get:
 *     summary: Récupérer un rapport par ID
 *     description: Retourne les détails d'un rapport spécifique
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Rapports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du rapport
 *     responses:
 *       200:
 *         description: Rapport récupéré avec succès
 *       404:
 *         description: Rapport non trouvé
 *       401:
 *         description: Non authentifié
 */
router.get('/rapport/:id' , isloggedOn , asyncHandler(rapportControleur.listRapportByID));

/**
 * @swagger
 * /api/rapports:
 *   post:
 *     summary: Créer un nouveau rapport
 *     description: Crée un nouveau rapport de visite
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Rapports
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               motif:
 *                 type: string
 *               bilan:
 *                 type: string
 *               idvisiteur:
 *                 type: integer
 *               idmedecin:
 *                 type: integer
 *             required:
 *               - idvisiteur
 *               - idmedecin
 *     responses:
 *       201:
 *         description: Rapport créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 */
router.post('/rapport' , isloggedOn , asyncHandler(rapportControleur.createRapport));

/**
 * @swagger
 * /api/rapports/{id}:
 *   put:
 *     summary: Modifier un rapport
 *     description: Met à jour les informations d'un rapport existant
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Rapports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du rapport
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               motif:
 *                 type: string
 *               bilan:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rapport modifié avec succès
 *       404:
 *         description: Rapport non trouvé
 *       401:
 *         description: Non authentifié
 */
router.put('/rapport/:id' , isloggedOn , asyncHandler(rapportControleur.updateRapportByID));

/**
 * @swagger
 * /api/rapports/{id}:
 *   delete:
 *     summary: Supprimer un rapport
 *     description: Supprime un rapport de la base de données
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Rapports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du rapport
 *     responses:
 *       200:
 *         description: Rapport supprimé avec succès
 *       404:
 *         description: Rapport non trouvé
 *       401:
 *         description: Non authentifié
 */
router.delete('/rapport/:id' , isloggedOn , asyncHandler(rapportControleur.deleteRapportByID));

export default router;