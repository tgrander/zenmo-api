/**
   * fetch transactions from Plaid API
   *
   * @param  {object} plaidClient access Plaid API functions
   * @param  {string} accessToken secret key for accessing transactions of Plaid item
   * @param  {string} startDate beginning of when transactions should be fetched
   * @param  {string} endDate end of when transactions should be fetched
   * @param  {number} offset number of transactions to skip in next fetch to Plaid API
   * @return {array} transactions
   */
export default async ({
    plaidClient, accessToken, startDate, endDate, offset = 0,
}) => {
    try {
        const plaidApiResponse = await plaidClient.getTransactions(accessToken, startDate, endDate, { count: 500, offset });
        return plaidApiResponse.transactions;
    } catch (e) {
        throw new Error('Error fetching transactions');
    }
};
