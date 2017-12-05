import moment from 'moment';
import institutionTransactionAvailability from '../data/institutionTransactionAvailability';
import getAllTransactionsInDateRange from './getAllTransactionsInDateRange';
import writeTransactionsToDatabase from './writeTransactionsToDatabase';


const getHistoricalTransactions = (accessToken, plaidClient, userId) =>
    new Promise(async (resolve) => {
        const { accounts } = await plaidClient.getAccounts(accessToken);

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

        resolve(transactions);
    });

export default getHistoricalTransactions;
