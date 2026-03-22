import winston from 'winston';

// Configuration de Winston pour le logging
const logger = winston.createLogger({
    level: 'http', // Niveau de log par défaut

    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Format du timestamp
        winston.format.errors({ stack: true }), // Inclure la stack trace pour les erreurs
        winston.format.json() // Format de log en JSON
    ),

    transports: [
        // Transport pour les logs d'erreur (niveau 'error' et supérieur)
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),

        // Transport pour les logs d'information (niveau 'info' et supérieur)
        new winston.transports.File({ filename: 'logs/app.log' }),

        // Transport pour les logs de développement (console)
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // Coloriser les logs pour la console
                winston.format.simple() // Format simple pour la console
            )
        })
    ]
});

export default logger;