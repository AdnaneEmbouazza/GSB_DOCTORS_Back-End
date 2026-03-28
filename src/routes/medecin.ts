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
 * /api/medecins/search:
 *   get:
 *     summary: Rechercher des médecins par nom ou prénom
 *     description: Retourne la liste des médecins dont le nom ou prénom contient le terme recherché
 *     tags:
 *       - Médecins
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Terme à rechercher dans les noms ou prénoms
 *         example: "Dupont"
 *     responses:
 *       200:
 *         description: Liste des médecins correspondant à la recherche
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Paramètre de recherche manquant
 */
router.get('/medecins/search', asyncHandler(medecinControleur.searchMedecinsByNom));

/**
 * @swagger
 * /api/medecin/{id}:
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

// /**
//  * @swagger
//  * /api/medecin:
//  *   post:
//  *     summary: Créer un nouveau médecin
//  *     security:
//  *       - BearerAuth: []
//  *     tags:
//  *       - Médecins
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               nom:
//  *                 type: string
//  *               prenom:
//  *                 type: string
//  *               adresse:
//  *                 type: string
//  *               tel:
//  *                 type: string
//  *               specialitecomplementaire:
//  *                 type: string
//  *               departement:
//  *                 type: integer
//  *             required:
//  *               - nom
//  *               - prenom
//  *               - adresse
//  *               - departement
//  *     responses:
//  *       201:
//  *         description: Médecin créé avec succès
//  *       400:
//  *         description: Données invalides
//  *       401:
//  *         description: Non authentifié
//  */
// router.post('/medecin' , isloggedOn , asyncHandler(medecinControleur.createMedecin));

// /**
//  * @swagger
//  * /api/medecin/{id}:
//  *   put:
//  *     summary: Modifier un médecin
//  *     security:
//  *       - BearerAuth: []
//  *     tags:
//  *       - Médecins
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID du médecin
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               nom:
//  *                 type: string
//  *               prenom:
//  *                 type: string
//  *               adresse:
//  *                 type: string
//  *               tel:
//  *                 type: string
//  *               specialitecomplementaire:
//  *                 type: string
//  *               departement:
//  *                 type: integer
//  *     responses:
//  *       200:
//  *         description: Médecin modifié avec succès
//  *       404:
//  *         description: Médecin non trouvé
//  *       401:
//  *         description: Non authentifié
//  */
// router.put('/medecin/:id' , isloggedOn , asyncHandler(medecinControleur.updateMedecinByID));

// /**
 // * @swagger
 // * /api/medecin/{id}:
 // *   delete:
 // *     summary: Supprimer un médecin
 // *     security:
 // *       - BearerAuth: []
 // *     tags:
 // *       - Médecins
 // *     parameters:
 // *       - in: path
 // *         name: id
 // *         required: true
 // *         schema:
 // *           type: integer
 // *         description: ID du médecin
 // *     responses:
 // *       200:
 // *         description: Médecin supprimé avec succès
 // *       404:
 // *         description: Médecin non trouvé
 // *       401:
 // *         description: Non authentifié
 // */
//router.delete('/medecin/:id' , isloggedOn , asyncHandler(medecinControleur.deleteMedecinByID));

export default router;