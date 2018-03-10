import { mapTransactionNameToCategoryRef } from '../../../databaseRefs';
import uuid from '../../../utilities/uuid';

// maps transaction name to category when user manually categorizes transaction in app

export default ({
    name,
    primaryCategory,
    subCategory,
    plaidCategories,
}) => {
    const id = uuid();
    mapTransactionNameToCategoryRef
        .doc(name)
        .set({
            name, primaryCategory, subCategory, plaidCategories, id,
        })
        .then(() =>
            console.log(`${name} mapped to Primary Category ${primaryCategory} and Sub Category ${subCategory}`))
        .catch(error => console.error(`There was an error while trying to map ${name} to ${primaryCategory}: ${error}`));
};
