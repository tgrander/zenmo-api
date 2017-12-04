import bodyParser from 'body-parser';
import express from 'express';
import createCategories from './scripts/createCategories';


const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/create', (req, res) => {
    createCategories()
        .then(() => res.status(200).send('All Categories successfully added'))
        .catch(err => res.status(500).send(err));
});

export default router;
