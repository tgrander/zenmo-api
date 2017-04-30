var mongoose = require('mongoose');

export const Schema = new mongoose.Schema({
  _id: {
    type: String
  }
});

export default mongoose.model('Expenses', Schema);
