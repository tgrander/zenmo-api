import map from 'lodash/map';
import categories from '../models/categories';
import categoriesRef from '../constants/categoriesRef';


export default () => new Promise((resolve) => {
    map(categories, (value, key) => {
        categoriesRef.doc(key).set(value)
            .then(() => console.log('Category successfully added'))
            .catch(err => new Error(err));
    });

    resolve();
});
