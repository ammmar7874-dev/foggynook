import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBD0zg7cTijbJ77kgk2ZJ33JWNZkhvshWM",
  authDomain: "posinventory-1ffa4.firebaseapp.com",
  projectId: "posinventory-1ffa4",
  storageBucket: "posinventory-1ffa4.firebasestorage.app",
  messagingSenderId: "822359210190",
  appId: "1:822359210190:web:23513fe05199928fcc389f",
  measurementId: "G-TJ2BD0HWL2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
