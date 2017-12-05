import reduce from 'lodash/reduce'


const updateTransactionDates = (firestore, docs, collectionRef) => {

    const batch = firestore.batch()

    docs.forEach(doc => {

        const { transaction_id, category } = doc.data()

        const newCategory = reduce(category, (acc, curr) => {

            return {...acc, [curr]: true}

        }, {})

        batch.update(collectionRef.doc(transaction_id), { category: newCategory })
    })

    return batch.commit()
        .then(() => console.log('Update transaction categories batch successful'))
}

export default updateTransactionDates
