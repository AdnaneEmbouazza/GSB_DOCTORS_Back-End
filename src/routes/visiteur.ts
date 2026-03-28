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
 * /api/visiteurs/logout:
 *   post:
 *     summary: Déconnnecter l'utilisateur
 *     description: Supprime le token d'authentification et déconnecte l'utilisateur
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Visiteurs
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       401:
 *         description: Non authentifié
 */
router.post('/visiteurs/logout' , isloggedOn , asyncHandler(visiteurControleur.logout));

/**
 * @swagger
 * /api/visiteurs/account:
 *   get:
 *     summary: Récupérer les infos de mon compte
 *     description: Retourne les informations du compte de l'utilisateur connecté (extrait du token)
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Visiteurs
 *     responses:
 *       200:
 *         description: Informations du compte récupérées
 *       404:
 *         description: Visiteur non trouvé
 *       401:
 *         description: Non authentifié
 */
router.get ('/visiteurs/account' , isloggedOn , asyncHandler(visiteurControleur.getCurrentVisiteur));

/**
 * @swagger
 * /api/visiteurs/account:
 *   put:
 *     summary: Mettre à jour mon compte
 *     description: Met à jour les informations de mon compte via le token d'authentification
 *     security:
 *       - BearerAuth: []
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
 *               adresse:
 *                 type: string
 *               cp:
 *                 type: string
 *               ville:
 *                 type: string
 *               telephone:
 *                 type: string
 *               login:
 *                 type: string
 *               motdepasse:
 *                 type: string
 *     responses:
 *       200:
 *         description: Compte mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Visiteur non trouvé
 */
router.put('/visiteurs/account', isloggedOn , asyncHandler(visiteurControleur.updateCurrentVisiteur));

/**
 * @swagger
 * /api/visiteurs/account:
 *   delete:
 *     summary: Supprimer mon compte
 *     description: Supprime définitivement mon compte via le token d'authentification
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Visiteurs
 *     responses:
 *       200:
 *         description: Compte supprimé avec succès
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Visiteur non trouvé
 */
router.delete('/visiteurs/account', isloggedOn , asyncHandler(visiteurControleur.deleteCurrentVisiteur));

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
 * /api/visiteurs/search:
 *   get:
 *     summary: Rechercher des visiteurs par nom ou prénom
 *     description: Retourne la liste des visiteurs dont le nom ou prénom contient le terme recherché
 *     tags:
 *       - Visiteurs
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
 *         description: Liste des visiteurs correspondant à la recherche
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Visiteur'
 *       400:
 *         description: Paramètre de recherche manquant
 */
router.get('/visiteurs/search', asyncHandler(visiteurControleur.searchVisiteursByNom));

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



export default router;



