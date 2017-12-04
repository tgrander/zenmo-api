import moment from 'moment'
import reduce from 'lodash/reduce'
import flatten from 'lodash/flatten'
import concat from 'lodash/concat'
import getTransactions from '../utilities/getTransactions'
import writeTransactionsToFirestore from '../utilities/writeTransactionsToDatabase'


export default async (req, res, next) => {

    try {

        const { plaidClient, accounts, dateRange } = res.locals

        const transactions = Promise.all(
            accounts.map(async accessToken => await getTransactions({
                plaidClient,
                accessToken,
                // startDate: moment(dateRange[0]).format('YYYY-MM-DD'),
                // endDate: moment(dateRange[1]).format('YYYY-MM-DD')
                startDate: '2017-09-01',
                endDate: '2017-09-30'
            }))
        ).then(transactionsData => {

            const transactionData = transactionsData.reduce((acc, curr) => {

                acc.accounts = acc.accounts.concat(curr.accounts)
                acc.transactions = acc.transactions.concat(curr.transactions)

                return acc

            }, {accounts: [], transactions: []})

            res.locals.transactions = transactionData

            writeTransactionsToDatabase(transactionData.transactions)

            next()
        })

    } catch(e) {

        res.status(500).end()
    }
}
