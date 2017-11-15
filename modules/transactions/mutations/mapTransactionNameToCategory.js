import mapTransactionNameToCategoryRef from '../constants/mapTransactionNameToCategory';

export default ({
    name,
    newPrimaryCategory,
    newSubCategory,
}) => {
    mapTransactionNameToCategoryRef
        .doc(name)
        .set({ newPrimaryCategory, newSubCategory })
        .then(() =>
            console.log(`${name} mapped to Primary Category ${newPrimaryCategory} and Sub Category ${newSubCategory}`))
        .catch(error => console.error(`There was an error while trying to map ${name} to ${newPrimaryCategory}: ${error}`));
};
