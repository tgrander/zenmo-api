import express from 'express';
import connectDatabase from './db';

import expensesRouter from './modules/expenses/router'
import plaidRouter from './modules/plaid/router'

const app = express();

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is undefined')
}

app.get('/', function(req, res) {
  res.send('hello world');
})
/*
* EXPENSES ROUTES
*/
app.use('/expenses', expensesRouter);
/*
* PLAID ROUTES
*/
app.use('/plaid', plaidRouter);

export default app;
