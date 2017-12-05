import bodyParser from 'body-parser';
import express from 'express';
import { firestore as db } from '../../../firebase';
import { transactionsRef } from '../../databaseRefs';
import updateAllTransactionsCategoryByName from './mutations/updateAllTransactionsCategoryByName';
import getTransactions from './resolvers/getTransactions';
import mapPlaidCategoryToAssignedCategory from './mutations/mapPlaidCategoryToAssignedCategory';
import mapTransactionNameToCategory from './mutations/mapTransactionNameToCategory';


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

router.post('/update-single-category', (req, res) => {
    const {
        transaction: { transaction_id, category, name },
        primaryCategory,
        subCategory,
    } = req.body;

    if (!transaction_id || !primaryCategory) {
        res.status(500).send('Invalid request params');
    }

    mapPlaidCategoryToAssignedCategory({
        plaidCategory: category,
        primaryCategory,
        subCategory,
    });

    mapTransactionNameToCategory({ name, primaryCategory, subCategory });

    transactionsRef
        .doc(transaction_id)
        .update({ primaryCategory, subCategory })
        .then(success => res.status(200).send(success))
        .catch(error => res.status(500).send(error));
});


export default router;
