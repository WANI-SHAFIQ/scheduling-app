
        const availabilityList = document.getElementById('availability-list');

        function addAvailability() {
            const day = document.getElementById('day').value;
            const startTime = document.getElementById('start-time').value;
            const endTime = document.getElementById('end-time').value;

            if (day && startTime && endTime) {
                const availabilityItem = document.createElement('div');
                availabilityItem.classList.add('availability-item');
                availabilityItem.textContent = `${day}: ${startTime} - ${endTime}`;

                availabilityList.appendChild(availabilityItem);

                // Clear inputs
                document.getElementById('day').value = '';
                document.getElementById('start-time').value = '';
                document.getElementById('end-time').value = '';
            } else {
                alert('Please fill all fields!');
            }
        }

        function redirectToPayment() {
            window.location.href = 'payment.html'; 
        }

        function redirectToGroupEvent() {
            window.location.href = 'groupEvents.html';
        }

        function redirectToAboutUsPage(){
            window.location.href = 'aboutUsPage.html'
        }