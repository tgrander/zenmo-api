import mapPlaidCategoryToAssignedCategoryRef from '../constants/mapPlaidCategoryToAssignedCategory';

export default ({
    plaidCategory,
    newPrimaryCategory,
    newSubCategory,
}) => {
    const plaidCategoriesString = Object.keys(plaidCategory).toString();

    if (plaidCategoriesString) {
        mapPlaidCategoryToAssignedCategoryRef
            .doc(plaidCategoriesString)
            .set({
                newPrimaryCategory,
                newSubCategory,
            })
            .then(() => `${plaidCategoriesString} successfully mapped to ${newPrimaryCategory} and ${newSubCategory}`)
            .catch(() => console.error(`There was a problem mapping ${plaidCategoriesString} to ${newPrimaryCategory} and ${newSubCategory}`));
    }
};
