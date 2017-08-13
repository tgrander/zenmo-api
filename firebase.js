import firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyCFPewesJRgBv_Q6cYykthNipoOfCWcHb4',
    authDomain: 'zenmo-7c62a.firebaseapp.com',
    databaseURL: 'https://zenmo-7c62a.firebaseio.com',
    projectId: 'zenmo-7c62a',
    storageBucket: '',
    messagingSenderId: '991854308142'
}

firebase.initializeApp(config)

export const database = firebase.database()
