import bodyParser from 'body-parser';
import express from 'express';
import plaid from 'plaid';
import middleware from './middleware';
import moment from 'moment';
import { createItem, saveNewItem } from './utilities/createItem';
import getHistoricalTransactions from './utilities/getHistoricalTransactions';
import { database } from '../../firebase';
import { firestore } from '../../firebase';
import getLatestTransactions from './resolvers/getLatestTransactions';
import writeTransactionsToDatabase from './utilities/writeTransactionsToDatabase';


const PLAID_PUBLIC_KEY = 'b41ccce2d4bf2d77e8b21c4ff67fef';
const PLAID_ENV = 'development';

let PLAID_CLIENT_ID = null;
let PLAID_SECRET = null;

const accessToken = 'access-development-43abb18f-5f6c-40c6-b069-28433fe1ab67';

if (process.env.NODE_ENV === 'production') {
    PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
    PLAID_SECRET = process.env.PLAID_SECRET;
} else if (process.env.NODE_ENV === 'development') {
    const PLAID_KEYS = require('./keys');

    PLAID_CLIENT_ID = PLAID_KEYS.PLAID_CLIENT_ID;
    PLAID_SECRET = PLAID_KEYS.PLAID_SECRET;
}

// Initialize the Plaid Client
const plaidClient = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV],
);

const router = express.Router();

router.use(bodyParser.json()); // handle json data
router.use(bodyParser.urlencoded({ extended: true }));

// FETCH USER'S LATEST TRANSACTIONS FROM PLAID API
router.get('/latest-transactions', (req, res) => {
    getLatestTransactions(plaidClient)
        .then((transactions) => {
            res.send(transactions);
            writeTransactionsToDatabase(transactions);
        });
});

// CREATE NEW PLAID ITEM AND SAVE TO DB
router.post('/create-item', (req, res) => {
    const publicToken = req.body.public_token;

    const { userId } = req.body;

    res.json(createItem({
        plaidClient, publicToken, database, userId,
    }));
});

router.post('/add-item', (req, res) => {
    res.json(saveNewItem({
        database,
        userId: req.body.userId,
        accessToken,
    }));
});

// FETCH ALL TRANSACTIONS FROM PLAID API
router.post(
    '/transactions', (req, res, next) => {
        res.locals.userId = 'I76zn2yehnepunkWQB44EFuCpUm1';
        res.locals.plaidClient = plaidClient;
        res.locals.dateRange = req.body.dateRange;

        next();
    },

    middleware.getUsersAccessTokens,
    middleware.joinTransactions,

    (req, res) => {
        res.json({ transactions: res.locals.transactions });
    },
);

// FETCH ALL USER TRANSACTIONS AS FAR BACK IN TIME AS PLAID API WILL ALLOW
router.post('/historical-transactions', async (req, res) => {
    getHistoricalTransactions({
        accessToken: 'access-development-62c4c9a8-fa5b-4eaf-9cd4-8e7cf7b1eec6',
        institutionId: 'ins_5',
        plaidClient,
    })
        .then((transactions) => {
            console.log(`Historical transactions were successfully retrieved. Count: ${transactions.length}`);

            res.send('HISTORICAL TRANSACTIONS SUCCESS!');
        })
        .catch(err => console.error(err));
});

export default router;
