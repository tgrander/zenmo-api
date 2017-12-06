import { firestore } from '../../../../firebase';
import { transactionsRef } from '../../../databaseRefs';
import transformTransaction from '../../../helpers/tranformTransaction';


/**
   * Retrieve recently added transaction data from Plaid API
   *
   * @param  {array} transactions transactions to add to Firestore
   * @param  {string} userId unique id of user who transactions belong to
   * @return {undefined}
   */
export default (transactions, userId) => {
    transactions.forEach((transaction) => {
        const { transaction_id } = transaction;

        return firestore.runTransaction(async (db) => {
            const transactionsDocRef = transactionsRef.doc(transaction_id);

            try {
                const doc = await db.get(transactionsDocRef);

                if (doc.exists) {
                    return Promise.reject(new Error('Transaction already exists'));
                }

                const transformedTransaction = transformTransaction(transaction, userId);

                return transactionsDocRef.set(transformedTransaction);
            } catch (e) {
                return Promise.reject(e);
            }
        })
            .then(() => Promise.resolve(`Transaction ${transaction_id} added to Firestore`))
            .catch(e => Promise.reject(e));
    });
};
