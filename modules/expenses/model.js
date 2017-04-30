import mongoose from 'mongoose';

export const Schema = new mongoose.Schema({
  _id: {
    type: String
  },
  account_id: String,
  transaction_id: String,
  pending: Boolean,
  amount: Number,
  date: String,
  name: String,
  meta: {
    location: {
      coordinates: {
        lat: Number,
        lng: Number
      },
     state: String,
     city: String,
     address: String
    }
  },
  transaction_type: String,
  category: [String],
  category_id: String,
  {
    timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  collection: 'expenses'
});

export default mongoose.model('Expenses', Schema);
