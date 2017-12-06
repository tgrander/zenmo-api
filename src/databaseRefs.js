import { firestore } from '../firebase';

export const accountsRef = firestore.collection('transactions');
export const categoriesRef = firestore.collection('transactions');
export const mapPlaidCategoryToAssignedCategoryRef = firestore.collection('map-plaid-category-to-assigned-category');
export const mapTransactionNameToCategoryRef = firestore.collection('map-transaction-name-to-category');
export const transactionsRef = firestore.collection('transactions');
export const usersRef = firestore.collection('users');
