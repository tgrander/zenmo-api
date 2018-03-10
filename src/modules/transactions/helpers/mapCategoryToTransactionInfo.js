import { firestore } from '../../../../firebase';

const generateNewCategory = (category, payee, type) => ({
    [category]: {
        count: 1,
        payees: { [payee]: true },
        type,
    },
});

const generateNewDoc = (category, payee, type) => ({
    ...generateNewCategory(category, payee, type),
    mostCommonCategory: { count: 1, category },
});

const updatedMostCommon = (count, category, mostCommonCategory) => (
    mostCommonCategory.count < count
        ? { count, category }
        : mostCommonCategory
);

const updateCategory = (count, definedCategory, payee, payees) => ({
    ...definedCategory,
    count,
    payees: { ...payees, payee: true },
});

const updateDoc = ({
    count,
    category,
    data,
    definedCategory,
    mostCommonCategory,
    payee,
    payees,
}) => ({
    ...data,
    [category]: updateCategory(count, definedCategory, payee, payees),
    mostCommonCategory: updatedMostCommon(count, category, mostCommonCategory),
});

export default ({
    category,
    collectionRef,
    docRef,
    payee,
    type,
}) => firestore.runTransaction(async (db) => {
    const ref = collectionRef.doc(docRef);

    try {
        const doc = await db.get(ref);

        if (!doc.exists) {
            const newDoc = generateNewDoc(category, payee, type);
            db.set(ref, newDoc);
            return Promise.resolve(`${docRef} created in ${collectionRef}`);
        }

        const data = doc.data();
        const definedCategory = data[category];

        if (!definedCategory) {
            const updates = generateNewCategory(category, payee, type);
            db.update(ref, updates);
            return Promise.resolve(`${category} added to ${docRef} in ${collectionRef}`);
        }

        const { count, payees } = definedCategory;
        const { mostCommonCategory } = data;
        const increasedCount = count + 1;
        const updates = updateDoc({
            count: increasedCount,
            category,
            data,
            definedCategory,
            mostCommonCategory,
            payee,
            payees,
        });

        db.set(ref, updates);
        return Promise.resolve(`${category} updated in ${docRef} in ${collectionRef}`);
    } catch (e) {
        console.error(e);
        Promise.reject(e);
    }
});
