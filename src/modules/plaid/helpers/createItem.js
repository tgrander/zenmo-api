/**
   * Exchange public Plaid token for access token to retrieve transactions
   *
   * @param  {object} plaidClient access Plaid API functions
   * @param  {string} publicToken key to exchange for access token
   * @return {string} access token
   */
const exchangePublicTokenForAccessToken = async (plaidClient, publicToken) => {
    try {
        const { access_token } = await plaidClient.exchangePublicToken(publicToken);
        return access_token;
    } catch (e) {
        throw new Error(e);
    }
};

/**
   * Persist access token to database
   *
   * @param  {object} usersRef ref to Firestore users collection
   * @param  {string} userId id of user who created the new item
   * @param  {string} accessToken secret key for accessing transactions of Plaid item
   * @return {undefined}
   */
const saveAccessToken = async (usersRef, userId, accessToken) => {
    try {
        await usersRef.doc(userId).update({ accessTokens: [accessToken] }, { merge: true });
        return;
    } catch (error) {
        throw new Error(error);
    }
};

/**
   * Exchange public token for access token then save access token to DB
   *
   * @param  {object} plaidClient access Plaid API functions
   * @param  {string} publicToken key to exchange for access token
   * @param  {object} usersRef ref to Firestore users collection
   * @param  {string} userId id of user who created the new item
   * @return {string} access token
   */
export default async (plaidClient, publicToken, usersRef, userId) => {
    try {
        const accessToken = await exchangePublicTokenForAccessToken(plaidClient, publicToken);
        await saveAccessToken(usersRef, userId, accessToken);
        return accessToken;
    } catch (error) {
        throw new Error(error);
    }
};
