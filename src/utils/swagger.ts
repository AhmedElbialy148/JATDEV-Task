import { fastify } from '../app.js';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const swaggerSetup = () => {
  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'JATDEV-task API',
        description: 'API endpoints for JATDEV-task',
        version: '1.0.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: 'localhost',
      schemes: ['http', 'WebSocket'],
      consumes: ['application/json'],
      produces: ['application/json'],
      // tags: [
      //   { name: 'user', description: 'User related end-points' },
      //   { name: 'code', description: 'Code related end-points' },
      // ],
      definitions: {
        User: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            role: { type: 'string' },
          },
        },
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
  });

  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
};
export default swaggerSetup;
