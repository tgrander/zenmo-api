import { firestore } from '../../../../firebase';
import { transactionsRef } from '../../../databaseRefs';
import transformTransaction from '../../transactions/mutations/tranformTransaction';


export default async (transactions) => {
    transactions.forEach(async (transaction) => {
        const { transaction_id } = transaction;

        try {
            const doc = await firestore.runTransaction(db => db.get(transactionsRef.doc(transaction_id))

            if (doc.exists) {
                return Promise.reject(new Error('Transaction already exists'));
            }

            const transformedTransaction = transformTransaction(transaction);

            transactionsRef.doc(transaction_id).set(transformedTransaction);

            return Promise.resolve(`Transaction ${transaction_id} added to Firestore`);
        } catch (error) {
          throw new Error(error)
        }
    });
};
