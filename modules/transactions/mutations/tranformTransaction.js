import reduce from 'lodash/reduce'


// Transform raw Plaid transaction into Firestore model

const transformTransaction = transaction => ({

    ...transaction,

    category: reduce(transaction.category, (acc, curr) => {
        return {...acc, [curr]: true}
    }, {}),

    date: new Date(transaction.date)
})

export default transformTransaction
