import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB02DNDjNMEeCww3tdGARjf1cJQpxSMwNA",
  authDomain: "yarn-store-f032c.firebaseapp.com",
  projectId: "yarn-store-f032c",
  storageBucket: "yarn-store-f032c.appspot.com",
  messagingSenderId: "919421164972",
  appId: "1:919421164972:web:e4fd8bf2ebf440d2a62e09",
  measurementId: "G-2Z93DZPBSV",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
