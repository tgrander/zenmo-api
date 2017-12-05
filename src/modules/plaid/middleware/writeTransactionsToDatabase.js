import { firestore } from '../../../../firebase';
import { transactionsRef } from '../../../databaseRefs';
import transformTransaction from '../../../helpers/tranformTransaction';


export default async (transactions) => {
    transactions.forEach(async (transaction) => {
        const { transaction_id } = transaction;

        try {
            await firestore.runTransaction(async (db) => {
                const transactionsDocRef = transactionsRef.doc(transaction_id);

                const doc = await db.get(transactionsDocRef);

                if (doc.exists) {
                    return Promise.reject(new Error('Transaction already exists'));
                }

                const transformedTransaction = transformTransaction(transaction);

                return db.update(transactionsDocRef, transformedTransaction);
            });

            return Promise.resolve(`Transaction ${transaction_id} added to Firestore`);
        } catch (error) {
            return Promise.reject(error);
        }
    });
};
