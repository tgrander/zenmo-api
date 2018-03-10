import bodyParser from 'body-parser';
import express from 'express';
import { firestore as db } from '../../../firebase';
import {
    transactionsRef,
    mapEntirePlaidCategory,
    mapIndividualPlaidCategory,
    mapPayee,
} from '../../databaseRefs';
import updateAllTransactionsCategoryByName from './helpers/updateAllTransactionsCategoryByName';
import getTransactions from './helpers/getTransactions';
import writeTransactionsToDatabase from '../plaid/helpers/writeTransactionsToDatabase';
import convertPlaidCategoriesToString from '../../utilities/convertPlaidCategoriesToString';

import mapCategoryToTransactionInfo from './helpers/mapCategoryToTransactionInfo';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/get', (req, res) => {
    const { dateRange } = req.body;

    getTransactions(dateRange)
        .then((docs) => {
            res.send(docs);
        })
        .catch(err => res.send(err));
});

router.post('/update-all-categories', (req, res) => {
    const { transaction: { name }, primaryCategory, subCategory } = req.body;

    if (!name || !primaryCategory) {
        res.status(500).send('Invalid request params');
    }

    updateAllTransactionsCategoryByName({
        db,
        transactionsRef,
        name,
        primaryCategory,
        subCategory,
    })
        .then((numberOfTransactionsUpdated) => {
            res.status(200).send({ numberOfTransactionsUpdated });
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

router.post('/categorize', (req, res) => {
    const {
        transaction: { transaction_id, plaidCategories, name },
        category,
        type,
    } = req.body;

    const plaidCategoriesString = convertPlaidCategoriesToString(plaidCategories);

    if (plaidCategoriesString) {
        mapCategoryToTransactionInfo({
            category,
            collectionRef: mapEntirePlaidCategory,
            docRef: plaidCategoriesString,
            payee: name,
            type,
        });
    }

    if (plaidCategories && plaidCategories.length) {
        plaidCategories.forEach((plaidCategory) => {
            mapCategoryToTransactionInfo({
                category,
                collectionRef: mapIndividualPlaidCategory,
                docRef: plaidCategory,
                payee: name,
                type,
            });
        });
    }

    if (name) {
        mapCategoryToTransactionInfo({
            category,
            collectionRef: mapPayee,
            docRef: name,
            payee: name,
            type,
        });
    }

    transactionsRef
        .doc(transaction_id)
        .update({ category, type })
        .then(success => res.status(200).send(success))
        .catch(error => res.status(500).send(error));
});

router.get('/test', async (req, res) => {
    const userId = 'I76zn2yehnepunkWQB44EFuCpUm1';
    const transactions = mockTransactions;

    writeTransactionsToDatabase(transactions, userId)
        .then(r => res.send(r).status(200))
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
});


export default router;
