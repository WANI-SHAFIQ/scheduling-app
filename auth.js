// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAp19Hzd6mVP5t-trKp1KFRQcJ0xsQ6pyE",
    authDomain: "eduling-app.firebaseapp.com",
    projectId: "eduling-app",
    storageBucket: "eduling-app.firebasestorage.app",
    messagingSenderId: "127887231707",
    appId: "1:127887231707:web:61b4f5ecfc1d0418d81afe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Signup
const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Signup successful!");
                window.location.href = "index.html";
            })
            .catch((error) => {
                alert(error.message);
                console.error(error);
            });
    });
}

// Handle Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Login successful!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                alert(error.message);
                console.error(error);
            });
    });
}
