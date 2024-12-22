// ======= Sidebar Navigation Logic =======
// Grab our UI elements for the sidebar navigation
const hamburger = document.getElementById("hamburger");
const sidebar = document.querySelector(".sidebar");
const logo = document.querySelector(".logo");

// Toggle sidebar visibility when hamburger is clicked
// This gives us that smooth mobile navigation experience
hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

// If someone clicks the logo, let's close the sidebar
// Good for returning to the main view quickly
logo.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

// Close the sidebar if user clicks anywhere else on the page
// This is just good UX - prevents the sidebar from getting "stuck" open
document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.classList.remove("active");
    }
});

// ======= Firebase Setup & Configuration =======
// Pull in all the Firebase goodies we need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
    onSnapshot,
    addDoc
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your Firebase config - keep this safe!
// TODO: Move these credentials to environment variables in production
const firebaseConfig = {
    apiKey: "AIzaSyAp19Hzd6mVP5t-trKp1KFRQcJ0xsQ6pyE",
    authDomain: "eduling-app.firebaseapp.com",
    projectId: "eduling-app",
    storageBucket: "eduling-app.appspot.com",
    messagingSenderId: "127887231707",
    appId: "1:127887231707:web:61b4f5ecfc1d0418d81afe",
};

// Fire up Firebase!
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ======= User Authentication & Session Management =======
const userNameElement = document.getElementById("user-name");

// Keep track of user's auth state
// If they're not logged in, kick them back to the login page
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Show user's name (or 'User' if they haven't set one)
        const fullName = user.displayName || "User";
        userNameElement.textContent = fullName;

        // Load up all their dashboard data
        fetchUpcomingMeetings();
        fetchAvailabilityRate();
        fetchGroupSessions();
    } else {
        // No user? Back to login you go!
        window.location.href = "index.html";
    }
});

// ======= Dashboard Data Fetching Functions =======
// Get all upcoming meetings and display them nicely
async function fetchUpcomingMeetings() {
    try {
        const querySnapshot = await getDocs(collection(db, 'meetings'));
        const meetings = querySnapshot.docs.map(doc => doc.data());

        // Clear out old meetings before adding new ones
        const meetingsContainer = document.querySelector('.appointments-list');
        meetingsContainer.innerHTML = '';

        // Create a nice card for each meeting
        meetings.forEach(meeting => {
            const meetingCard = document.createElement('div');
            meetingCard.classList.add('appointment-card');
            meetingCard.innerHTML = `
                <h3>${meeting.name}</h3>
                <p><i class="fas fa-clock"></i> ${meeting.time}</p>
                <p><i class="fas ${meeting.type === 'video' ? 'fa-video' : 'fa-briefcase'}"></i> ${meeting.location}</p>
            `;
            meetingsContainer.appendChild(meetingCard);
        });
    } catch (error) {
        console.error("Oops! Couldn't fetch meetings:", error);
    }
}

// Calculate how much of the user's time is still available
// This helps them manage their schedule better
async function fetchAvailabilityRate() {
    try {
        const userId = auth.currentUser?.uid;
        if (!userId) return; // No user? No availability!

        // Get all their availability slots
        const availableSlotsSnapshot = await getDocs(collection(db, `availability/${userId}/slots`));
        const totalSlots = availableSlotsSnapshot.size;
        const bookedSlots = availableSlotsSnapshot.docs.filter(doc => doc.data().status === 'booked').length;

        // Avoid the dreaded divide by zero!
        if (totalSlots === 0) {
            updateAvailabilityRateDisplay(0);
            return;
        }

        // Factor in upcoming meetings too
        const upcomingMeetingsSnapshot = await getDocs(collection(db, 'meetings'));
        const bookedMeetingSlots = upcomingMeetingsSnapshot.docs.filter(doc => doc.data().status === 'booked').length;

        // Math time! Calculate the percentage of free slots
        const availabilityRate = ((totalSlots - bookedSlots - bookedMeetingSlots) / totalSlots) * 100;
        updateAvailabilityRateDisplay(availabilityRate);
    } catch (error) {
        console.error("Error checking availability:", error);
    }
}

// Update the availability display with a nice rounded percentage
function updateAvailabilityRateDisplay(rate) {
    const availabilityRateElement = document.querySelector('.stat-card .stat-details h2');
    if (availabilityRateElement) {
        availabilityRateElement.textContent = `${Math.round(rate)}%`;
    } else {
        console.error("Can't find where to show availability rate!");
    }
}

// Count up all the group sessions
async function fetchGroupSessions() {
    try {
        const groupSessionsSnapshot = await getDocs(collection(db, 'groupSessions'));
        const groupSessionsCount = groupSessionsSnapshot.size;

        // Pop that number right onto the dashboard
        const groupSessionsElement = document.querySelector('.stat-card .stat-details h2');
        groupSessionsElement.textContent = groupSessionsCount;
    } catch (error) {
        console.error("Couldn't fetch group sessions:", error);
    }
}

// ======= User Actions =======
// Handle user logout
function signOutUser() {
    signOut(auth)
        .then(() => {
            // See ya later! Back to login.
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Logout hit a snag:", error);
        });
}

// Listen for logout clicks
document.getElementById('logout-btn').addEventListener('click', signOutUser);

// ======= Real-time Updates =======
// Keep the appointments list fresh with real-time updates
function displayAppointments() {
    const appointmentsContainer = document.getElementById("appointments-list");
    const upcomingMeetingsElement = document.querySelector('.stat-card .stat-details h2');

    // Show something while we load
    appointmentsContainer.innerHTML = `<h3>Loading appointments...</h3>`;

    // Listen for changes in real-time
    onSnapshot(collection(db, "appointments"), (snapshot) => {
        appointmentsContainer.innerHTML = '';
        let upcomingMeetingsCount = 0;

        snapshot.forEach((doc) => {
            const appointment = doc.data();
            upcomingMeetingsCount++;

            // Build a nice card for each appointment
            const appointmentCard = document.createElement("div");
            appointmentCard.classList.add("appointment-card");
            appointmentCard.innerHTML = `
                <h3>${appointment.userName}</h3>
                <p><i class="fas fa-clock"></i> ${appointment.appointmentTime}</p>
                <p><i class="fas fa-calendar-check"></i> Scheduled</p>
            `;
            appointmentsContainer.appendChild(appointmentCard);
        });

        // Update the count
        upcomingMeetingsElement.textContent = upcomingMeetingsCount;
    });
}

// Keep availability rate updated in real-time
function updateAvailabilityRate() {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        console.error("No user found - can't check availability");
        return;
    }

    // Watch for changes in availability slots
    const slotsRef = collection(db, `availability/${userId}/slots`);
    onSnapshot(slotsRef, () => {
        console.log("Updating availability...");
        fetchAvailabilityRate();
    }, (error) => {
        console.error("Problem watching availability:", error);
    });

    // Watch for changes in meetings too
    const meetingsRef = collection(db, "meetings");
    onSnapshot(meetingsRef, () => {
        console.log("Updating meetings...");
        fetchAvailabilityRate();
    });
}

// Start it all up!
onAuthStateChanged(auth, (user) => {
    if (user) {
        updateAvailabilityRate();
    } else {
        console.error("Not logged in!");
        window.location.href = "index.html";
    }
});

// Initialize appointments display
displayAppointments();