import reduce from 'lodash/reduce';

export default (transaction, userId) => ({
    ...transaction,
    category: null,
    date: new Date(transaction.date),
    plaidCategories: reduce(transaction.category, (acc, curr) => ({ ...acc, [curr]: true }), {}),
    type: null,
    userId,
});
