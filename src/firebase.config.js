// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE9csaOiVuGE5VTifq3IDz7XjPg4sLYPQ",
  authDomain: "sac-grading-c9c32.firebaseapp.com",
  projectId: "sac-grading-c9c32",
  storageBucket: "sac-grading-c9c32.appspot.com",
  messagingSenderId: "491230449789",
  appId: "1:491230449789:web:14c769fe69ff9451b5e114"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;