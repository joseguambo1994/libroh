import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp({
    apiKey: "AIzaSyCUbOXdSzt8LHvdqym3oYwMhHvJfJw-qsw",
    authDomain: "bookreaderlogger.firebaseapp.com",
    projectId: "bookreaderlogger",
    storageBucket: "bookreaderlogger.appspot.com",
    messagingSenderId: "867259163927",
    appId: "1:867259163927:web:d1608effe8383f8b4ec352"
});

const db = getFirestore();

export default db;


// import { getFirestore } from "firebase/firestore";

// // Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyCUbOXdSzt8LHvdqym3oYwMhHvJfJw-qsw",
//     authDomain: "bookreaderlogger.firebaseapp.com",
//     projectId: "bookreaderlogger",
//     storageBucket: "bookreaderlogger.appspot.com",
//     messagingSenderId: "867259163927",
//     appId: "1:867259163927:web:d1608effe8383f8b4ec352"
//   };  
// const app = initializeApp(firebaseConfig);
// const db = app.getFirestore();
// export default db;
