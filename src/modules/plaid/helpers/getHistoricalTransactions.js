import moment from 'moment';
import institutionTransactionAvailability from '../data/institutionTransactionAvailability';
import getAllTransactionsInDateRange from './getAllTransactionsInDateRange';
import writeTransactionsToDatabase from './writeTransactionsToDatabase';

/**
   * Retreive all transactions from Plaid API as far back as specific bank will allow
   *
   * @param  {string} accessToken secret key for accessing transactions of Plaid item
   * @param  {object} plaidClient access Plaid API functions
   * @param  {string} userId id of user who created the new item
   * @return {object} transactions
   */
const getHistoricalTransactions = async (accessToken, plaidClient, userId) => {
    try {
        const accounts = await plaidClient.getAccounts(accessToken);

        const { institution_id } = accounts.item;

        const { historicalAvailability } = institutionTransactionAvailability[institution_id];

        const startDate = moment().subtract(historicalAvailability, 'months').format('YYYY-MM-DD');

        const endDate = moment().format('YYYY-MM-DD');

        const transactions = await getAllTransactionsInDateRange(
            accessToken,
            plaidClient,
            startDate,
            endDate,
        );

        writeTransactionsToDatabase(transactions, userId);

        return transactions;
    } catch (e) {
        throw new Error(e);
    }
};

export default getHistoricalTransactions;
