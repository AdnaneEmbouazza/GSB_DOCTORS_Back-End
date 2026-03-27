import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as offrirControlleur from "../controllers/offrir";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/offrir:
 *   get:
 *     summary: Récupérer la liste de toutes les offres
 *     description: Retourne la liste complète de toutes les offres (médicaments offerts dans les rapports)
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Offres
 *     responses:
 *       200:
 *         description: Liste des offres récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idrapport:
 *                     type: integer
 *                   idmedicament:
 *                     type: string
 *                   quantite:
 *                     type: integer
 *       401:
 *         description: Non authentifié
 */
router.get('/offrir' ,isloggedOn , asyncHandler(offrirControlleur.listAllOffre));

/**
 * @swagger
 * /api/offrir/{id}:
 *   get:
 *     summary: Récupérer une offre par ID
 *     description: Retourne les détails d'une offre spécifique
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Offres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'offre (composé de idrapport-idmedicament)
 *     responses:
 *       200:
 *         description: Offre récupérée avec succès
 *       404:
 *         description: Offre non trouvée
 *       401:
 *         description: Non authentifié
 */
router.get('/offrir/:id' , isloggedOn , asyncHandler(offrirControlleur.listOffreByID));

/**
 * @swagger
 * /api/offrir:
 *   post:
 *     summary: Créer une nouvelle offre
 *     description: Crée une nouvelle offre (médicament offert dans un rapport)
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Offres
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idrapport:
 *                 type: integer
 *               idmedicament:
 *                 type: string
 *               quantite:
 *                 type: integer
 *             required:
 *               - idrapport
 *               - idmedicament
 *               - quantite
 *     responses:
 *       201:
 *         description: Offre créée avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 */
router.post('/offrir' , isloggedOn , asyncHandler(offrirControlleur.createOffre));

/**
 * @swagger
 * /api/offrir/{id}:
 *   put:
 *     summary: Modifier une offre
 *     description: Met à jour les informations d'une offre existante
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Offres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'offre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantite:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Offre modifiée avec succès
 *       404:
 *         description: Offre non trouvée
 *       401:
 *         description: Non authentifié
 */
router.put('/offrir/:id' , isloggedOn , asyncHandler(offrirControlleur.updateOffreByID));

/**
 * @swagger
 * /api/offrir/{id}:
 *   delete:
 *     summary: Supprimer une offre
 *     description: Supprime une offre de la base de données
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Offres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'offre
 *     responses:
 *       200:
 *         description: Offre supprimée avec succès
 *       404:
 *         description: Offre non trouvée
 *       401:
 *         description: Non authentifié
 */
router.delete('/offrir/:id' , isloggedOn , asyncHandler(offrirControlleur.deleteOffreByID));
 

export default router;