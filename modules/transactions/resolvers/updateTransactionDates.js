import { firestore } from '../../../firebase'


const transactionsRef = firestore.collection('transactions')

transactionsRef.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            var transaction = db.runTransaction(t => {

                return t.get(transactionsRef.doc(doc.data().transaction_id))
                    .then(doc => {

                        var newDate = new Date(doc.data().date)
                        t.update(transactionsRef, { date: newDate })
                    })
            })
            .then(result => {
                console.log('Transaction success!')
            })
            .catch(err => {
                console.log('Transaction failure:', err)
            })
        })
    })
    .catch(err => {
        console.log('Error getting documents', err)
    })
