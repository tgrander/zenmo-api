import { firestore } from '../firebase';


export default {
    accountsRef: firestore.collection('transactions'),
    categoriesRef: firestore.collection('transactions'),
    mapPlaidCategoryToAssignedCategoryRef: firestore.collection('map-plaid-category-to-assigned-category'),
    mapTransactionNameToCategoryRef: firestore.collection('map-transaction-name-to-category'),
    transactionsRef: firestore.collection('transactions'),
    usersRef: firestore.collection('users'),
};
