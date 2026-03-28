import { swaggerUi, specs } from './src/swagger';
import express from 'express';
import cookieParser from 'cookie-parser';
import familleRouter from './src/routes/famille';
import medicamentRouter from './src/routes/medicaments';
import medecinRouter from './src/routes/medecin';
import visiteurRouter from './src/routes/visiteur';
import rapportRouter from './src/routes/rapport';
import offreRouter from './src/routes/offrir';
import {isloggedOn} from "./src/middleware/authHandler";
import { error } from 'node:console';
import { errorHandler } from './src/middleware/errorHandler';


const app = express();
const PORT = 3000;

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(cookieParser()); // Middleware pour parser les cookies
app.use('/api', familleRouter);
app.use('/api', medicamentRouter);
app.use('/api', medecinRouter);
app.use('/api', visiteurRouter);
app.use('/api', rapportRouter);
app.use('/api', offreRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de GSB' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});