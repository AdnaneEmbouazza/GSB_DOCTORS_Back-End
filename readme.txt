# API Gestion Rapports Médicaux

Ce projet est une API REST construite avec Node.js, Express et TypeScript pour gérer des rapports fais par des visiteur , avec des médecins et des familles de médicaments .

## Architecture

- **routes/** : Définit les endpoints de l’API.
- **middleware/** : Contient les règles métier et les mécanismes d’authentification.
- **models/** : Définit les interfaces et types pour la validation des modèles de données.
- **controllers/** : Contient la logique de gestion des requêtes HTTP.
- **services/** : Gère la logique métier et l’accès aux données.
- **app.ts** : Point d’entrée de l’application.

## Prérequis

- Node.js >= 16
- npm

## Installation

```bash
git clone <repo-url>
cd <nom-du-projet>
npm install