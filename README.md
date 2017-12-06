Money Made Easy. :relieved: :money_with_wings:

## Development
#### Requirements
- [Node.js](https://nodejs.org/en/download/) v7.6+ for async/await support
- [npm](https://www.npmjs.com/)

#### Installation
Install dependencies `npm install`

## Usage
- npm start
- Open `http://localhost:8000`

## API Endpoints
| Endpoint                                 | Description                 |
| -----------------------------------------|-----------------------------|
| `POST /transactions/get`                 | get transactions            |
| `POST /plaid/transactions`               | recent transactions         |
| `POST /plaid/item`                       | create item                 |
| `POST /plaid/historical-transactions`    | get historical transactions for an item |

#### Code style

```
$ eslint --init
```

[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
