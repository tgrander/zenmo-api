import accountsRef from '../constants/accountsRef';


export default (accounts, userId = 'I76zn2yehnepunkWQB44EFuCpUm1') => {
    accounts.map(account =>
        accountsRef.doc(account.account_id)
            .set({ ...account, userId })
            .then(() => console.log('Account successfully added'))
            .catch(err => console.error(err)));
};
