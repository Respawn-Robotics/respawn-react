// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj_5kTsi_stjcItaNhpKwVjmam0my-OmM",
  authDomain: "respawn-recon.firebaseapp.com",
  projectId: "respawn-recon",
  storageBucket: "respawn-recon.appspot.com",
  messagingSenderId: "541083910195",
  appId: "1:541083910195:web:3487ada99929952dee6346",
  measurementId: "G-KGP8JLK31M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore();