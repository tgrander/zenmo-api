import { firestore } from '../firebase';

export const accountsRef = firestore.collection('accounts');

export const categoriesRef = firestore.collection('categories');

export const mapEntirePlaidCategory = firestore.collection('map-entire-plaid-category');

export const mapIndividualPlaidCategory = firestore.collection('map-individual-plaid-category');

export const mapPayee = firestore.collection('map-payee');

export const transactionsRef = firestore.collection('transactions');

export const usersRef = firestore.collection('users');
