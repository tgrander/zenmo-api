import mongoose from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

export const Schema = new mongoose.Schema({
  _id: {
    type: String
  },
  password: {
    bcrypt: String
  },
  username: String,
  firstSignin: Boolean,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  collection: 'users'
});

export default mongoose.model('Users', Schema);
