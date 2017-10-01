import moment from 'moment'
import reduce from 'lodash/reduce'
import flatten from 'lodash/flatten'
import concat from 'lodash/concat'
import getTransactions from '../utilities/getTransactions'


export default async (req, res, next) => {

    try {

        const { plaidClient, accounts, dateRange } = res.locals

        const transactions = Promise.all(
            accounts.map(async accessToken => await getTransactions({
                plaidClient,
                accessToken,
                startDate: moment(dateRange[0]).format('YYYY-MM-DD'),
                endDate: moment(dateRange[1]).format('YYYY-MM-DD')
            }))
        ).then(transactionsData => {

            res.locals.transactions = transactionsData.reduce((acc, curr) => {

                acc.accounts = acc.accounts.concat(curr.accounts)
                acc.transactions = acc.transactions.concat(curr.transactions)

                return acc

            }, {accounts: [], transactions: []})

            next()
        })

    } catch(e) {

        res.status(500).end()
    }
}
