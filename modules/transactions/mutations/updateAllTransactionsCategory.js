import { firestore as db } from '../../../firebase';
import transactionsRef from '../constants/transactionsRef';
import chunkDocs from '../utilities/chunkDocs';


const updateAllTransactionCategories = (description, newCategory) => new Promise((resolve, reject) => {
    const transactions = transactionsRef
        .where('description', '==', description)
        .get()
        .then((snapshot) => {
            const batch = db.batch();

            const chunkedDocs = chunkDocs(snapshot._docs());

            chunkedDocs.forEach(docs => docs.forEach((doc) => {
                const { category, transaction_id } = doc.data();

                batch.update(transactionsRef.doc(transaction_id), {
                    primary: category,
                    category: { ...category, [newCategory]: true },
                });
            }));

            batch.commit()
                .then((fulfillment) => {
                    console.log('Category succesfully updated for all transactions');
                    resolve(fulfillment);
                })
                .catch(err => reject(err));
        });
});

export default updateAllTransactionCategories;
