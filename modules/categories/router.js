import bodyParser from 'body-parser';
import express from 'express';
import { database } from '../../firebase';
import { firestore } from '../../firebase';
import createCategories from './scripts/createCategories';


const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/create', (req, res) => {
    createCategories()
        .then(() => res.status(200).send('All Categories successfully added'))
        .catch(err => console.error(err, 'There was a problem with createCategories function'));
});

export default router;
