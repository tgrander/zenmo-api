export default async ({

    plaidClient,
    accessToken,
    startDate,
    endDate,
    offset = 0,

}) => plaidClient.getTransactions(
    accessToken,
    startDate,
    endDate,
    { count: 500, offset },
)
    .then(res => res)
    .catch(err => err);
