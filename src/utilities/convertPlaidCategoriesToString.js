export default (plaidCategories) => {
    let categories;
    if (!plaidCategories) {
        categories = null;
    } else if (Array.isArray(plaidCategories)) {
        categories = plaidCategories.toString();
    } else {
        categories = Object.keys(plaidCategories).toString();
    }
    return categories;
};
