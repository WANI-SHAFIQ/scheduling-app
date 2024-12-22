// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAp19Hzd6mVP5t-trKp1KFRQcJ0xsQ6pyE",
    authDomain: "eduling-app.firebaseapp.com",
    projectId: "eduling-app",
    storageBucket: "eduling-app.firebasestorage.app",
    messagingSenderId: "127887231707",
    appId: "1:127887231707:web:61b4f5ecfc1d0418d81afe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- SIGNUP FUNCTIONALITY ---
const signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get user input values
        const fullName = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value;

        if (!fullName) {
            alert("Please enter your full name.");
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with full name
            await updateProfile(user, {
                displayName: fullName,
            });

            console.log("User profile updated with full name:", fullName);

            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                email: email,
                createdAt: serverTimestamp(),
            });

            alert("Signup successful! Welcome, " + fullName + "!");
            signupForm.reset();
            window.location.href = "index.html";
        } catch (error) {
            console.error("Error during signup:", error);
            alert(error.message);
        }
    });
}

// --- LOGIN FUNCTIONALITY ---
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get user input values
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } catch (error) {
            console.error("Error during login:", error);
            alert(error.message);
        }
    });
}
