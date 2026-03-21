import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GSB Doctors API',
      version: '1.0.0',
      description: 'API documentation for GSB Doctors Backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };