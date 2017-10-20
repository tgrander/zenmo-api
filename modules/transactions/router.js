import bodyParser from 'body-parser'
import express from 'express'
import { database } from '../../firebase'
import { firestore } from '../../firebase'
import updateAllTransactionsCategory from './mutations/updateAllTransactionsCategory'
import updateSingleTransactionCategory from './mutations/updateSingleTransactionCategory'


let router = express.Router()

router.use(bodyParser.json()) // handle json data
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/update-all-transactions-category', (req, res) => {


})

router.post('/update-single-transaction-category', (req, res) => {


})

export default router
