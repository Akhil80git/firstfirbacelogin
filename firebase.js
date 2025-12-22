import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ⬇️⬇️⬇️  APNA SDK YAHAN PASTE KARO  ⬇️⬇️⬇️ */
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDciz4ZaVuf11LA_MXb7a3YpmWbM6VyRC4",
  authDomain: "oplotp.firebaseapp.com",
   authDomain: "oplotp.firebaseapp.com",
  projectId: "oplotp",
  storageBucket: "oplotp.firebasestorage.app",
  messagingSenderId: "995278859788",
  appId: "1:995278859788:web:f0baaa0c44abb6f68c0829",
  measurementId: "G-YSSVM003KJ"
};
/* ⬆️⬆️⬆️  YAHAN TAK  ⬆️⬆️⬆️ */

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
