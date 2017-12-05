import getHistoricalTransactions from './getHistoricalTransactions';

const exchangePublicTokenForAccessToken = async (plaidClient, publicToken) => {
    try {
        const { access_token } = await plaidClient.exchangePublicToken(publicToken);
        return access_token;
    } catch (e) {
        throw new Error(e);
    }
};

// SAVE ACCESS TOKEN
const saveAccessToken = async (usersRef, userId, accessToken) => {
    try {
        await usersRef.doc(userId).update({ accessTokens: [accessToken] }, { merge: true });
        return;
    } catch (error) {
        throw new Error(error);
    }
};

// EXCHANGE PUBLIC TOKEN FOR ACCESS TOKEN, SAVE ACCESS TOKEN
export default async (plaidClient, publicToken, usersRef, userId) => {
    try {
        const accessToken = await exchangePublicTokenForAccessToken(plaidClient, publicToken);
        await saveAccessToken(usersRef, userId, accessToken);
        return { accessToken, userId };
    } catch (error) {
        throw new Error(error);
    }
};
