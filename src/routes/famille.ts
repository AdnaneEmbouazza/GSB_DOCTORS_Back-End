import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as familleControlleur from '../controllers/famille';
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/familles:
 *   get:
 *     summary: Récupérer la liste de toutes les familles
 *     description: Retourne la liste complète de toutes les familles de médicaments
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Familles
 *     responses:
 *       200:
 *         description: Liste des familles récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   libelle:
 *                     type: string
 *       401:
 *         description: Non authentifié
 */
router.get('/familles', isloggedOn , asyncHandler(familleControlleur.listAllFamilles));

/**
 * @swagger
 * /api/familles/{id}:
 *   get:
 *     summary: Récupérer une famille par ID
 *     description: Retourne les détails d'une famille spécifique
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Familles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la famille
 *     responses:
 *       200:
 *         description: Famille récupérée avec succès
 *       404:
 *         description: Famille non trouvée
 *       401:
 *         description: Non authentifié
 */
router.get('/famille/:id', isloggedOn , asyncHandler(familleControlleur.listFamilleByID));

/**
 * @swagger
 * /api/familles:
 *   post:
 *     summary: Créer une nouvelle famille
 *     description: Crée une nouvelle famille de médicaments
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Familles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               libelle:
 *                 type: string
 *             required:
 *               - id
 *               - libelle
 *     responses:
 *       201:
 *         description: Famille créée avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 */
router.post('/famille' , isloggedOn , asyncHandler(familleControlleur.createFamille));

/**
 * @swagger
 * /api/familles/{id}:
 *   put:
 *     summary: Modifier une famille
 *     description: Met à jour les informations d'une famille existante
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Familles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la famille
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *     responses:
 *       200:
 *         description: Famille modifiée avec succès
 *       404:
 *         description: Famille non trouvée
 *       401:
 *         description: Non authentifié
 */
router.put('/famille/:id' , isloggedOn , asyncHandler(familleControlleur.updateFamilleByID));

/**
 * @swagger
 * /api/familles/{id}:
 *   delete:
 *     summary: Supprimer une famille
 *     description: Supprime une famille de la base de données
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Familles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la famille
 *     responses:
 *       200:
 *         description: Famille supprimée avec succès
 *       404:
 *         description: Famille non trouvée
 *       401:
 *         description: Non authentifié
 */
router.delete('/famille/:id' , isloggedOn , asyncHandler(familleControlleur.deleteFamilleByID));

export default router;