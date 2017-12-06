import bodyParser from 'body-parser';
import express from 'express';
import { usersRef } from '../../databaseRefs';
import createItem from './helpers/createItem';
import getHistoricalTransactions from './helpers/getHistoricalTransactions';
import getLatestTransactions from './helpers/getLatestTransactions';
import plaidClient from './plaidClient';


const router = express.Router();
router.use(bodyParser.json()); // handle json data
router.use(bodyParser.urlencoded({ extended: true }));

// FETCH USER'S LATEST TRANSACTIONS FROM PLAID API AND ADD THEM TO DB
router.post('/transactions', async (req, res) => {
    const accessTokens = req.body.accessTokens || ['access-development-43abb18f-5f6c-40c6-b069-28433fe1ab67'];

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
            getHistoricalTransactions(accessToken, plaidClient, userId);
        })
        .catch(err => res.status(500).send(err));
});

// FETCH ALL USER TRANSACTIONS AS FAR BACK IN TIME AS INSTITUTION WILL ALLOW
router.post('/historical-transactions', async (req, res) => {
    const { accessToken, userId } = req.body;

    getHistoricalTransactions(accessToken, plaidClient, userId)
        .then((transactions) => {
            console.log(`Historical transactions retrieved. Count: ${transactions.length}`);
            res.send(transactions);
        })
        .catch(err => console.error(err));
});

export default router;
