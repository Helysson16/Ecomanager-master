// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVnq99-E-egRJR-4OQPbJsv-UHOZZSqio",
  authDomain: "ecomanager-81ce4.firebaseapp.com",
  projectId: "ecomanager-81ce4",
  storageBucket: "ecomanager-81ce4.appspot.com",
  messagingSenderId: "409222581060",
  appId: "1:409222581060:web:84f5a5cb8592a99a38e511",
  measurementId: "G-REDEYZZV0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };