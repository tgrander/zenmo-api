import getTransactions from './getTransactions';


const getAllTransactionsInDateRange = async (
    accessToken,
    plaidClient,
    startDate,
    endDate,
    allTransactions = [],
    offset = 0,
) => {
    const transactions = await getTransactions({
        plaidClient,
        accessToken,
        startDate,
        endDate,
        offset,
    })
        .then(({ transactions }) => transactions);

    const mergedTransactions = [...allTransactions, ...transactions];

    if (transactions.length < 500) {
        return mergedTransactions;
    }

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
