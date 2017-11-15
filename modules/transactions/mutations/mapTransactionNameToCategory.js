import mapTransactionNameToCategoryRef from '../constants/mapTransactionNameToCategory';

export default ({
    name,
    primaryCategory,
    subCategory,
}) => {
    mapTransactionNameToCategoryRef
        .doc(name)
        .set({ primaryCategory, subCategory })
        .then(() =>
            console.log(`${name} mapped to Primary Category ${primaryCategory} and Sub Category ${subCategory}`))
        .catch(error => console.error(`There was an error while trying to map ${name} to ${primaryCategory}: ${error}`));
};
