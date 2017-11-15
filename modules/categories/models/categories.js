import uuid from '../../../utilities/uuid';


export default {

    Alcohol: {
        name: 'Alcohol',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'Bars',
            'Liquor Stores',
        ],
    },
    'Bills & Utilities': {
        name: 'Bills & Utilities',
        categoryId: uuid(),
        type: 'payments',
        subCategories: [
            'Home Phone',
            'Internet',
            'Mobile Phone',
            'Television',
            'Utilities',
        ],
    },
    'Business Services': {
        name: 'Business Services',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'Advertising',
            'Legal',
            'Office Supplies',
            'Printing',
            'Shipping',
        ],
    },
    Education: {
        name: 'Education',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'Books & Supplies',
            'Student Loan',
            'Tuition',
        ],
    },
    Entertainment: {
        name: 'Entertainment',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'Amusement',
            'Arts',
            'Movies & DVDs',
            'Music',
        ],
    },
    'Fees & Charges': {
        name: 'Fees & Charges',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'ATM Fee',
            'Bank Fee',
            'Finance Charge',
            'Late Fee',
            'Service Fee',
        ],
    },
    'Food & Dining': {
        name: 'Food & Dining',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'Coffee Shops',
            'Fast Food',
            'Groceries',
            'Restaurants',
        ],
    },
    'Gifts & Donations': {
        name: 'House and Apartment',
        type: 'spending',
        subCategories: [
            'Charity',
            'Gifts',
        ],
    },
    'Health & Fitness': {
        name: 'Health & Fitness',
        type: 'spending',
        subCategories: [
            'Dentist',
            'Doctor',
            'Eyecare',
            'Gym',
            'Health Insurance',
            'Pharmacy',
            'Sports',
        ],
    },
    Home: {
        name: 'Home',
        type: 'spending',
        subCategories: [
            'Cleaning Service',
            'Home Supplies',
            'Furnishings',
            'Home Insurance',
            'Mortgage and Rent',
        ],
    },
    Income: {
        name: 'Income',
        categoryId: uuid(),
        type: 'income',
        subCategories: [
            'Bonus',
            'Interest Income',
            'Paychecks',
            'Reimbursement',
            'Returned Purchase',
        ],
    },
    Miscellaneous: {
        name: 'Miscellaneous',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'ATM Withdrawal',
            'Venmo',
        ],
    },
    'Personal Care': {
        name: 'Personal Care',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'Hair',
            'Laundry',
            'Spa & Massage',
        ],
    },
    Shopping: {
        name: 'Shopping',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'Beauty Products',
            'Books',
            'Clothes',
            'Electronics & Software',
            'Hobbies',
            'Sporting Goods',
        ],
    },
    Subscriptions: {
        name: 'Subscriptions',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'Internet Subscription',
            'Learning Subscription',
            'Health & Wellness Subscription',
            'Music Subscription',
            'Newspapers & Magazines',
        ],
    },
    Transfer: {
        name: 'Transfer',
        categoryId: uuid(),
        type: 'transfer',
        subCategories: [
            'Credit Card Payment',
            'Transfer to Checkings',
            'Transfer to Savings',
        ],
    },
    Transportation: {
        name: 'Transportation',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'Auto Insurance',
            'Auto Payment',
            'Car Service',
            'Gas & Fuel',
            'Parking',
            'Public Transportation',
            'Service & Parts',
            'Taxi',
        ],
    },
    Travel: {
        name: 'Travel',
        categoryId: uuid(),
        type: 'spending',
        subCategories: [
            'Air Travel',
            'Bus Travel',
            'Train Travel',
            'Hotel & Lodging',
            'Rental Car',
            'Vacation',
        ],
    },
};
