import {
    mapPlaidCategoryToAssignedCategoryRef,
    mapTransactionNameToCategoryRef,
} from '../../../databaseRefs';

export default async (name, plaidCategories) => {
    let categories = { primaryCategory: null, subcategory: null };

    try {
        const categorizedByName = await mapTransactionNameToCategoryRef
            .doc(name)
            .get();

        if (categorizedByName.exists) {
            const { primaryCategory, subCategory } = categorizedByName.data();
            categories = { primaryCategory, subCategory };
        } else {
            const plaidCategoriesString = Object.keys(plaidCategories).toString();
            const plaidCategoriesDoc = await mapPlaidCategoryToAssignedCategoryRef
                .doc(plaidCategoriesString)
                .get();

            if (plaidCategoriesDoc.exists) {
                const { primaryCategory, subCategory } = plaidCategoriesDoc.data();
                categories = { primaryCategory, subCategory };
            }
        }
    } catch (e) {
        return console.error('Error categorizing transaction: ', e);
    }

    return categories;
};
