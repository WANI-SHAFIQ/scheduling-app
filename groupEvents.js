const groupEventsList = document.getElementById('group-events-list');

        function createGroupEvent() {
            const eventName = document.getElementById('event-name').value;
            const eventDate = document.getElementById('event-date').value;
            const eventTime = document.getElementById('event-time').value;
            const maxParticipants = document.getElementById('max-participants').value;

            if (eventName && eventDate && eventTime && maxParticipants) {
                const groupEventItem = document.createElement('div');
                groupEventItem.classList.add('group-event-item');
                groupEventItem.innerHTML = `
                    <strong>${eventName}</strong><br>
                    Date: ${eventDate}<br>
                    Time: ${eventTime}<br>
                    Max Participants: ${maxParticipants}
                `;

                groupEventsList.appendChild(groupEventItem);

                // Clear inputs
                document.getElementById('event-name').value = '';
                document.getElementById('event-date').value = '';
                document.getElementById('event-time').value = '';
                document.getElementById('max-participants').value = '';
            } else {
                alert('Please fill all fields!');
            }
        }