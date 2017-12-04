import bodyParser from 'body-parser';
import express from 'express';
import accountsRouter from './modules/accounts/router';
import categoriesRouter from './modules/categories/router';
import plaidRouter from './modules/plaid/router';
import transactionsRouter from './modules/transactions/router';


const app = express();

if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is undefined');
}

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use('/accounts', accountsRouter);
app.use('/categories', categoriesRouter);
app.use('/plaid', plaidRouter);
app.use('/transactions', transactionsRouter);

export default app;
