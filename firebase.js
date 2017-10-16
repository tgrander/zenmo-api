import firebase from 'firebase'
import admin from 'firebase-admin'
import functions from 'firebase-functions'
import serviceAccount from './firestore-service-account'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

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

export const firestore = admin.firestore()
