import flatten from 'lodash/flatten';
import Expenses from './model';

const writeTransactionToDatabase = transaction => {
  const newTransaction = new Expenses(transaction)
  newTransaction.save()
}

async function checkIfTransactionAlreadyExists(transaction) {
  const foundTransaction = await Expenses.find({transaction_id})
  return foundTransaction ? true : false
}

async function addHistoricalTransactionsToDatabase() {
  transactions
}

async function addTransactionsToDatabase(transactions) {
  // flatten transactions array
  const flattenedTransactions = flatten(transactions);

  // add each transaction to the DB
  flattenedTransactions.forEach(transaction => {
    writeTransactionToDatabase(transaction)
  })
}

export default addTransactionsToDatabase
