import chunkDocs from '../utilities/chunkDocs';


export default ({
    db, transactionsRef, name, primaryCategory, subCategory,
}) =>
    new Promise((resolve, reject) => {
        let numberOfTransactionsUpdated = 0;

        if (!name) {
            resolve('Transaction has no name');
        }

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
                        primaryCategory,
                        subCategory,
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
