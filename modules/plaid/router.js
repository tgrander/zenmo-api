import bodyParser from 'body-parser'
import express from 'express'
import plaid from 'plaid'
import middleware from './middleware'
import moment from 'moment'
import { createItem, saveNewItem } from './utilities/createItem'
import getHistoricalTransactions from './utilities/getHistoricalTransactions'
import { database } from '../../firebase'
import { firestore } from '../../firebase'


const PLAID_PUBLIC_KEY = 'b41ccce2d4bf2d77e8b21c4ff67fef'
const PLAID_ENV = 'development'

let PLAID_CLIENT_ID = null
let PLAID_SECRET = null

const accessToken = 'access-development-43abb18f-5f6c-40c6-b069-28433fe1ab67'

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

let router = express.Router()

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


router.post('/transactions', (req, res, next) => {

        res.locals.userId = 'I76zn2yehnepunkWQB44EFuCpUm1'
        res.locals.plaidClient = plaidClient
        res.locals.dateRange = req.body.dateRange

        next()
    },

    middleware.getUsersAccessTokens,
    middleware.joinTransactions,

    (req, res) => {

        res.json({transactions: res.locals.transactions})
    }
)


router.post('/accounts', async (req, res, next) => {

    // Retrieve high-level account information and account and routing numbers
    // for each account associated with the Item.

    const ACCESS_TOKEN = "access-development-62c4c9a8-fa5b-4eaf-9cd4-8e7cf7b1eec6"

    plaidClient.getAuth(ACCESS_TOKEN)
        .then(res => res.json({

            error: false,
            accounts: res.accounts,
            numbers: res.numbers,
        }))
        .catch(err => {

            var msg = 'Unable to pull accounts from the Plaid API.'
            console.log(msg + '\n' + err)
            return res.json({error: msg})
        })
})

router.post('/historical-transactions', async (req, res, next) => {

    getHistoricalTransactions({
        accessToken: 'access-development-62c4c9a8-fa5b-4eaf-9cd4-8e7cf7b1eec6',
        institutionId: 'ins_5',
        plaidClient
    })
    .then(transactions => {

        console.log(`Historical transactions were successfully retrieved. Count: ${transactions.length}`)

        res.send('HISTORICAL TRANSACTIONS SUCCESS!')
    })
    .catch(err => console.error(err))
})

export default router
