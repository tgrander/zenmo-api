import plaid from 'plaid';


const PLAID_PUBLIC_KEY = 'b41ccce2d4bf2d77e8b21c4ff67fef';
const PLAID_ENV = 'development';
let PLAID_SECRET;
let PLAID_CLIENT_ID;

// Set Plaid keys based on env
if (process.env.NODE_ENV === 'production') {
    PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
    PLAID_SECRET = process.env.PLAID_SECRET;
} else if (process.env.NODE_ENV === 'development') {
    const keys = require('./keys');
    PLAID_CLIENT_ID = keys.PLAID_CLIENT_ID;
    PLAID_SECRET = keys.PLAID_SECRET;
}

// Initialize the Plaid Client
export default new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV],
);
