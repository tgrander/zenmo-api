import { mapPlaidCategoryToAssignedCategoryRef } from '../../../databaseRefs';

export default ({
    plaidCategory,
    primaryCategory,
    subCategory,
    transactionId,
    name,
}) => {
    const plaidCategoriesString = Object.keys(plaidCategory).toString();

    if (plaidCategoriesString) {
        mapPlaidCategoryToAssignedCategoryRef
            .doc(plaidCategoriesString)
            .set({
                primaryCategory, subCategory, name, transactionId,
            })
            .then(() => `${plaidCategoriesString} successfully mapped to ${primaryCategory} and ${subCategory}`)
            .catch(() => console.error(`There was a problem mapping ${plaidCategoriesString} to ${primaryCategory} and ${subCategory}`));
    }
};
