import uuid from '../../../utilities/uuid';


export default {

    Alcohol: {
        name: 'Alcohol',
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Bars: true,
            'Liquor Stores': true,
        },
    },
    'Bill Payments': {
        name: 'Bill Payments',
        categoryId: uuid(),
        type: 'payments',
        subCategories: {
            'Credit Card': true,
        },
    },
    Coffee: {
        name: 'Coffee',
        categoryId: uuid(),
        type: 'spending',
        subCategories: {},
    },
    'Eating Out': {
        name: 'Eating Out',
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Restaurants: true,
            Lunch: true,
            Dinner: true,
        },
    },
    Entertainment: {
        name: 'Entertainment',
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            'Concerts and Shows': true,
            Movies: true,
        },
    },
    Groceries: {
        name: 'Groceries',
        categoryId: uuid(),
        type: 'spending',
        subCategories: {},
    },
    'House and Apartment': {
        name: 'House and Apartment',
        type: 'spending',
        subCategories: {
            'Cleaning Supplies': true,
        },
    },
    Income: {
        name: 'Income',
        categoryId: uuid(),
        type: 'income',
        subCategories: {
            Paychecks: true,
            Deposit: true,
        },
    },
    Miscellaneous: {
        name: 'Miscellaneous',
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Insurance: true,
            Service: true,
        },
    },
    'Personal Care': {
        name: 'Personal Care',
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Hair: true,
            Spa: true,
        },
    },
    Shopping: {
        name: 'Shopping',
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            'Beauty Products': true,
            'Computers and Electronics': true,
        },
    },
    Subscriptions: {
        name: 'Subscriptions',
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Music: true,
            Internet: true,
            Learning: true,
        },
    },
    Transfer: {
        name: 'Transfer',
        categoryId: uuid(),
        type: 'transfer',
        subCategories: {},
    },
    Transportation: {
        name: 'Transportation',
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            'Car Service': true,
            'Public Transportation': true,
            Taxi: true,
        },
    },
    Travel: {
        name: 'Travel',
        categoryId: uuid(),
        type: 'spending',
        subCategories: {
            Airline: true,
            Bus: true,
            Train: true,
        },
    },
    Venmo: {
        name: 'Venmo',
        type: 'spending',
        subCategories: {},
    },
};
