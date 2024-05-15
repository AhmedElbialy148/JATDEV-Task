import * as userService from '../services/user.service.js';
import { throwError } from '../utils/error_handling.js';
import { hashPassword, verifyPassword } from '../utils/hash.js';
import { fastify } from '../app.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  SignupUserReqBodyType,
  LoginUserReqBodyType,
  UpdateUserReqBodyType,
  RequestParamType,
} from '../utils/types.js';

export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  const users = await userService.findAll();
  reply.status(200).send(users);
};

export const getUserById = async (
  req: FastifyRequest<{ Params: RequestParamType }>,
  reply: FastifyReply
) => {
  const id = req.params.id;
  const user = await userService.findById(id);

  // Check if user doesn't exist
  if (!user) throwError(404, 'User not found');
  // if (!user) throw new CustomError(404, 'User not found');

  reply.status(200).send(user);
};

export const signup = async (
  req: FastifyRequest<{ Body: SignupUserReqBodyType }>,
  reply: FastifyReply
) => {
  const body = req.body;

  //Check if user already exists
  const existingUser = await userService.findByemail(body.email);

  if (existingUser) throwError(400, 'User already exists');

  // Hash the password
  const { hash, salt } = hashPassword(body.password);

  // Create new user

  const user = await userService.createUser({
    ...body,
    password: hash,
    salt: salt,
  });

  reply.status(201).send({ message: 'User created successfully' });
};

export const login = async (
  req: FastifyRequest<{ Body: LoginUserReqBodyType }>,
  reply: FastifyReply
) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check if user exists
  const user = await userService.findByemail(email);
  if (!user) throwError(400, 'Email not found');
  else {
    // Check if password is correct
    const doMatch = verifyPassword(password, user.password, user.salt);
    if (!doMatch) throwError(400, 'Wrong Password');

    // Generate a JWT token
    const token = fastify.jwt.sign({ userId: user._id.toString() });

    reply.status(202).send({ token });
  }
};

export const updateUserById = async (
  req: FastifyRequest<{
    Body: UpdateUserReqBodyType;
    Params: RequestParamType;
  }>,
  reply: FastifyReply
) => {
  const id = req.params.id;
  const updatedData = req.body;

  // Check if user exists
  const user = await userService.findById(id);
  if (!user) throwError(404, 'User not found');
  else {
    // Check if user is authorized to update this user
    if (req.user.userId !== id) throwError(401, 'Unauthorized');

    // Update user data
    Object.assign(user, updatedData);

    // Save user
    await user.save();
  }
  reply.status(201).send({ message: 'User updated successfully' });
};

export const deleteUserById = async (
  req: FastifyRequest<{ Params: RequestParamType }>,
  reply: FastifyReply
) => {
  const id = req.params.id;

  const user = await userService.findById(id);

  // Check if user doesn't exists
  if (!user) throwError(404, 'User not found');

  // Check if user is authorized to delete this user
  if (req.user.userId !== id) throwError(401, 'Unauthorized');

  // Delete the user
  await userService.deleteById(id);
  reply.status(200).send({ message: 'User deleted successfully' });
};
