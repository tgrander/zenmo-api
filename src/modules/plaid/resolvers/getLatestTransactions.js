import reduce from 'lodash/reduce'
import moment from 'moment'
import getCurrentMonth from '../../../utilities/getCurrentMonth'
import plaidTransactionsResponseVO from '../utilities/plaidTransactionsResponseVO'
import addAccounts from '../../transactions/mutations/addAccounts'


const getLatestTransactions = (plaidClient, accessTokens) => {

    accessTokens = [
        'access-development-62c4c9a8-fa5b-4eaf-9cd4-8e7cf7b1eec6',
        'access-development-43abb18f-5f6c-40c6-b069-28433fe1ab67'
    ]

    const startDate = moment(getCurrentMonth().startDate).format('YYYY-MM-DD')

    const endDate = moment().format('YYYY-MM-DD')

    return new Promise(async (resolve, reject) => {

        Promise.all(
            await accessTokens.map(accessToken => plaidClient.getTransactions(
                accessToken,
                startDate,
                endDate
            ))
        )
        .then(data => {

            const { transactions, accounts } = plaidTransactionsResponseVO(data)

            resolve(transactions)
        })
        .catch(err => {

            console.error(err)
            reject(err)
        })
    })
}


export default getLatestTransactions
