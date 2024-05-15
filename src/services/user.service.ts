import { ObjectId } from '@fastify/mongodb';
import User from '../models/user.model.js';
import { throwError } from '../utils/error_handling.js';
import { UserType } from '../utils/types.js';

export const findAll = () => {
  return User.find();
};

export const findById = (id: string) => {
  return User.findById(id);
};

export const findByemail = (email: string) => {
  return User.findOne({ email: email });
};

export const createUser = (userData: UserType) => {
  return User.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    salt: userData.salt,
  });
};

export const deleteById = async (id: string) => {
  return User.deleteOne({ _id: id });
};
