import bodyParser from 'body-parser';
import express from 'express';
import { firestore as db } from '../../firebase';


const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/get', (req, res) => {
    const { userId } = req.body;

    db.collection('accounts')
        .where('userId', '==', userId)
        .get()
        .then((snapshot) => {
            const accounts = snapshot._docs().map(doc => doc.data());
            res.status(200).send(accounts);
        })
        .catch(error => res.status(500).send(error));
});

export default router;
