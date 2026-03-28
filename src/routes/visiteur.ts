import { Router } from "express";
import { isloggedOn } from "../middleware/authHandler";
import * as visiteurControleur from "../controllers/visiteur";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/visiteurs/login:
 *   post:
 *     summary: Authentification d'un visiteur
 *     description: Authentifie un visiteur avec ses identifiants
 *     tags:
 *       - Visiteurs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               mdp:
 *                 type: string
 *             required:
 *               - login
 *               - mdp
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Identifiants invalides
 */
router.post('/visiteurs/login' , asyncHandler(visiteurControleur.login));

/**
 * @swagger
 * /api/visiteurs/inscription:
 *   post:
 *     summary: Créer un nouveau compte visiteur
 *     description: Enregistre un nouveau visiteur dans le système
 *     tags:
 *       - Visiteurs
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
 *               login:
 *                 type: string
 *               mdp:
 *                 type: string
 *               adresse:
 *                 type: string
 *               cp:
 *                 type: string
 *               ville:
 *                 type: string
 *               dateembauche:
 *                 type: string
 *             required:
 *               - login
 *               - mdp
 *     responses:
 *       201:
 *         description: Compte créé avec succès
 *       400:
 *         description: Données invalides ou login déjà utilisé
 */
router.post('/visiteurs/inscription' , asyncHandler(visiteurControleur.inscription));

/**
 * @swagger
 * /api/visiteurs/account/{id}:
 *   get:
 *     summary: Récupérer les infos du compte
 *     description: Retourne les informations du compte de l'utilisateur connecté
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Visiteurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du visiteur
 *     responses:
 *       200:
 *         description: Informations du compte récupérées
 *       404:
 *         description: Visiteur non trouvé
 *       401:
 *         description: Non authentifié
 */
router.get ('/visiteurs/account/:id' , isloggedOn , asyncHandler(visiteurControleur.getCurrentVisiteur));

/**
 * @swagger
 * /api/visiteurs/{id}:
 *   put:
 *     summary: Modifier les infos du compte
 *     description: Met à jour les informations du compte d'un visiteur 
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Visiteurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du visiteur
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
 *               cp:
 *                 type: string
 *               ville:
 *                 type: string
 *     responses:
 *       200:
 *         description: Compte modifié avec succès
 *       404:
 *         description: Visiteur non trouvé
 *       401:
 *         description: Non authentifié
 */
router.put ('/visiteurs/:id' , isloggedOn , asyncHandler(visiteurControleur.updateVisiteur));

/**
 * @swagger
 * /api/visiteurs/{id}:
 *   delete:
 *     summary: Supprimer le compte
 *     description: Supprime le compte d'un utilisateur
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Visiteurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du visiteur
 *     responses:
 *       200:
 *         description: Compte supprimé avec succès
 *       404:
 *         description: Visiteur non trouvé
 *       401:
 *         description: Non authentifié
 */
router.delete ('/visiteurs/:id' , isloggedOn , asyncHandler(visiteurControleur.deleteCurrentVisiteur));

/**
 * @swagger
 * /api/visiteurs:
 *   get:
 *     summary: Récupérer la liste de tous les visiteurs
 *     description: Retourne la liste complète de tous les visiteurs (admin uniquement)
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Visiteurs
 *     responses:
 *       200:
 *         description: Liste des visiteurs récupérée
 *       401:
 *         description: Non authentifié
 */
router.get ('/visiteurs' , isloggedOn , asyncHandler(visiteurControleur.getAllVisiteurs));

/**
 * @swagger
 * /api/visiteurs/{id}:
 *   get:
 *     summary: Récupérer un visiteur par ID
 *     description: Retourne les détails d'un visiteur spécifique (admin uniquement)
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Visiteurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du visiteur
 *     responses:
 *       200:
 *         description: Visiteur récupéré avec succès
 *       404:
 *         description: Visiteur non trouvé
 *       401:
 *         description: Non authentifié
 */
router.get ('/visiteurs/:id' , isloggedOn , asyncHandler(visiteurControleur.getVisiteurByID));

/**
 * @swagger
 * /api/visiteurs/account/{id}:
 *   put:
 *     summary: Modifier mes informations personnelles
 *     description: Met à jour les informations de votre compte. Vous ne pouvez modifier que votre propre compte.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Visiteurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du visiteur (doit correspondent à votre compte connecté)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom du visiteur
 *               prenom:
 *                 type: string
 *                 description: Prénom du visiteur
 *               adresse:
 *                 type: string
 *                 description: Adresse du visiteur
 *               cp:
 *                 type: string
 *                 description: Code postal
 *               ville:
 *                 type: string
 *                 description: Ville du visiteur
 *     responses:
 *       200:
 *         description: Compte modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visiteur'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié ou tentative de modifier un autre compte
 *       404:
 *         description: Compte non trouvé
 */
router.put ('/visiteurs/account/:id' , isloggedOn , asyncHandler(visiteurControleur.updateCurrentVisiteur));

/**
 * @swagger
 * /api/visiteurs/account/{id}:
 *   delete:
 *     summary: Supprimer mon compte
 *     description: Supprime définitivement votre compte. Vous ne pouvez supprimer que votre propre compte. Cette action est irréversible.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Visiteurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du visiteur (doit correspondre à votre compte connecté)
 *     responses:
 *       200:
 *         description: Compte supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visiteur'
 *       401:
 *         description: Non authentifié ou tentative de supprimer un autre compte
 *       404:
 *         description: Compte non trouvé
 */
router.delete ('/visiteurs/account/:id' , isloggedOn , asyncHandler(visiteurControleur.deleteCurrentVisiteur));

export default router;



