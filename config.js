/*
 * Database Configs
 */
const dBdevelopment = 'mongodb://localhost:27017/zenmo';
const dBproduction = process.env.MONGO_URL;
const databaseConfig = (process.env.NODE_ENV === 'production') ? dBproduction : dBdevelopment;

export default databaseConfig;
