// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyB7YBpob6wABbburnf_ZziSCxgf-pLPK-o',
    authDomain: 'fb-bdmy-app1.firebaseapp.com',
    projectId: 'fb-bdmy-app1',
    storageBucket: "fb-bdmy-app1.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;
