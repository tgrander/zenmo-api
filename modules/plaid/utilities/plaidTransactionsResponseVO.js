export default (transactionsData) => {

    if (!Array.isArray(transactionsData)) {
        throw new Error('transactionsData param is not an array')
    }

    return transactionsData.reduce((acc, curr) => {

        acc.accounts = acc.accounts.concat(curr.accounts)
        acc.transactions = acc.transactions.concat(curr.transactions)

        return acc

    }, {accounts: [], transactions: []})
}
