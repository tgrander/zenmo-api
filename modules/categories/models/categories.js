import uuid from '../../../utilities/uuid';


export default {

    Alcohol: {
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Bars: true,
            'Liquor Stores': true,
        },
    },
    'Bill Payments': {
        categoryId: uuid(),
        type: 'payments',
        subCategories: {
            'Credit Card': true,
        },
    },
    Coffee: {
        categoryId: uuid(),
        type: 'spending',
        subCategories: {},
    },
    'Eating Out': {
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Restaurants: true,
            Lunch: true,
            Dinner: true,
        },
    },
    Entertainment: {
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            'Concerts and Shows': true,
            Movies: true,
        },
    },
    Groceries: {
        categoryId: uuid(),
        type: 'spending',
        subCategories: {},
    },
    'House and Apartment': {
        type: 'spending',
        subCategories: {
            'Cleaning Supplies': true,
        },
    },
    Income: {
        categoryId: uuid(),
        type: 'income',
        subCategories: {
            Paychecks: true,
            Deposit: true,
        },
    },
    Miscellaneous: {
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Insurance: true,
            Service: true,
        },
    },
    'Personal Care': {
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Hair: true,
            Spa: true,
        },
    },
    Shopping: {
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            'Beauty Products': true,
            'Computers and Electronics': true,
        },
    },
    Subscriptions: {
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Music: true,
            Internet: true,
            Learning: true,
        },
    },
    Transfer: {
        categoryId: uuid(),
        type: 'transfer',
        subCategories: {},
    },
    Transportation: {
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            'Car Service': true,
            'Public Transportation': true,
            Taxi: true,
        },
    },
    Travel: {
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Airline: true,
            Bus: true,
            Train: true,
        },
    },
    Venmo: {
        type: 'spending',
        subCategories: {},
    },
};
