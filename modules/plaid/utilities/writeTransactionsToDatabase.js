import { firestore } from '../../../firebase'


const transactionsRef = firestore.collection('transactions')

const writeTransactionsToDatabase = transactions => {

    transactions.forEach(transaction => {

        const { transaction_id } = transaction

        firestore.runTransaction(store => {

            return store.get(transactionsRef.doc(transaction_id))
                .then(doc => {

                    if (doc.exists) {
                        return Promise.reject(`Transaction ${transaction_id} already exists`)

                    } else {
                        transactionsRef.doc(transaction_id).set(transaction)
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
