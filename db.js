var mongoose = require('mongoose');
var databaseConfig = require('./config').databaseConfig;

mongoose.connect('mongodb://localhost:27017/zenmo');
