import mongoose from 'mongoose';
import roles from './roles.js';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: roles.user,
    // enum: ['Admin', 'User', 'Project manager'],
    // default: 'User',
  },
});

export default mongoose.model('User', UserSchema);
