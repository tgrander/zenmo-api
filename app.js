import bodyParser from 'body-parser'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import categoriesRouter from './modules/categories/router'
import plaidRouter from './modules/plaid/router'
import transactionsRouter from './modules/transactions/router'
import connectDatabase from './db'
import { database } from './firebase'


const app = express()


if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is undefined')
}


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use('/categories', categoriesRouter)
app.use('/plaid', plaidRouter)
app.use('/transactions', transactionsRouter)


// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }))


export default app
