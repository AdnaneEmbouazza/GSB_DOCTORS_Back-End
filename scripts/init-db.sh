#!/bin/bash
set -e

# Script qui automatise l'import de mysql , crée les table de la BDD via le script SQL , génére le client Prisma et lance l'Application
echo "⏳ Attente que MySQL soit prêt..."
until mysqladmin ping -h db -u ADN -p"FeKl%KfF*Bp6J:p$:%NF" --silent; do
  echo "MySQL non disponible, nouvelle tentative dans 2s..."
  sleep 2
done

echo "✅ MySQL est prêt!"

echo "� Importation du script SQL (tables + données)..."
mysql -h db -u ADN -p"FeKl%KfF*Bp6J:p$:%NF" gsbrapports < script_sql/gsbrapports.sql

echo "🔄 Génération du client Prisma..."
npx prisma generate

echo "🚀 Démarrage de l'application..."
npm run dev
