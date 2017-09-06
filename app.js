import bodyParser from 'body-parser'
import express from 'express'
import connectDatabase from './db'
import expensesRouter from './modules/expenses/router'
import plaidRouter from './modules/plaid/router'
import { database } from './firebase'

const app = express()

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is undefined')
}

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
  res.send('hello world')
})

app.get('/add-transactions', (req, res) => {
    res.send('new transactions will be added')
})

/*
* PLAID ROUTES
*/
app.use('/plaid', plaidRouter)

export default app
