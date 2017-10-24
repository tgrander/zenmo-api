import bodyParser from 'body-parser'
import express from 'express'
import { database } from '../../firebase'
import { firestore } from '../../firebase'
import updateAllTransactionsCategory from './mutations/updateAllTransactionsCategory'
import updateSingleTransactionCategory from './mutations/updateSingleTransactionCategory'
import getTransactions from './resolvers/getTransactions'


let router = express.Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.post('/get', (req, res) => {

    const { userId, dateRange, filters } = req.body

    getTransactions(dateRange)
        .then(docs => {
            res.send(docs)
        })
        .catch(err => res.send(err))
})


router.post('/update-all-transactions-category', (req, res) => {

    const { description, newCategory } = req.body

    updateAllTransactionsCategory(description, newCategory)

    return transactions
        .then(fulfillment => res.send(fulfillment))
        .catch(err => res.send(err))
})


router.post('/update-single-transaction-category', (req, res) => {


})


export default router
