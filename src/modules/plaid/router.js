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
router.get('/transactions', (req, res) => {
    getLatestTransactions(plaidClient, req.body.accessTokens)
        .then(() => res.status(204))
        .catch(error => res.status(500).send(error));
});

// CREATE NEW ITEM BY EXCHANGING PUBLIC TOKEN
router.post('/item', (req, res) => {
    const { userId, publicToken } = req.body;

    createItem(plaidClient, publicToken, usersRef, userId)
        .then((accessToken) => {
            res.status(201).send('success');
            getHistoricalTransactions(accessToken, plaidClient, userId);
        })
        .catch(err => res.status(500).send(err));
});

// FETCH ALL USER TRANSACTIONS AS FAR BACK IN TIME AS INSTITUTION WILL ALLOW
router.post('/historical-transactions', async (req, res) => {
    const { accessToken, userId } = req.body;

    getHistoricalTransactions(accessToken, plaidClient, userId)
        .then((transactions) => {
            console.log(`Historical transactions were successfully retrieved. Count: ${transactions.length}`);

            res.send('HISTORICAL TRANSACTIONS SUCCESS!');
        })
        .catch(err => console.error(err));
});

export default router;
