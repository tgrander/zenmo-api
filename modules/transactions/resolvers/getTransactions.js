import isEmpty from 'lodash/isEmpty';
import transactionsRef from '../constants/transactionsRef';
import getCurrentMonth from '../../../utilities/getCurrentMonth';


const getTransactions = (dateRange = {}) => {
    if (isEmpty(dateRange)) dateRange = getCurrentMonth();

    return new Promise((resolve, reject) => {
        transactionsRef
            .where('date', '>=', dateRange.startDate)
            .where('date', '<=', dateRange.endDate)
            .get()
            .then((snapshot) => {
                const transactions = snapshot._docs().map(doc => doc.data());

                return resolve(transactions);
            })
            .catch(err => reject(err));
    });
};


export default getTransactions;
