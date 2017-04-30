var flatten = require('lodash/flatten')
import Expenses from './model'

export function addTransactionsToDatabase(transactions) {
  // flatten transactions array
  var flattenedTransactions = flatten(transactions);
  console.log('flattenedTransactions ', flattenedTransactions);

  // add each transaction to the DB
  flattenedTransactions.forEach(function(transaction) {
    new Expenses(transaction).save()
  })
}
