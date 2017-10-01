import keys from 'lodash/keys'
import uniq from 'lodash/uniq'
import { database } from '../../../firebase'


export default (req, res, next) => {

    database.ref('items')
        .orderByChild('userId')
        .equalTo(res.locals.userId)
        .once('value')
        .then(snap => {

            const accounts = snap.val()

            const accessTokens = keys(accounts).map(account => {

                return accounts[account].accessToken
            })

            res.locals.accounts = uniq(accessTokens)

            next()
        })
        .catch(err => console.log(err))
}
