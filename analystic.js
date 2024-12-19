const bookingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    bookings: [120, 150, 180, 200, 230, 170, 210, 190, 160, 220, 250, 240], // Monthly booking counts
    cancellations: 40, // Total cancellations
    noShows: 30, // Total no-shows
    appointmentDurations: [30, 45, 50, 40, 55, 45, 60, 50, 35, 55, 60, 40] // Average duration in minutes per month
};

// Update report data dynamically
function updateReportData() {
    document.getElementById("totalBookings").innerText = bookingData.bookings.reduce((a, b) => a + b, 0);
    document.getElementById("totalCancellations").innerText = bookingData.cancellations;
    document.getElementById("totalNoShows").innerText = bookingData.noShows;
}

// Booking Frequency Chart (Monthly)
const ctx1 = document.getElementById('bookingFrequencyChart').getContext('2d');
const bookingFrequencyChart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: bookingData.labels,
        datasets: [{
            label: 'Bookings',
            data: bookingData.bookings,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Average Appointment Duration Chart
const ctx2 = document.getElementById('appointmentDurationChart').getContext('2d');
const appointmentDurationChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: bookingData.labels,
        datasets: [{
            label: 'Average Duration (mins)',
            data: bookingData.appointmentDurations,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

document.getElementById("dataForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const month = document.getElementById("month").value;
    const bookings = parseInt(document.getElementById("bookings").value);
    const duration = parseInt(document.getElementById("duration").value);

    if (bookingData.labels.includes(month)) {
        const index = bookingData.labels.indexOf(month);
        bookingData.bookings[index] += bookings;
        bookingData.appointmentDurations[index] = duration; 
    } else {
        bookingData.labels.push(month);
        bookingData.bookings.push(bookings);
        bookingData.appointmentDurations.push(duration);
    }

    bookingFrequencyChart.update();
    appointmentDurationChart.update();

    updateReportData();

    document.getElementById("month").value = '';
    document.getElementById("bookings").value = '';
    document.getElementById("duration").value = '';
});

updateReportData();