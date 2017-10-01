export default async ({ plaidClient, accessToken, startDate, endDate }) => {

    return await plaidClient.getTransactions(

        accessToken,
        startDate,
        endDate,
        { count: 500, offset: 0}
        // (error, transactionsResponse) => {
        //
        //     if (error != null) {
        //         console.log(JSON.stringify(error))
        //         return res.json({error: error})
        //     }
        //
        //     return transactionsResponse
        // }
    ).then(res => res)
    .catch(err => err)
}
