// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbwm3u3qqIcTWvItWEXYENzOJASVxA2yk",
  authDomain: "nextarrivingsystem.firebaseapp.com",
  projectId: "nextarrivingsystem",
  storageBucket: "nextarrivingsystem.appspot.com",
  messagingSenderId: "151353683446",
  appId: "1:151353683446:web:52288a0ff603aeb89aebd7",
  measurementId: "G-7Z1YXVDNTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;