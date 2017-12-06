import moment from 'moment';
import getCurrentMonth from '../../../utilities/getCurrentMonth';
import plaidTransactionsResponseVO from './plaidTransactionsResponseVO';
import writeTransactionsToDatabase from './writeTransactionsToDatabase';

/**
   * Retrieve recently added transaction data from Plaid API
   *
   * @param  {object} plaidClient access Plaid API functions
   * @param  {array} accessTokens all access tokens of user
   * @return {array} transactions
   */
export default async (plaidClient, accessTokens = []) => {
    const startDate = moment(getCurrentMonth().startDate).format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');

    try {
        const plaidResponse = await Promise.all(accessTokens.map(accessToken =>
            plaidClient.getTransactions(accessToken, startDate, endDate)));

        const { transactions } = plaidTransactionsResponseVO(plaidResponse);

        writeTransactionsToDatabase(transactions);

        return transactions;
    } catch (error) {
        return new Error(error);
    }
};
