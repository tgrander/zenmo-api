import bodyParser from 'body-parser'
import express from 'express'
import { database } from '../../firebase'
import { firestore } from '../../firebase'
import updateTransactionDates from './resolvers/updateTransactionDates'


let router = express.Router()

router.use(bodyParser.json()) // handle json data
router.use(bodyParser.urlencoded({ extended: true }))

export default router
