# Guide de Test API avec Swagger

Ce dossier contient des données de test JSON pour faciliter le test rapide de l'API GSB Doctors avec Swagger.

## 📊 Contenu de chaque fichier

### `visiteur.test.json`
- ✅ Login
- ✅ Inscription
- ✅ Récupérer le compte
- ✅ Modifier le compte

### `famille.test.json`
- ✅ Lister toutes les familles
- ✅ Récupérer par ID
- ✅ Créer une famille
- ✅ Modifier une famille
- ✅ Supprimer une famille

### `medecin.test.json`
- ✅ Lister tous les médecins **(SANS authentification)**
- ✅ Récupérer par ID
- ✅ Créer un médecin
- ✅ Modifier un médecin
- ✅ Supprimer un médecin

### `medicament.test.json`
- ✅ Lister tous les médicaments
- ✅ Récupérer par ID
- ✅ Créer un médicament
- ✅ Modifier un médicament
- ✅ Supprimer un médicament

### `rapport.test.json`
- ✅ Lister tous les rapports
- ✅ Récupérer par ID
- ✅ Créer un rapport
- ✅ Modifier un rapport
- ✅ Supprimer un rapport

### `offre.test.json`
- ✅ Lister toutes les offres
- ✅ Récupérer par ID (format: idrapport-idmedicament)
- ✅ Créer une offre
- ✅ Modifier une offre
- ✅ Supprimer une offre

## Procédure de test

### 1. Démarrer l'application
```bash
npm run dev
```

### 2. Accéder à Swagger
Ouvrez votre navigateur et allez à : `http://localhost:3000/api-docs` (ou le port configuré)

### 3. Ordre de test recommandé

#### Étape 1: Authentification (SANS token)
1. **POST /api/visiteurs/inscription** - Créer un compte
   - Copier les données de `visiteur.test.json` → `inscription`
   
2. **POST /api/visiteurs/login** - Se connecter
   - Copier les données de `visiteur.test.json` → `login`
   - ✅ Récupérer le **token** de la réponse
   - **Important**: Cliquez sur le cadenas 🔒 en haut de Swagger et entrez le token

#### Étape 2: Familles (AVEC token)
1. **POST /api/famille** - Créer une famille
   - Utiliser `famille.test.json` → `createFamille` → `body`

2. **GET /api/familles** - Lister les familles

3. **GET /api/famille/{id}** - Récupérer une famille
   - Remplacer `{id}` par `AFX`

4. **PUT /api/famille/{id}** - Modifier une famille
   - Utiliser `famille.test.json` → `updateFamille` → `body`

5. **DELETE /api/famille/{id}** - Supprimer une famille

#### Étape 3: Médecins (GET sans token, autres AVEC token)
1. **GET /api/medecins** - Lister tous les médecins (SANS token)

2. **POST /api/medecin** - Créer un médecin
   - Utiliser `medecin.test.json` → `createMedecin` → `body`

3. **GET /api/medecin/{id}** - Récupérer un médecin
   - Utiliser ID 1 ou celui créé

4. **PUT /api/medecin/{id}** - Modifier un médecin

5. **DELETE /api/medecin/{id}** - Supprimer un médecin

#### Étape 4: Médicaments (AVEC token)
1. **POST /api/medicament/{id}** - Créer un médicament
   - L'ID dans l'URL et dans le body doivent correspondre
   - Utiliser `medicament.test.json` → `createMedicament`

2. **GET /api/medicaments** - Lister les médicaments

3. **GET /api/medicament/{id}** - Récupérer un médicament

4. **PUT /api/medicament/{id}** - Modifier un médicament

5. **DELETE /api/medicament/{id}** - Supprimer un médicament

#### Étape 5: Rapports (AVEC token)
1. **POST /api/rapport** - Créer un rapport
   - Utiliser `rapport.test.json` → `createRapport` → `body`
   - Assurez-vous que `idvisiteur` et `idmedecin` existent

2. **GET /api/rapports** - Lister les rapports

3. **GET /api/rapport/{id}** - Récupérer un rapport

4. **PUT /api/rapport/{id}** - Modifier un rapport

5. **DELETE /api/rapport/{id}** - Supprimer un rapport

#### Étape 6: Offres (AVEC token)
1. **POST /api/offrir** - Créer une offre
   - Utiliser `offre.test.json` → `createOffre` → `body`
   - Assurez-vous que le rapport et le médicament existent

2. **GET /api/offrir** - Lister les offres

3. **GET /api/offrir/{id}** - Récupérer une offre
   - Format de l'ID: `{idrapport}-{idmedicament}`

4. **PUT /api/offrir/{id}** - Modifier une offre

5. **DELETE /api/offrir/{id}** - Supprimer une offre

## Configuration du token dans Swagger

1. Après avoir reçu un token du login, cliquez sur le cadenas 🔒 en haut à droite de Swagger
2. Dans le champ "Value", entrez: `Bearer <votre_token>`
3. Cliquez sur "Authorize"
4. Tous les endpoints protégés utilisent maintenant automatiquement ce token

## Conseils utiles

### Copier-Coller les données
- Ouvrez les fichiers `*.test.json` dans votre éditeur
- Pour chaque test, copiez la section `body` dans Swagger
- Modifiez les valeurs si nécessaire pour vos tests

### Exemple - Créer un médicament
```json
{
  "id": "NUROFEN",
  "nomCommercial": "Nurofen 400mg",
  "idfamille": "AIN",
  "composition": "Ibuprofène 400mg",
  "effets": "Anti-inflammatoire, analgésique",
  "contreindications": "Asthme, insuffisance rénale"
}
```

### IDs à connaître (de la base de données)
- **Familles existantes**: `AA`, `AAA`, `ABC`, `ABP`, `AFC`, `AFM`, `AH`, `AIM`, `AIN`, etc.
- **Médecins existants**: 1, 2, 3, 4, 5... (jusqu'à mille )
- **Visiteurs**: Dépend de votre création

## Vérification du bon fonctionnement

✅ **Authentification réussie** = Réception d'un token
✅ **Endpoints GET** = Retournent les données correctement
✅ **Endpoints POST** = Créent les ressources et retournent l'ID généré
✅ **Endpoints PUT** = Modifient les données sans erreur
✅ **Endpoints DELETE** = Suppriment les ressources avec confirmation

## Dépannage

### Erreur 401 (Non authentifié)
- Vérifiez que vous avez cliqué sur le cadenas et saisi le token
- Vérifiez que le token n'a pas expiré (se reconnecter)

### Erreur 404 (Ressource non trouvée)
- Vérifiez que l'ID existe dans la base de données
- Créez d'abord la ressource avant de la modifier

### Erreur 400 (Données invalides)
- Vérifiez que tous les champs obligatoires sont remplis
- Respectez les types de données (nombre, string, etc.)
- Assurez-vous que les IDs de clés étrangères existent

## Notes importantes

- Les endpoints **GET /api/medecins** est le seul qui ne nécessite PAS d'authentification
- Tous les autres endpoints nécessitent l'en-tête `Authorization: Bearer <token>`
- Les clés étrangères (idvisiteur, idmedecin, idfamille, idmedicament) doivent exister
- Les IDs des familles et médicaments sont **sensibles à la casse**

Bon testing! 🚀
