import reduce from 'lodash/reduce';


// Transform raw Plaid transaction into Firestore transaction model
export default transaction => ({
    ...transaction,
    category: reduce(transaction.category, (acc, curr) => ({ ...acc, [curr]: true }), {}),
    date: new Date(transaction.date),
});
