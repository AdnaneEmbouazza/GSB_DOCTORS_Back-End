import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as rapportControleur from "../controllers/rapport";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/rapports:
 *   get:
 *     summary: Récupérer vos rapports
 *     description: Retourne la liste de tous les rapports de visite de l'utilisateur connecté
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
 * /api/rapports/date:
 *   get:
 *     summary: Récupérer les rapports à une date spécifique
 *     description: Retourne la liste des rapports pour une date donnée et un visiteur spécifique. Si idvisiteur est omis, retourne les rapports de l'utilisateur connecté.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Rapports
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date au format YYYY-MM-DD
 *         example: "2024-01-15"
 *       - in: query
 *         name: idvisiteur
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID du visiteur (optionnel). Si non fourni, utilise l'utilisateur connecté
 *         example: 5
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
 *       400:
 *         description: Date invalide ou manquante
 *       401:
 *         description: Non authentifié
 */
router.get('/rapports/date' , isloggedOn , asyncHandler(rapportControleur.getRapportsByDate));

/**
 * @swagger
 * /api/rapport/{id}:
 *   get:
 *     summary: Récupérer un de vos rapports
 *     description: Retourne les détails d'un rapport si celui-ci appartient à l'utilisateur connecté
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
 *         description: ID de votre rapport
 *     responses:
 *       200:
 *         description: Rapport récupéré avec succès
 *       404:
 *         description: Rapport non trouvé
 *       401:
 *         description: Non authentifié ou rapport n'appartient pas à l'utilisateur
 */
router.get('/rapport/:id' , isloggedOn , asyncHandler(rapportControleur.listRapportByID));

/**
 * @swagger
 * /api/rapport:
 *   post:
 *     summary: Créer un nouveau rapport
 *     description: Crée un nouveau rapport de visite associé à l'utilisateur connecté
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
 *               idmedecin:
 *                 type: integer
 *             required:
 *               - date
 *               - motif
 *               - bilan
 *               - idmedecin
 *             description: Note - idvisiteur est déterminé automatiquement depuis le token
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
 * /api/rapport/{id}:
 *   put:
 *     summary: Modifier un de vos rapports
 *     description: Met à jour les informations d'un rapport si celui-ci appartient à l'utilisateur connecté
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
 *         description: ID de votre rapport
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
 *         description: Non authentifié ou rapport n'appartient pas à l'utilisateur
 */
router.put('/rapport/:id' , isloggedOn , asyncHandler(rapportControleur.updateRapportByID));

/**
 * @swagger
 * /api/rapport/{id}:
 *   delete:
 *     summary: Supprimer un de vos rapports
 *     description: Supprime un rapport si celui-ci appartient à l'utilisateur connecté
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
 *         description: ID de votre rapport
 *     responses:
 *       200:
 *         description: Rapport supprimé avec succès
 *       404:
 *         description: Rapport non trouvé
 *       401:
 *         description: Non authentifié ou rapport n'appartient pas à l'utilisateur
 */
router.delete('/rapport/:id' , isloggedOn , asyncHandler(rapportControleur.deleteRapportByID));

export default router;