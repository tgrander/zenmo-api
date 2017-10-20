import chunk from 'lodash/chunk'
import { firestore } from '../../../../firebase'
import transactionsRef from '../../constants/transactionsRef'


const batchUpdateTransactions = batch => {

    transactionsRef.get()
        .then(snapshot => {

            // chunk docs into lists of 500 items - Firestore only allows batches of 500 items at a time
            const chunkedDocs = chunk(snapshot._docs(), 500)

            chunkedDocs.forEach(docs => batch(firestore, docs, transactionsRef))
        })
        .catch(err => {

            console.log('Error getting documents', err)
        })
}

export default batchUpdateTransactions
