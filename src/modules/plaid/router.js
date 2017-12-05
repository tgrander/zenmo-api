import bodyParser from 'body-parser';
import express from 'express';
import { usersRef } from '../../databaseRefs';
import createItem from './middleware/createItem';
import getHistoricalTransactions from './middleware/getHistoricalTransactions';
import getLatestTransactions from './middleware/getLatestTransactions';
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
        .then(() => res.status(201))
        .catch(err => res.status(500).send(err));
});

// FETCH ALL USER TRANSACTIONS AS FAR BACK IN TIME AS INSTITUTION WILL ALLOW
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
