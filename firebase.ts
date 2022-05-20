// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCml5-uuAmvW-71mDXwG1I1fQ10l7DV8RI',
    authDomain: 'bingeflix-71b55.firebaseapp.com',
    projectId: 'bingeflix-71b55',
    storageBucket: 'bingeflix-71b55.appspot.com',
    messagingSenderId: '449545881135',
    appId: '1:449545881135:web:1d9afb5680dc7c7e6be8da'
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
