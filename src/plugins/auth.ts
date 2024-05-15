import { fastifyPlugin } from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import roles from '../models/roles.js';
import * as userService from '../services/user.service.js';
import { sign } from 'crypto';
import exp from 'constants';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const authPlugin = (fastify: FastifyInstance, _: any, done: Function) => {
  fastify.register(fastifyJwt, {
    secret: 'supersecret',
    sign: {
      expiresIn: '1d',
    },
  });

  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );

  // fastify.decorate('authorize', async function (request: FastifyRequest, reply: FastifyReply) {
  //   try {
  //     const userId = request.user.userId;
  //     const user = await userService.findById(userId);

  //     return (user.role = roles.admin || user.id == userId);
  //   } catch (err) {
  //     reply.send(err);
  //   }
  // });

  done();
};

export default fastifyPlugin(authPlugin);
