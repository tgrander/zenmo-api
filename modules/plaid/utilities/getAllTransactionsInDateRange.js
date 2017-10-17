import institutionTransactionAvailability from '../data/institutionTransactionAvailability'
import getTransactions from './getTransactions'
import writeTransactionsToDatabase from './writeTransactionsToDatabase'


const getAllTransactionsInDateRange = async (
    accessToken,
    plaidClient,
    startDate,
    endDate,
    allTransactions=[],
    offset=0
) => {

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

        return mergedTransactions

    } else {

        return getAllTransactionsInDateRange(
            accessToken,
            plaidClient,
            startDate,
            endDate,
            mergedTransactions,
            offset+ 500
        )
    }
}

export default getAllTransactionsInDateRange
