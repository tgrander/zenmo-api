import bodyParser from 'body-parser';
import express from 'express';
import { usersRef } from '../../databaseRefs';
import createItem from './helpers/createItem';
import getHistoricalTransactions from './helpers/getHistoricalTransactions';
import getLatestTransactions from './helpers/getLatestTransactions';
import plaidClient from './plaidClient';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {

});

// FETCH USER'S LATEST TRANSACTIONS FROM PLAID API AND ADD THEM TO DB
router.post('/recent-transactions', async (req, res) => {
    const { accessTokens } = req.body;
    getLatestTransactions(plaidClient, accessTokens)
        .then(transactions => res.send(transactions))
        .catch(e => res.send(e));
});

// CREATE NEW ITEM BY EXCHANGING PUBLIC TOKEN
router.post('/item', (req, res) => {
    const { userId, publicToken } = req.body;

    createItem(plaidClient, publicToken, usersRef, userId)
        .then((accessToken) => {
            res.sendStatus(201);
            // after item created, historical transactions for item are
            // fetched in the background
            getHistoricalTransactions(accessToken, plaidClient, userId);
        })
        .catch(err => res.status(500).send(err));
});

// FETCH ALL USER TRANSACTIONS AS FAR BACK IN TIME AS INSTITUTION WILL ALLOW
router.post('/historical-transactions', async (req, res) => {
    const { accessToken, userId } = req.body;

    getHistoricalTransactions(accessToken, plaidClient, userId)
        .then((transactions) => {
            res.send(transactions);
            console.log(`${transactions.length} historical transactions retrieved`);
        })
        .catch(err => res.status(500).send(err));
});

export default router;
