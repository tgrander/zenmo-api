var express = require('express');
var app = express();
var db = require('./db');

app.get('/', function(req, res) {
  console.log('HIT ME');
  res.status(200).send(['love', 'peace', 'accountability']);
})

// endpoints for all expenses-related actions
var expensesRouter = require('./modules/expenses/router');
app.use('/expenses', expensesRouter);

// endpoints for all plaid-related actions
var plaidRouter = require('./modules/plaid/router');
app.use('/plaid', plaidRouter);

module.exports = app;
