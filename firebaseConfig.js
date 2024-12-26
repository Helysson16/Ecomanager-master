// Importação das funções necessárias do Firebase
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBVnq99-E-egRJR-4OQPbJsv-UHOZZSqio",
  authDomain: "ecomanager-81ce4.firebaseapp.com",
  projectId: "ecomanager-81ce4",
  storageBucket: "ecomanager-81ce4.appspot.com",
  messagingSenderId: "409222581060",
  appId: "1:409222581060:web:84f5a5cb8592a99a38e511",
  measurementId: "G-REDEYZZV0G"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

// Inicializar o Firebase Auth com persistência em AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
