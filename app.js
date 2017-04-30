import express from 'express';
const app = express();
import db from './db';

import expensesRouter from './modules/expenses/router'
import plaidRouter from './modules/plaid/router'

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is undefined')
}

app.get('/', function(req, res) {
  res.send('hello world');
})
// endpoints for all expenses-related actions
app.use('/expenses', expensesRouter);

// endpoints for all plaid-related actions
app.use('/plaid', plaidRouter);

export default app;
