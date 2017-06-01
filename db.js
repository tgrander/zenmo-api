import mongoose from 'mongoose'
import databaseConfig from './config'

export default function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => reject(error))
      // .once('open', () => {
      //   resolve(mongoose.connections[0]);
      // });
    mongoose.connect(databaseConfig);
  });
}
