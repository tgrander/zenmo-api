import admin from 'firebase-admin';
import { firestore } from '../../../../firebase';
import { transactionsRef } from '../../../databaseRefs';
import chunkDocs from '../../../utilities/chunkDocs';

export default async () => {
    try {
        const querySnapshot = await transactionsRef.get();
        const chunkedDocs = chunkDocs(querySnapshot._docs());

        chunkedDocs.forEach((docs) => {
            const batch = firestore.batch();

            docs.forEach((doc) => {
                const { category, transaction_id } = doc.data();
                const ref = transactionsRef.doc(transaction_id);

                batch.update(ref, {
                    plaidCategories: category || null,
                    primaryCategory: admin.firestore.FieldValue.delete(),
                    subCategory: admin.firestore.FieldValue.delete(),
                    category: null,
                    type: null,
                });
            });

            batch.commit();
        });

        return Promise.resolve('transactions updated');
    } catch (e) {
        console.error(e);
        return Promise.reject(e);
    }
};
