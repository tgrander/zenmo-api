import bodyParser from 'body-parser';
import express from 'express';
import { firestore as db } from '../../firebase';
import transactionsRef from './constants/transactionsRef';
import updateAllTransactionCategoryByName from './mutations/updateAllTransactionsCategoryByName';
import getTransactions from './resolvers/getTransactions';
import mapPlaidCategoryToAssignedCategory from './mutations/mapPlaidCategoryToAssignedCategory';
import mapTransactionNameToCategory from './mutations/mapTransactionNameToCategory';


const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/get', (req, res) => {
    const { userId, dateRange, filters } = req.body;

    getTransactions(dateRange)
        .then((docs) => {
            res.send(docs);
        })
        .catch(err => res.send(err));
});

router.post('/update-all-categories', (req, res) => {
    const { transaction: { name, category }, newPrimaryCategory, newSubCategory } = req.body;

    mapPlaidCategoryToAssignedCategory({
        plaidCategory: category,
        newPrimaryCategory,
        newSubCategory,
    });

    mapTransactionNameToCategory({ name, newPrimaryCategory, newSubCategory });

    updateAllTransactionCategoryByName({
        db,
        transactionsRef,
        name,
        newPrimaryCategory,
        newSubCategory,
    })
        .then(numberOfTransactionsUpdated =>
            res.status(200).send(numberOfTransactionsUpdated))
        .catch(error => res.status(500).send(error));
});

router.post('/update-single-category', (req, res) => {
    const { transaction: { transaction_id }, newPrimaryCategory, newSubCategory } = req.body;

    transactionsRef
        .doc(transaction_id)
        .update({
            primaryCategory: newPrimaryCategory,
            subCategory: newSubCategory,
        })
        .then(success => res.status(200).send(success))
        .catch(error => res.status(500).send(error));
});


export default router;
