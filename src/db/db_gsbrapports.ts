import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const db = new Pool(
    {
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '33306')
    }
)


// Test connexion au démarrage

db.connect()
  .then(client => {
    console.log("✅ Connected to MySQL database")
    client.release()
  })
  .catch(err => {
    console.error("❌ Database connection error", err)
  })
