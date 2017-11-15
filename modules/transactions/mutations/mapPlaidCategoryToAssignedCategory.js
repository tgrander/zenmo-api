import mapPlaidCategoryToAssignedCategoryRef from '../constants/mapPlaidCategoryToAssignedCategory';

export default ({
    plaidCategory,
    primaryCategory,
    subCategory,
}) => {
    const plaidCategoriesString = Object.keys(plaidCategory).toString();

    if (plaidCategoriesString) {
        mapPlaidCategoryToAssignedCategoryRef
            .doc(plaidCategoriesString)
            .set({ primaryCategory, subCategory })
            .then(() => `${plaidCategoriesString} successfully mapped to ${primaryCategory} and ${subCategory}`)
            .catch(() => console.error(`There was a problem mapping ${plaidCategoriesString} to ${primaryCategory} and ${subCategory}`));
    }
};
