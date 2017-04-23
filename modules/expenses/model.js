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
  category: [
    String,
     String
  ],
  category_id: String
  , {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  collection: 'users'
});

Schema.index({
  'profile.name': 'text',
  'profile.categories': 'text',
  'profile.position': 'text',
  'profile.location.city': 'text'
});

Schema
  .pre('save', function (next) {
    if (!this.isModified('services.password.bcrypt')) {
      return next();
    }
    return this.encryptPassword(this.services.password.bcrypt)
      .then((hash) => {
        this.services.password.bcrypt = hash;
        next();
      })
      .catch(err => next(err));
  });

Schema.methods = {
  async authenticate(plainTextPassword) {
    try {
      return await bcrypt.compare(plainTextPassword, this.services.password.bcrypt);
    } catch (err) {
      return false;
    }
  },
  encryptPassword(password) {
    return bcrypt.hash(password, 8);
  },
};

export default mongoose.model('Users', Schema);
