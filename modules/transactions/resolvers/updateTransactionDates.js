import chunk from 'lodash/chunk'
import { firestore } from '../../../firebase'


const transactionsRef = firestore.collection('transactions')


const writeBatch = (firestore, docs, collectionRef) => {

    const batch = firestore.batch()

    docs.forEach(doc => {

        const documentRef = doc.data().transaction_id

        const newDate = new Date(doc.data().date)

        batch.update(collectionRef.doc(documentRef), { date: newDate })
    })

    return batch.commit()
        .then(() => console.log('Update transaction dates batch successful'))
}


const updateTransactionDates = () => {

    transactionsRef.get()
        .then(snapshot => {

            // chunk docs into lists of 500 items - Firestore only allows batches of 500 items at a time
            const chunkedDocs = chunk(snapshot._docs(), 500)

            chunkedDocs.forEach(docs => writeBatch(firestore, docs, transactionsRef))
        })
        .catch(err => {
            
            console.log('Error getting documents', err)
        })
}

export default updateTransactionDates
