// auth.js
import { auth, db } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const loginBtn  = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userBox   = document.getElementById("userBox");
const userName  = document.getElementById("userName");
const userPhoto = document.getElementById("userPhoto");

const provider = new GoogleAuthProvider();

/* 🔘 Register + Login (same button)
   - Har click par signInWithRedirect
   - Pehli baar aayega to "register" + auto-login
   - Dusri baar se direct login
*/
loginBtn.onclick = async () => {
  await signInWithRedirect(auth, provider);
};

/* 🔁 Redirect ke baad: yahan user milta hai (MOBILE + PC)
   - Yahi pe Firestore me user create/update karna hai
*/
getRedirectResult(auth).then(async (result) => {
  if (!result || !result.user) return;

  const user = result.user;
  await saveUserIfNew(user);        // register
  updateUI(user);                   // auto login
});

/* 🔁 Page refresh / already logged in case */
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await saveUserIfNew(user);      // agar doc nahi hai to bana de
    updateUI(user);
  } else {
    showLoggedOut();
  }
});

/* 💾 Register: agar doc nahi hai to naya user save karo */
async function saveUserIfNew(user) {
  const ref  = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      provider: "google",
      createdAt: new Date()
    });
  }
}

/* 🧑 UI helpers */
function updateUI(user) {
  loginBtn.style.display = "none";
  userBox.style.display  = "block";
  userName.innerText     = user.displayName || user.email;
  userPhoto.src          = user.photoURL || "";
}

function showLoggedOut() {
  loginBtn.style.display = "block";
  userBox.style.display  = "none";
}

/* 🚪 Logout */
logoutBtn.onclick = async () => {
  await signOut(auth);
};
