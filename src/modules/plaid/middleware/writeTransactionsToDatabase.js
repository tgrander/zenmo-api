import { firestore } from '../../../../firebase';
import { transactionsRef } from '../../../databaseRefs';
import transformTransaction from '../../../helpers/tranformTransaction';


export default async (transactions, userId) => {
    transactions.forEach((transaction) => {
        const { transaction_id } = transaction;

        firestore.runTransaction(async (db) => {
            const transactionsDocRef = transactionsRef.doc(transaction_id);

            const doc = await db.get(transactionsDocRef);

            if (doc.exists) {
                return Promise.reject(new Error('Transaction already exists'));
            }

            const transformedTransaction = transformTransaction(transaction, userId);

            return db.update(transactionsDocRef, transformedTransaction);
        });

        return Promise.resolve(`Transaction ${transaction_id} added to Firestore`);
    });
};
