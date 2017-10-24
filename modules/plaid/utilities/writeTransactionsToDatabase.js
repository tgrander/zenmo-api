import { firestore } from '../../../firebase'
import transformTransaction from '../../transactions/mutations/tranformTransaction'
import transactionsRef from '../../transactions/constants/transactionsRef'


const writeTransactionsToDatabase = transactions => {

    transactions.forEach(transaction => {

        const { transaction_id } = transaction

        firestore.runTransaction(store => {

            return store.get(transactionsRef.doc(transaction_id))
                .then(doc => {

                    if (doc.exists) {
                        return Promise.reject(`Transaction already exists`)

                    } else {

                        const transformedTransaction = transformTransaction(transaction)

                        transactionsRef.doc(transaction_id).set(transformedTransaction)

                        return Promise.resolve(`Transaction ${transaction_id} added to Firestore`)
                    }
                })
        })
        .then(result => {
            console.log('Transaction success', result)
        })
        .catch(err => {
            console.log('Transaction failure:', err)
        })
    })
}

export default writeTransactionsToDatabase
