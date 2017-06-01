import app from './app'
import connectDatabase from './db'

const port = process.env.PORT || 8000;

(async () => {
  try {
    const info = await connectDatabase();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }

  await app.listen(port);
  console.log(`Server started on port ${graphqlPort}`);
})();
