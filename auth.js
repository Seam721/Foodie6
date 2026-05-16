import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
    getDatabase,
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


// ==========================
// FIREBASE CONFIG
// ==========================
const firebaseConfig = {
    apiKey: "AIzaSyANPWaFfEFj5nshRaFoxCMAOjVwE3wbt-A",
    authDomain: "foodie-website-b4887.firebaseapp.com",
    projectId: "foodie-website-b4887",
    databaseURL: "https://foodie-website-b4887-default-rtdb.firebaseio.com",
    storageBucket: "foodie-website-b4887.firebasestorage.app",
    messagingSenderId: "531327100872",
    appId: "1:531327100872:web:15c81a528d6749152b02fd",
    measurementId: "G-6NBX4WT371"
};


// ==========================
// INIT FIREBASE
// ==========================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();


// ==========================
// MOBILE CHECK
// ==========================
function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}


// ==========================
// DOM ELEMENTS
// ==========================
window.addEventListener("DOMContentLoaded", async () => {

    const loginBtn = document.getElementById("googleLogin");
    const userProfile = document.getElementById("userProfile");
    const userPhoto = document.getElementById("userPhoto");
    const userName = document.getElementById("userName");
    const userStatus = document.getElementById("userStatus");

    // safety check
    if (!loginBtn) {
        console.error("Login button not found");
        return;
    }

    // keep user logged in
    await setPersistence(auth, browserLocalPersistence);


    // ==========================
    // GOOGLE LOGIN
    // ==========================
    loginBtn.addEventListener("click", async () => {
        try {
            if (isMobile()) {
                await signInWithRedirect(auth, provider);
            } else {
                await signInWithPopup(auth, provider);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });


    // ==========================
    // REDIRECT RESULT (MOBILE)
    // ==========================
    try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
            console.log("Login success:", result.user);
        }
    } catch (error) {
        console.error(error);
    }


    // ==========================
    // AUTH STATE
    // ==========================
    onAuthStateChanged(auth, (user) => {

        if (user) {
            if (userProfile) userProfile.style.display = "flex";
            loginBtn.style.display = "none";

            if (userPhoto) userPhoto.src = user.photoURL || "default.png";
            if (userName) userName.textContent = user.displayName || "User";
            if (userStatus) userStatus.textContent = "Free";

        } else {
            loginBtn.style.display = "block";
            if (userProfile) userProfile.style.display = "none";
        }
    });

});


// ==========================
// SUBSCRIBE FUNCTION (FIREBASE)
// ==========================
window.subscribeEmail = function () {

    const emailInput = document.getElementById("emailInput");

    if (!emailInput) {
        alert("Email input not found");
        return;
    }

    const email = emailInput.value;

    if (!email) {
        alert("Please enter email");
        return;
    }

    const user = getAuth().currentUser;

    const subRef = ref(db, "subscribers");
    const newSub = push(subRef);

    set(newSub, {
        email: email,
        uid: user ? user.uid : "guest",
        name: user ? user.displayName : "guest",
        time: Date.now()
    });

    alert("Subscribed successfully!");

    emailInput.value = "";
};