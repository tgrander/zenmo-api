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
