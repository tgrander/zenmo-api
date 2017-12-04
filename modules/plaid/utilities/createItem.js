const exchangePublicTokenForAccessToken = ({

    plaidClient,
    publicToken,

}) => plaidClient.exchangePublicToken(
    publicToken,
    (error, tokenResponse) => {
        if (error != null) {
            const msg = 'Could not exchange public_token!';
            return response.json({ error: msg });
        }

        const accessToken = tokenResponse.access_token;

        console.log('ACCESS TOKEN: ', accessToken);

        return accessToken;
    },
);

export const saveNewItem = async ({ database, userId, accessToken }) => {
    const itemId = await database.ref(`/users/${userId}`).child('items').push().key;

    const newItem = { userId, itemId, accessToken };

    const updates = {

        // add itemId to users ref
        [`/users/${userId}/items`]: itemId,

        // save access token in item ref
        [`/items/${itemId}`]: newItem,
    };

    await database.ref().update(updates);

    return { itemId, accessToken, userId };
};


const getItemAccounts = (plaidClient, accessToken) => {
    plaidClient.getAuth(ACCESS_TOKEN, (err, authRes) => {
        if (err != null) {

            // Handle error!

        } else {
            // An array of accounts for this Item, containing
            // high-level account information and account numbers
            // for checkings and savings accounts

            res.json({
                accounts: authRes.accounts,
                numbers: authRes.numbers,
            });
        }
    });
};


export const createItem = async ({
    plaidClient, publicToken, database, userId,
}) => {
    const accessToken = await exchangePublicTokenForAccessToken({
        plaidClient,
        publicToken,
    });

    console.log('access token res (createItem): ', accessToken);

    const newItem = await saveNewItem({ database, userId, accessToken });

    return newItem;
};
