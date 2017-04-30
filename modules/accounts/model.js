var mongoose = require('mongoose');

export const Schema = new mongoose.Schema({
  _id: {
    type: String
  }
});

modules.export = mongoose.model('Expenses', Schema);
