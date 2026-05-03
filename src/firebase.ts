/*----*/

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3FKLVKzV4i95e2aah3pkIvDipAmnwfWs",
  authDomain: "menu-candy.firebaseapp.com",
  databaseURL: "https://menu-candy-default-rtdb.firebaseio.com",
  projectId: "menu-candy",
  storageBucket: "menu-candy.firebasestorage.app",
  messagingSenderId: "630116931529",
  appId: "1:630116931529:web:cf4fb177dd0a2e21d3ba18"
};
const app = initializeApp(firebaseConfig);

// 👇 هذا هو المهم
export const db = getDatabase(app);
export const auth = getAuth(app);
