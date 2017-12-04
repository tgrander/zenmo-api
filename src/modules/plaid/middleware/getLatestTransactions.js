import moment from 'moment';
import getCurrentMonth from '../../../utilities/getCurrentMonth';
import plaidTransactionsResponseVO from './plaidTransactionsResponseVO';
import writeTransactionsToDatabase from './writeTransactionsToDatabase';


export default async (plaidClient, accessTokens = []) => {
    const startDate = moment(getCurrentMonth().startDate).format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');

    try {
        const plaidResponse = await Promise.all(accessTokens.map(accessToken =>
            plaidClient.getTransactions(accessToken, startDate, endDate)));

        const { transactions } = plaidTransactionsResponseVO(plaidResponse);

        return await writeTransactionsToDatabase(transactions);
    } catch (error) {
        throw new Error(error);
    }
};
