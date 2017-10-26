import bodyParser from 'body-parser'
import express from 'express'
import { database } from '../../firebase'
import { firestore } from '../../firebase'
import createCategories from './scripts/createCategories'


let router = express.Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.get('/create', (req, res) => {

    createCategories()
        .then(() => res.send('All Categories seccuessfully added'))
})
