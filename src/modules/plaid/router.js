import bodyParser from 'body-parser';
import express from 'express';
import plaid from 'plaid';
import { createItem, saveNewItem } from './middleware/createItem';
import getHistoricalTransactions from './middleware/getHistoricalTransactions';
import { database } from '../../../firebase';
import getLatestTransactions from './middleware/getLatestTransactions';
import writeTransactionsToDatabase from './middleware/writeTransactionsToDatabase';


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
router.get('/transactions', (req, res) => {
    getLatestTransactions(plaidClient, req.body.accessTokens)
        .then((transactions) => {
            res.status(200).send(transactions);
            writeTransactionsToDatabase(transactions);
        });
});

// CREATE NEW ITEM BY EXCHANGING PUBLIC TOKEN
router.post('/public-token', (req, res) => {
    const publicToken = req.body.public_token;

    const { userId } = req.body;

    res.status(201).send(createItem({
        plaidClient, publicToken, database, userId,
    }));
});

// SAVE ACCESS TOKEN DIRECTLY TO DB
router.post('/access-token', (req, res) => {
    res.status(201).send(saveNewItem({
        database,
        userId: req.body.userId,
        accessToken,
    }));
});

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
