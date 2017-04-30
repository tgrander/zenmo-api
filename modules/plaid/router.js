var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var plaid = require('plaid');
var envvar = require('envvar');
var moment = require('moment');

var addTransactionsToDatabase = require('../expenses/loaders').addTransactionsToDatabase;

console.log(addTransactionsToDatabase);

var PLAID_PUBLIC_KEY = 'b41ccce2d4bf2d77e8b21c4ff67fef';
var PLAID_ENV = 'development';

var PLAID_CLIENT_ID = null
var PLAID_SECRET = null

// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;

if (process.env.NODE_ENV === 'production') {
  PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
  PLAID_SECRET = process.env.PLAID_SECRET

} else if (process.env.NODE_ENV === 'development') {
  var PLAID_KEYS = require('./keys');

  PLAID_CLIENT_ID = PLAID_KEYS.PLAID_CLIENT_ID
  PLAID_SECRET = PLAID_KEYS.PLAID_SECRET

  ACCESS_TOKEN = PLAID_KEYS.ACCESS_TOKEN
}

// Initialize the Plaid plaidClient
var plaidClient = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV]
);

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/plaidWebhook', function(req, res) {

})

router.post('/accessToken', function(request, response, next) {
    PUBLIC_TOKEN = request.body.public_token;
    plaidClient.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
      console.log('PUBLIC TOKEN: ', PUBLIC_TOKEN);
        if (error != null) {
            var msg = 'Could not exchange public_token!';
            console.log(error);
            return response.json({error: msg});
        }
        ACCESS_TOKEN = tokenResponse.access_token;
        console.log('Access Token: ' + ACCESS_TOKEN);
    });
    plaidClient.getAuth(ACCESS_TOKEN, function(err, authRes) {
      if (err != null) {
        // Handle error!
      } else {
        // An array of accounts for this Item, containing
        // high-level account information and account numbers
        // for checkings and savings accounts
        res.json({
         accounts: authRes.accounts,
         numbers: authRes.numbers
        });
      }
    });
});

router.get('/accounts', function(request, response, next) {
    // Retrieve high-level account information and account and routing numbers
    // for each account associated with the Item.
    plaidClient.getAuth(ACCESS_TOKEN, function(error, authResponse) {
        if(error != null) {
            var msg = 'Unable to pull accounts from the Plaid API.';
            console.log(msg + '\n' + error);
            return response.json({error: msg});
        }

        console.log(authResponse.accounts);
        response.json({
            error: false,
            accounts: authResponse.accounts,
            numbers: authResponse.numbers,
        });
    });
});

router.post('/item', function(request, response, next) {
    // Pull the Item - this includes information about available products,
    // billed products, webhook information, and more.
    plaidClient.getItem(ACCESS_TOKEN, function(error, itemResponse) {
        if (error != null) {
            console.log(JSON.stringify(error));
            return response.json({error: error});
        }

        // Also pull information about the institution
        plaidClient.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
            if (err != null) {
            var msg = 'Unable to pull institution information from the Plaid API.';
            console.log(msg + '\n' + error);
            return response.json({error: msg});
            } else {
                response.json({
                    item: itemResponse.item,
                    institution: instRes.institution,
                });
            }
        });
    });
});

router.post('/transactions', function(request, response, next) {
    var startDate = moment().subtract(5, 'months').format('YYYY-MM-DD');
    var endDate = moment().format('YYYY-MM-DD');
    plaidClient.getTransactions(ACCESS_TOKEN, startDate, endDate, {
        count: 500,
        offset: 0,
    }, function(error, transactionsResponse) {
        if (error != null) {
            console.log(JSON.stringify(error));
            return response.json({error: error});
        }
        console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
        response.json(transactionsResponse);
    });
});


module.exports = router;
