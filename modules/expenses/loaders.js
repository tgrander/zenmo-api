import flatten from 'lodash/flatten';
import Expenses from './model';

async function addTransactionsToDatabase(transactions) {
  // flatten transactions array
  const flattenedTransactions = flatten(transactions);

  // add each transaction to the DB
  flattenedTransactions.forEach(transaction => {
    const newTransaction = new Expenses(transaction);
    newTransaction.save()
  })
}

export default addTransactionsToDatabase
