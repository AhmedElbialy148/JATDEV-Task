// Imports /////////////////////////////////////////////////////
import Fastify from 'fastify';
export const fastify = Fastify({ logger: false });
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';
import authPlugin from './plugins/auth.js';
import { WebSocketServer } from 'ws';
import swaggerSetup from './utils/swagger.js';
import websocketEvents from './websockets/websocket-events.js';
import 'dotenv/config';

// Declarations ///////////////////////////////////////////////
declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
    config: { config: any };
  }
}

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: { userId: string };
    user: {
      userId: string;
      email: string;
    };
  }
}

// Swagger /////////////////////////////////////////////////////
swaggerSetup();

// Plugins ////////////////////////////////////////////////////
fastify.register(authPlugin);

// Routes /////////////////////////////////////////////////////
fastify.register(userRoutes, { prefix: '/users' });

// Error Handling /////////////////////////////////////////////////////
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(error.statusCode || 500).send({
    statusCode: error.statusCode || 500,
    message: error.message || 'Server Error Occured.',
  });
});

const start = async () => {
  // Database and Server ////////
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
  } catch (err) {
    console.log('Error Connecting to Database', err);
  }

  // Server & WebSocket /////////
  try {
    await fastify.ready();
    fastify.swagger();
    fastify.listen({ port: Number(process.env.PORT) || 3000 }).then(() => {
      fastify.log.info(`server listening on ${process.env.PORT || 3000}`);

      // Websocket using ws library
      const wss = new WebSocketServer({ server: fastify.server });
      wss.on('connection', function connection(ws) {
        websocketEvents(ws);
      });
    });
  } catch (error) {
    fastify.log.error(error);
    console.log(error);
    process.exit(1);
  }
};

start();
