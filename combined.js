// Handle availability form submission (from availability.html)
if (document.getElementById('availability-form')) {
    document.getElementById('availability-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;

        // Store availability in localStorage
        let availability = JSON.parse(localStorage.getItem('availability')) || [];
        availability.push({ date, startTime, endTime });
        localStorage.setItem('availability', JSON.stringify(availability));

        displayAvailability();  // Refresh the list after adding a new slot
    });
}

// Display availability (from availability.html)
function displayAvailability() {
    if (document.getElementById('availability-list')) {
        const availabilityList = document.getElementById('availability-list');
        const availability = JSON.parse(localStorage.getItem('availability')) || [];
        const bookedAppointments = JSON.parse(localStorage.getItem('bookedAppointments')) || [];

        availabilityList.innerHTML = '';  // Clear existing list

        availability.forEach((avail, index) => {
            // Check if the slot is already booked
            const isBooked = bookedAppointments.some(app =>
                app.date === avail.date && app.startTime === avail.startTime && app.endTime === avail.endTime
            );

            // Only display available slots
            if (!isBooked) {
                const availabilityItem = document.createElement('div');
                availabilityItem.innerHTML = `<strong>${avail.date}</strong>: ${avail.startTime} - ${avail.endTime}`;

                // Add delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function () {
                    deleteAvailability(index);
                };

                availabilityItem.appendChild(deleteButton);
                availabilityList.appendChild(availabilityItem);
            }
        });
    }
}

// Delete availability slot from localStorage
function deleteAvailability(index) {
    let availability = JSON.parse(localStorage.getItem('availability')) || [];
    availability.splice(index, 1);  // Remove the slot at the specified index
    localStorage.setItem('availability', JSON.stringify(availability));  // Update localStorage
    displayAvailability();  // Refresh the list after deletion
}

// Display user’s booked appointments (from user-appointments.html)
function displayBookedAppointments() {
    const bookedAppointmentsContainer = document.getElementById('booked-appointments');
    const bookedAppointments = JSON.parse(localStorage.getItem('bookedAppointments')) || [];

    bookedAppointmentsContainer.innerHTML = '';  // Clear existing list

    if (bookedAppointments.length === 0) {
        bookedAppointmentsContainer.innerHTML = '<p>You have no appointments booked.</p>';
    } else {
        bookedAppointments.forEach((appointment, index) => {
            const appointmentItem = document.createElement('div');
            appointmentItem.innerHTML = `<strong>${appointment.date}</strong>: ${appointment.startTime} - ${appointment.endTime}`;

            // Edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = function () {
                editAppointment(index);
            };

            // Cancel button
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.onclick = function () {
                cancelAppointment(index);
            };

            appointmentItem.appendChild(editButton);
            appointmentItem.appendChild(cancelButton);
            bookedAppointmentsContainer.appendChild(appointmentItem);
        });
    }
}

// Edit booked appointment
function editAppointment(index) {
    const bookedAppointments = JSON.parse(localStorage.getItem('bookedAppointments')) || [];
    const appointment = bookedAppointments[index];

    // Allow the user to edit the appointment (example using prompt for simplicity)
    const newDate = prompt('Enter new date', appointment.date);
    const newStartTime = prompt('Enter new start time', appointment.startTime);
    const newEndTime = prompt('Enter new end time', appointment.endTime);

    // Update the appointment details
    if (newDate && newStartTime && newEndTime) {
        bookedAppointments[index] = { email: appointment.email, date: newDate, startTime: newStartTime, endTime: newEndTime };
        localStorage.setItem('bookedAppointments', JSON.stringify(bookedAppointments));

        // Refresh the booked appointments display
        displayBookedAppointments();
    }
}

// Cancel booked appointment
function cancelAppointment(index) {
    let bookedAppointments = JSON.parse(localStorage.getItem('bookedAppointments')) || [];

    // Remove the appointment from the list
    bookedAppointments.splice(index, 1);
    localStorage.setItem('bookedAppointments', JSON.stringify(bookedAppointments));

    // Refresh the booked appointments display
    displayBookedAppointments();
}

// Handle booking button click (from index.html)
if (document.getElementById('view-availability-btn')) {
    document.getElementById('view-availability-btn').addEventListener('click', function () {
        const bookEmail = document.getElementById('book-email').value;

        // Show available times for booking
        showAvailableTimes(bookEmail);
    });
}

// Show available times for booking (from index.html)
function showAvailableTimes(bookEmail) {
    if (document.getElementById('available-times')) {
        const availableTimes = document.getElementById('available-times');
        availableTimes.innerHTML = '';  // Clear previous results

        const availability = JSON.parse(localStorage.getItem('availability')) || [];
        const bookedAppointments = JSON.parse(localStorage.getItem('bookedAppointments')) || [];

        // Filter out the already booked slots
        const availableSlots = availability.filter(avail =>
            !bookedAppointments.some(app =>
                app.date === avail.date && app.startTime === avail.startTime && app.endTime === avail.endTime
            )
        );

        // If no slots are available, show a "No slots available" message
        if (availableSlots.length === 0) {
            availableTimes.innerHTML = '<p>No slots available.</p>';
        } else {
            // Display available slots
            availableSlots.forEach(avail => {
                const button = document.createElement('button');
                button.textContent = `${avail.date}: ${avail.startTime} - ${avail.endTime}`;
                button.onclick = function () {
                    bookAppointment(bookEmail, avail);
                };
                availableTimes.appendChild(button);
            });
        }
    }
}

// Handle booking an appointment (from index.html)
function bookAppointment(bookEmail, avail) {
    const appointment = { email: bookEmail, ...avail };
    let bookedAppointments = JSON.parse(localStorage.getItem('bookedAppointments')) || [];

    // Add the appointment to the booked list
    bookedAppointments.push(appointment);
    localStorage.setItem('bookedAppointments', JSON.stringify(bookedAppointments));

    // Remove the booked slot from availability
    let availability = JSON.parse(localStorage.getItem('availability')) || [];
    availability = availability.filter(av => !(av.date === avail.date && av.startTime === avail.startTime && av.endTime === avail.endTime));
    localStorage.setItem('availability', JSON.stringify(availability));

    sendNotification(appointment);  // Send a notification for the booking
    console.log('Appointment booked:', appointment);
}

// Simulate sending a notification (could be an email or some other notification)
function sendNotification(appointment) {
    alert(`Appointment booked for ${appointment.email} on ${appointment.date} from ${appointment.startTime} to ${appointment.endTime}`);
}

// Initial setup: Show the user's booked appointments when the page loads
window.onload = function () {
    displayBookedAppointments();
};
















