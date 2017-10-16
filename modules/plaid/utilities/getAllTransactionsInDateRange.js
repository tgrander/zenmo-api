import institutionTransactionAvailability from '../data/institutionTransactionAvailability'
import getTransactions from './getTransactions'
import writeTransactionsToDatabase from './writeTransactionsToDatabase'


const getAllTransactionsInDateRange = async ({

    allTransactions=[],
    offset=0,

    accessToken,
    endDate,
    plaidClient,
    startDate

}) => {

    const transactions = await getTransactions({
        plaidClient,
        accessToken,
        startDate,
        endDate,
        offset
    })
    .then(({ transactions }) => transactions)

    const mergedTransactions = [ ...allTransactions, ...transactions]

    if (transactions.length < 500) {

        getAllTransactionsInDateRange({
            offet: offset + 500,
            allTransactions: mergedTransactions,
            startDate,
            endDate,
            plaidClient,
            accessToken
        })

    } else {

        return mergedTransactions
    }
}

export default getAllTransactionsInDateRange
