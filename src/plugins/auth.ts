import { fastifyPlugin } from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const authPlugin = (fastify: FastifyInstance, _: any, done: Function) => {
  fastify.register(fastifyJwt, {
    secret: `${process.env.JWT_SECRET}`,
    sign: {
      expiresIn: `${process.env.JWT_EXPIRES_IN}`,
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
