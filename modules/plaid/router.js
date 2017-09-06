import express from 'express'
let router = express.Router()
import bodyParser from 'body-parser'
import plaid from 'plaid'
import moment from 'moment'
import { database } from '../../firebase'
import { createItem, saveNewItem } from './utilities/createItem'

const PLAID_PUBLIC_KEY = 'b41ccce2d4bf2d77e8b21c4ff67fef'
const PLAID_ENV = 'development'

let PLAID_CLIENT_ID = null
let PLAID_SECRET = null

const accessToken = 'access-development-62c4c9a8-fa5b-4eaf-9cd4-8e7cf7b1eec6'

if (process.env.NODE_ENV === 'production') {

      PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
      PLAID_SECRET = process.env.PLAID_SECRET

} else if (process.env.NODE_ENV === 'development') {

      const PLAID_KEYS = require('./keys')

      PLAID_CLIENT_ID = PLAID_KEYS.PLAID_CLIENT_ID
      PLAID_SECRET = PLAID_KEYS.PLAID_SECRET
}

// Initialize the Plaid Client
const plaidClient = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV]
)

router.use(bodyParser.json()) // handle json data
router.use(bodyParser.urlencoded({ extended: true }))


router.post('/plaid-webhook', (req, res) => {

    // "webhook_type": "TRANSACTIONS",
    // "webhook_code": "INITIAL_UPDATE" or "HISTORICAL_UPDATE",

    const {
        webhook_type,
        webhook_code,
        item_id,
        new_transactions
    } = req.body

    let userId = null

    database.ref(`/items/${item_id}`).once('value')
        .then(item => {
            userId = item.userId
            return plaidClient.getTransactions(item.accessToken)
        })
        .then(transactions =>
            database.ref(`/transactions/${userId}`).set(transactions)
        )
})


router.post('/create-item', (req, res, next) => {

    const publicToken = req.body.public_token

    const { userId } = req.body

    res.json(
        createItem({ plaidClient, publicToken, database, userId })
    )
})

router.post('/add-item', (req, res) => {

    res.json(
        saveNewItem({
            database,
            userId: req.body.userId, 
            accessToken
        })
    )
})


router.get('/transactions', (req, res, next) => {

    const startDate = moment().subtract(1, 'months').format('YYYY-MM-DD')

    const endDate = moment().format('YYYY-MM-DD')

    plaidClient.getTransactions(

        accessToken,
        startDate,
        endDate,
        { count: 100, offset: 0},
        async (error, transactionsResponse) => {

            if (error != null) {
                console.log(JSON.stringify(error))
                return res.json({error: error})
            }

            // database.ref(`/transactions`).set(amount)

            console.log('pulled ' + transactionsResponse.transactions.length + ' transactions')

            res.json(transactionsResponse)
    })
})


// router.get('/accounts', (req, res, next) => {
//
//     // Retrieve high-level account information and account and routing numbers
//     // for each account associated with the Item.
//
//     plaidClient.getAuth(ACCESS_TOKEN, (error, authResponse) => {
//         if(error != null) {
//             var msg = 'Unable to pull accounts from the Plaid API.'
//             console.log(msg + '\n' + error)
//             return res.json({error: msg})
//         }
//
//         console.log(authResponse.accounts)
//         res.json({
//             error: false,
//             accounts: authResponse.accounts,
//             numbers: authResponse.numbers,
//         })
//     })
// })

// router.post('/item', (req, res, next) => {
//
//     // Pull the Item - this includes information about available products,
//     // billed products, webhook information, and more.
//
//     plaidClient.getItem(ACCESS_TOKEN, (error, itemResponse) => {
//         if (error != null) {
//             console.log(JSON.stringify(error))
//             return res.json({error: error})
//         }
//
//         // Also pull information about the institution
//         plaidClient.getInstitutionById(itemResponse.item.institution_id, (err, instRes) => {
//             if (err != null) {
//             var msg = 'Unable to pull institution information from the Plaid API.'
//             console.log(msg + '\n' + error)
//             return res.json({error: msg})
//             } else {
//                 res.json({
//                     item: itemResponse.item,
//                     institution: instRes.institution,
//                 })
//             }
//         })
//     })
// })


export default router
