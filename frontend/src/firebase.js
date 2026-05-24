import { initializeApp } from "firebase/app";

import {
  getAuth
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJoexpmHQEwdJU8qNdBQJZ8zc0qNE1278",
  authDomain: "rakesh-kumar-singh-e47ff.firebaseapp.com",
  projectId: "rakesh-kumar-singh-e47ff",
  storageBucket: "rakesh-kumar-singh-e47ff.firebasestorage.app",
  messagingSenderId: "779677485572",
  appId: "1:779677485572:web:c0595f4d711bc30925c351",
  measurementId: "G-2YQ7PZFZSN"
};

const app = initializeApp(
  firebaseConfig
);

export const auth = getAuth(app);