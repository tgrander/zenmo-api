/*
 * Database Configs
 */
var dBdevelopment = 'mongodb://localhost:27017/zenmo';
var dBproduction = process.env.MONGO_URL;
var databaseConfig = (process.env.NODE_ENV === 'production') ? dBproduction : dBdevelopment;

module.exports = databaseConfig
