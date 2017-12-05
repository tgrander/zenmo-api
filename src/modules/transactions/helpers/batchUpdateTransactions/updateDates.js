const updateTransactionDates = (firestore, docs, collectionRef, update) => {

    const batch = firestore.batch()

    docs.forEach(doc => {

        const documentRef = doc.data().transaction_id

        const newDate = new Date(doc.data().date)

        batch.update(collectionRef.doc(documentRef), { date: newDate })
    })

    return batch.commit()
        .then(() => console.log('Update transaction dates batch successful'))
}

export default updateTransactionDates
