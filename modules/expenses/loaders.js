var flatten = require('lodash/flatten')
var Expenses = require('./model')

function addTransactionsToDatabase(transactions) {
  // flatten transactions array
  var flattenedTransactions = flatten(transactions);

  // add each transaction to the DB
  flattenedTransactions.forEach(function(transaction) {
    new Expenses(transaction).save()
  })
}

modules.export = addTransactionsToDatabase