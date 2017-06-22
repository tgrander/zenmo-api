import mongoose from 'mongoose';

export const Schema = new mongoose.Schema({
  _id: {
    type: String
  },
  userId: String,
  accessToken: String,
  institution: {
   name: String,
   institution_id: String
 },
 account: {
   id: String
   name: String
 }
});

export default mongoose.model('Items', Schema);
