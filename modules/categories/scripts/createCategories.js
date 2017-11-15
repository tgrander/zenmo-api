import map from 'lodash/map';
import uuid from '../../../utilities/uuid';
import categories from '../models/categories';
import categoriesRef from '../constants/categoriesRef';


export default () => new Promise((resolve) => {
    map(categories, (value, key) => {
        const categoryId = uuid();

        categoriesRef.doc(categoryId).set({ ...value, categoryId })
            .then(() => console.log('Category successfully added'))
            .catch(err => new Error(err));
    });

    resolve();
});
