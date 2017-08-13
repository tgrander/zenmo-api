import app from './app'
// import connectDatabase from './db'

const port = process.env.PORT || 8000;

app.listen(port);
console.log(`Server started on port ${port}`);
