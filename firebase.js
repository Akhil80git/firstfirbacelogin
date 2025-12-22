// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase console -> Project settings -> Your apps -> Web app se liya hua config
const firebaseConfig = {
  apiKey: "AIzaSyDciz4ZaVuf11LA_MXb7a3YpmWbM6VyRC4",
  authDomain: "oplotp.firebaseapp.com",       // sirf ek baar
  projectId: "oplotp",
  storageBucket: "oplotp.firebasestorage.app",
  messagingSenderId: "995278859788",
  appId: "1:995278859788:web:f0baaa0c44abb6f68c0829",
  measurementId: "G-YSSVM003KJ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Example: sign in function (optional)
export async function signInWithGoogle() {
  await signInWithPopup(auth, provider);
}
