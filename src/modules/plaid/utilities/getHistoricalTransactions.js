import moment from 'moment'
import institutionTransactionAvailability from '../data/institutionTransactionAvailability'
import getAllTransactionsInDateRange from './getAllTransactionsInDateRange'
import writeTransactionsToDatabase from './writeTransactionsToDatabase'


const getHistoricalTransactions = ({

    accessToken,
    institutionId,
    plaidClient

}) => {

    return new Promise(async (resolve, reject) => {

        const historicalAvailability = institutionTransactionAvailability[institutionId].historicalAvailability

        const startDate = moment().subtract(historicalAvailability, 'months').format('YYYY-MM-DD')

        const endDate = moment().format('YYYY-MM-DD')

        const transactions = await getAllTransactionsInDateRange(
            accessToken,
            plaidClient,
            startDate,
            endDate
        )

        const writeResult = writeTransactionsToDatabase(transactions)

        resolve(transactions)
    })
}

export default getHistoricalTransactions
