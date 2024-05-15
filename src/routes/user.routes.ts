import { FastifyInstance } from 'fastify';
import * as userController from '../controllers/user.controller.js';
import * as options from '../schemas/user.schema.js';

const userRoutes = (fastify: FastifyInstance, _: any, done: Function) => {
  // Signup new user
  fastify.post(
    '/signup',
    { schema: options.signupUserSchema },
    userController.signup
  );

  // Login
  fastify.post(
    '/login',
    { schema: options.loginUserSchema },
    userController.login
  );

  // Get all users
  fastify.get(
    '/',
    { schema: options.getAllUsersSchema },
    userController.getAllUsers
  );

  // Get user by ID
  fastify.get(
    '/:id',
    { schema: options.getUserByIdSchema },
    userController.getUserById
  );

  // Update user by ID
  fastify.put(
    '/:id',
    {
      schema: options.updateUserByIdSchema,
      onRequest: [fastify.authenticate],
    },
    userController.updateUserById
  );

  // Delete user by ID
  fastify.delete(
    '/:id',
    {
      schema: options.deleteUserByIdSchema,
      onRequest: [fastify.authenticate],
    },
    userController.deleteUserById
  );

  done();
};

export default userRoutes;
