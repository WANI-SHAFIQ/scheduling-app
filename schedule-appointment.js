// ======= Firebase Setup =======
// Get all the Firebase tools we need for appointments
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase connection details
// TODO: Move to environment variables before deployment!
const firebaseConfig = {
    apiKey: "AIzaSyAp19Hzd6mVP5t-trKp1KFRQcJ0xsQ6pyE",
    authDomain: "eduling-app.firebaseapp.com",
    projectId: "eduling-app",
    storageBucket: "eduling-app.firebasestorage.app",
    messagingSenderId: "127887231707",
    appId: "1:127887231707:web:61b4f5ecfc1d0418d81afe",
};

// Start up Firebase!
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ======= Available Time Slots =======
// Define our default available time slots
// We could make this dynamic later if needed!
const availableSlots = [
    { time: "09:00 AM", booked: false },
    { time: "10:00 AM", booked: false },
    { time: "11:00 AM", booked: false },
    { time: "01:00 PM", booked: false }, // Lunch break between 11 and 1
    { time: "02:00 PM", booked: false },
    { time: "03:00 PM", booked: false },
    { time: "04:00 PM", booked: false },
];

// Keep track of all our appointments
let appointments = [];

// ======= UI Display Functions =======
// Show all available time slots to the user
function displayAvailableSlots() {
    const slotContainer = document.getElementById("availability-list");
    slotContainer.innerHTML = ""; // Clear existing slots

    // Create a nice clickable element for each time slot
    availableSlots.forEach((slot, index) => {
        const slotElement = document.createElement("div");
        slotElement.classList.add("slot");
        slotElement.textContent = slot.time;

        // Style differently based on whether it's booked
        if (slot.booked) {
            slotElement.classList.add("booked");
        } else {
            slotElement.classList.add("available");
            // Let them click available slots
            slotElement.onclick = () => selectSlot(index);
        }

        slotContainer.appendChild(slotElement);
    });
}

// When someone clicks a time slot, show them the booking form
function selectSlot(index) {
    // Double-check it's not already booked
    if (availableSlots[index].booked) return;

    // Show the booking form and remember which slot they picked
    document.getElementById("booking-form-container").style.display = "block";
    window.selectedSlotIndex = index;
}

// ======= Appointment Management =======
// Handle the actual booking process
window.bookAppointment = async function () {
    const userName = document.getElementById("user-name").value;

    // Make sure they put in their name!
    if (!userName) {
        alert("Please enter your name.");
        return;
    }

    const selectedSlot = availableSlots[window.selectedSlotIndex];
    selectedSlot.booked = true;

    // Package up the appointment details
    const appointment = {
        userName: userName,
        appointmentTime: selectedSlot.time,
    };

    try {
        // Save to Firebase and update our local list
        await addDoc(collection(db, "appointments"), appointment);
        appointments.push(appointment);

        // Update all our displays
        displayAvailableSlots();
        displayAppointments();

        // Hide the form and show a nice confirmation
        document.getElementById("booking-form-container").style.display = "none";
        document.getElementById("confirmation-message").textContent =
            `Thank you, ${userName}! You're all set for ${selectedSlot.time}.`;
    } catch (error) {
        console.error("Uh oh, booking failed:", error);
        alert("Sorry, couldn't book that appointment. Mind trying again?");
    }
};

// Show all booked appointments
function displayAppointments() {
    const appointmentsContainer = document.getElementById("appointments-container");
    appointmentsContainer.innerHTML = `<h2>Your Appointments</h2>`;

    // Listen for real-time updates to appointments
    onSnapshot(collection(db, "appointments"), (snapshot) => {
        appointments = [];
        snapshot.forEach((doc) => {
            appointments.push({ id: doc.id, ...doc.data() });
        });

        // Refresh the appointments display
        appointmentsContainer.innerHTML = `<h2>Your Appointments</h2>`;
        appointments.forEach((appointment) => {
            const appointmentDiv = document.createElement("div");
            appointmentDiv.classList.add("appointment");
            appointmentDiv.innerHTML = `
                <p><strong>${appointment.userName}</strong> - ${appointment.appointmentTime}</p>
                <button id="edit-button" onclick="editAppointment('${appointment.id}')">Edit</button>
                <button id="cancel-button" onclick="cancelAppointment('${appointment.id}')">Cancel</button>
            `;
            appointmentsContainer.appendChild(appointmentDiv);
        });

        // Make sure our available slots reflect these appointments
        updateAvailableSlots();
    });
}

// Keep our available slots in sync with booked appointments
function updateAvailableSlots() {
    availableSlots.forEach((slot) => {
        // Mark a slot as booked if we find a matching appointment
        slot.booked = appointments.some(
            (appointment) => appointment.appointmentTime === slot.time
        );
    });
    displayAvailableSlots();
}

// ======= Appointment Modifications =======
// Let users change their appointment time
window.editAppointment = async function (appointmentId) {
    const newTime = prompt("What time would you like to change this to?");

    if (!newTime) return; // They cancelled the prompt

    try {
        const appointmentDoc = doc(db, "appointments", appointmentId);
        await updateDoc(appointmentDoc, { appointmentTime: newTime });

        alert("Great! Your appointment has been updated.");
        displayAppointments();
    } catch (error) {
        console.error("Couldn't update the appointment:", error);
        alert("Sorry, the update didn't work. Want to try again?");
    }
};

// Let users cancel their appointments
window.cancelAppointment = async function (appointmentId) {
    try {
        const appointmentDoc = doc(db, "appointments", appointmentId);
        await deleteDoc(appointmentDoc);

        alert("Your appointment has been cancelled.");
        displayAppointments();
    } catch (error) {
        console.error("Couldn't cancel the appointment:", error);
        alert("Sorry, something went wrong with cancellation. Please try again!");
    }
};

// ======= Initialize Everything =======
// Get it all started when the page loads
displayAvailableSlots();
displayAppointments();