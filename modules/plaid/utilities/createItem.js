const exchangePublicTokenForAccessToken = ({

    plaidClient,
    publicToken,

}) => plaidClient.exchangePublicToken(
    publicToken,
    (error, tokenResponse) => {

        if (error != null) {
            var msg = 'Could not exchange public_token!'
            console.log(error)
            return response.json({error: msg})
        }

        const { accessToken } = tokenResponse

        console.log('Access Token: ' + accessToken)

        return accessToken
    }
)



const saveNewItem = ({ database, userId, accessToken }) => {

    const itemId = database.ref().child('items').push().key

    const newItem = {
        userId,
        itemId,
        accessToken
    }

    const updates = {

        // add itemId to users ref
        [`/users/${userId}/items`]: itemId,

        // save access token in item ref
        [`/items/${itemId}`]: newItem
    }

    database.ref().update(updates)

    return itemId
}


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
                 numbers: authRes.numbers
                })
          }
    })
}


const createItem = async ({ plaidClient, publicToken, database, userId }) => {

    const accessToken = await exchangePublicTokenForAccessToken({
        plaidClient,
        publicToken
    })

    saveNewItem({ database, userId, accessToken })
}

export default createItem
