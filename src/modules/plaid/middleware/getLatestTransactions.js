import moment from 'moment';
import getCurrentMonth from '../../../utilities/getCurrentMonth';
import plaidTransactionsResponseVO from './plaidTransactionsResponseVO';


export default (plaidClient, accessTokens = []) => {
    const startDate = moment(getCurrentMonth().startDate).format('YYYY-MM-DD');

    const endDate = moment().format('YYYY-MM-DD');

    return new Promise(async (resolve, reject) => {
        Promise.all(await accessTokens.map(accessToken => plaidClient.getTransactions(
            accessToken,
            startDate,
            endDate,
        )))
            .then((data) => {
                const { transactions } = plaidTransactionsResponseVO(data);

                resolve(transactions);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};
