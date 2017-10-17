import { firestore } from '../../../firebase'


export default async ({

    plaidClient,
    accessToken,
    startDate,
    endDate,
    offset=0 

}) => {

    return await plaidClient.getTransactions(
        accessToken,
        startDate,
        endDate,
        { count: 500, offset }
    )
    .then(res => res)
    .catch(err => err)
}
