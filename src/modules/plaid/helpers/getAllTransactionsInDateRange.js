import getTransactions from './getTransactions';

/**
   * Recursively retreive all transactions in a given time range
   * Must be done recursively because Plaid API only allows 500
   * transactions to be fetched at one time
   *
   * @param  {string} accessToken secret key for accessing transactions of Plaid item
   * @param  {object} plaidClient access Plaid API functions
   * @param  {string} startDate beginning of when transactions should be fetched
   * @param  {string} endDate end of when transactions should be fetched
   * @param  {array} allTransactions all transactions that have been fetched so far
   * @param  {number} offset number of transactions to skip in next fetch to Plaid API
   * @return {array} mergedTransactions
   */
const getAllTransactionsInDateRange = async (
    accessToken,
    plaidClient,
    startDate,
    endDate,
    allTransactions = [],
    offset = 0,
) => {
    // fetch transactions
    const transactions = await getTransactions({
        plaidClient, accessToken, startDate, endDate, offset,
    });

    // merge all fetched transactions together
    const mergedTransactions = [...allTransactions, ...transactions];

    // if less than 500 transactions fetched, then all transactions in
    // date range have been fetched -- return transactions
    if (transactions.length < 500) {
        return mergedTransactions;
    }

    // recursive call - pass mergedTransactions as allTransactions
    // and increase offset by 500
    return getAllTransactionsInDateRange(
        accessToken,
        plaidClient,
        startDate,
        endDate,
        mergedTransactions,
        offset + 500,
    );
};

export default getAllTransactionsInDateRange;
