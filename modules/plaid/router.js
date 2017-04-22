var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var plaid = require('plaid');
var envvar = require('envvar');

var PLAID_KEYS = require('./keys');

// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;

// Initialize the Plaid plaidClient
var plaidClient = new plaid.Client(
    PLAID_KEYS.PLAID_CLIENT_ID,
    PLAID_KEYS.PLAID_SECRET,
    PLAID_KEYS.PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_KEYS.PLAID_ENV]
);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/test', function(req, res) {
  console.log('REQUEST BODY: ', req.body);
})

router.post('/authenticate_item', function(req, res, next) {
  var accountPublicToken = req.body.public_token;
  plaidClient.exchangePublicToken(accountPublicToken, function(error, tokenResponse) {
    console.log('account public token:', accountPublicToken);
    if (error != null) {
        var msg = 'Could not exchange public_token!';
        console.log(msg + '\n' + error);
        return res.json({error: msg});
    }

    var accessToken = tokenResponse.access_token;
    console.log('Access Token: ' + accessToken);
    plaidClient.getAuth(accessToken, function(err, authRes) {
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
    // Pull transactions for the Item for the last 30 days
    var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    var endDate = moment().format('YYYY-MM-DD');
    plaidClient.getTransactions(ACCESS_TOKEN, startDate, endDate, {
        count: 250,
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
