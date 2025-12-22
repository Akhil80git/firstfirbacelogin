// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDciz4ZaVuf11LA_MXb7a3YpmWbM6VyRC4",
  authDomain: "oplotp.firebaseapp.com",
  projectId: "oplotp",
  storageBucket: "oplotp.firebasestorage.app",
  messagingSenderId: "995278859788",
  appId: "1:995278859788:web:f0baaa0c44abb6f68c0829",
  measurementId: "G-YSSVM003KJ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// button click pe yeh call karo (mobile + desktop dono ke liye safe)
export function loginWithGoogle() {
  signInWithRedirect(auth, provider);
}

// page load hone par (index.js ya main script me) yeh code zaroor chalao:
getRedirectResult(auth).then(async (result) => {
  if (!result) return;
  const user = result.user;
  if (!user) return;

  // yahin Firestore me user save karo, taaki mobile par bhi hamesha chale
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL
  });
});
