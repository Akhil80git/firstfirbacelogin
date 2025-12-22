// auth.js
import { auth, db } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
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

/* 🔘 Login button */
loginBtn.onclick = async () => {
  try {
    // Desktop / most Android browsers
    await signInWithPopup(auth, provider);
  } catch (err) {
    // Mobile fallback (Safari / some in‑app browsers)
    await signInWithRedirect(auth, provider);
  }
};

/* 🔁 Handle redirect result (mobile) */
getRedirectResult(auth).then(async (result) => {
  if (result?.user) {
    await saveUserIfNew(result.user);
  }
});

/* 🔁 Auto login + UI update */
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await saveUserIfNew(user);

    loginBtn.style.display = "none";
    userBox.style.display  = "block";
    userName.innerText     = user.displayName;
    userPhoto.src          = user.photoURL;
  } else {
    loginBtn.style.display = "block";
    userBox.style.display  = "none";
  }
});

/* 💾 Save user (sirf first time) */
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

/* 🚪 Logout */
logoutBtn.onclick = async () => {
  await signOut(auth);
};
