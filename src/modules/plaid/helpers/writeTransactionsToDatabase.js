import { transactionsRef } from '../../../databaseRefs';
import transformTransaction from '../../../helpers/tranformTransaction';
import intelligentlyCategorizeTransaction from '../../transactions/helpers/intelligentlyCategorizeTransaction';

/**
   * Retrieve recently added transaction data from Plaid API
   *
   * @param  {array} transactions transactions to add to Firestore
   * @param  {string} userId unique id of user who transactions belong to
   * @return {undefined}
   */
export default (transactions, userId) => new Promise((resolve, reject) => {
    let numberOfTransactionsAdded = 0;
    let transactionsProcessed = 0;
    transactions.forEach(async (transaction) => {
        transactionsProcessed += 1;

        const { name, category, transaction_id } = transaction;
        const transactionsDocRef = transactionsRef.doc(transaction_id);

        try {
            const doc = await transactionsDocRef.get();

            if (!doc.exists) {
                const transformedTransaction = transformTransaction(
                    transaction,
                    userId,
                );
                transactionsDocRef.set(transformedTransaction);
                numberOfTransactionsAdded += 1;
            }

            if (transactions.length === transactionsProcessed) {
                return resolve(`
                  ${numberOfTransactionsAdded} transactions added to database \n
                  ${transactions.length} total transactions
                `);
            }
        } catch (e) {
            return reject(e);
        }
    });
});
