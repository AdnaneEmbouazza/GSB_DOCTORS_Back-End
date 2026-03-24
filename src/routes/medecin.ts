import { Router } from "express";
import {isloggedOn} from "../middleware/authHandler";
import * as medecinControleur from "../controllers/medecin";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/medecins:
 *   get:
 *     summary: Récupérer la liste de tous les médecins
 *     description: Retourne la liste complète de tous les médecins sans authentification
 *     tags:
 *       - Médecins
 *     responses:
 *       200:
 *         description: Liste des médecins récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   prenom:
 *                     type: string
 *                   adresse:
 *                     type: string
 *                   tel:
 *                     type: string
 *                   specialitecomplementaire:
 *                     type: string
 *                   departement:
 *                     type: integer
 */
router.get('/medecins' , asyncHandler(medecinControleur.listAllMedecins));

/**
 * @swagger
 * /api/medecins/{id}:
 *   get:
 *     summary: Récupérer un médecin par ID
 *     description: Retourne les détails d'un médecin spécifique
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Médecins
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du médecin
 *     responses:
 *       200:
 *         description: Médecin récupéré avec succès
 *       404:
 *         description: Médecin non trouvé
 *       401:
 *         description: Non authentifié
 */
router.get('/medecin/:id' , isloggedOn , asyncHandler(medecinControleur.listMedecinsByID));

/**
 * @swagger
 * /api/medecins:
 *   post:
 *     summary: Créer un nouveau médecin
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Médecins
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               adresse:
 *                 type: string
 *               tel:
 *                 type: string
 *               specialitecomplementaire:
 *                 type: string
 *               departement:
 *                 type: integer
 *             required:
 *               - nom
 *               - prenom
 *               - adresse
 *               - departement
 *     responses:
 *       201:
 *         description: Médecin créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 */
router.post('/medecin' , isloggedOn , asyncHandler(medecinControleur.createMedecin));

/**
 * @swagger
 * /api/medecins/{id}:
 *   put:
 *     summary: Modifier un médecin
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Médecins
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du médecin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               adresse:
 *                 type: string
 *               tel:
 *                 type: string
 *               specialitecomplementaire:
 *                 type: string
 *               departement:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Médecin modifié avec succès
 *       404:
 *         description: Médecin non trouvé
 *       401:
 *         description: Non authentifié
 */
router.put('/medecin/:id' , isloggedOn , asyncHandler(medecinControleur.updateMedecinByID));

/**
 * @swagger
 * /api/medecins/{id}:
 *   delete:
 *     summary: Supprimer un médecin
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Médecins
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du médecin
 *     responses:
 *       200:
 *         description: Médecin supprimé avec succès
 *       404:
 *         description: Médecin non trouvé
 *       401:
 *         description: Non authentifié
 */
router.delete('/medecin/:id' , isloggedOn , asyncHandler(medecinControleur.deleteMedecinByID));

export default router;