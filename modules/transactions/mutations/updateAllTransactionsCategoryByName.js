import chunkDocs from '../utilities/chunkDocs';


export default (db, transactionsRef, name, newPrimaryCategory, newSubCategory) =>
    new Promise((resolve, reject) => {
        let numberOfTransactionsUpdated = 0;

        transactionsRef
            .where('name', '==', name)
            .get()
            .then((snapshot) => {
                const batch = db.batch();

                const chunkedDocs = chunkDocs(snapshot._docs());

                chunkedDocs.forEach(docs => docs.forEach((doc) => {
                    numberOfTransactionsUpdated += 1;

                    const { transaction_id } = doc.data();

                    batch.update(transactionsRef.doc(transaction_id), {
                        primaryCategory: newPrimaryCategory,
                        subCategory: newSubCategory,
                    });
                }));

                batch.commit()
                    .then(() => {
                        console.log('Category succesfully updated for all transactions');
                        resolve(numberOfTransactionsUpdated);
                    })
                    .catch(err => reject(err));
            });
    });
