document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const appointmentTime = document.getElementById('appointment-time').value;
    const bufferBefore = parseInt(document.getElementById('buffer-before').value, 10);
    const bufferAfter = parseInt(document.getElementById('buffer-after').value, 10);
    const appointmentDate = new Date(appointmentTime);

    const bufferBeforeTime = new Date(appointmentDate.getTime() - bufferBefore * 60000); 
    const bufferAfterTime = new Date(appointmentDate.getTime() + bufferAfter * 60000); 
    document.getElementById('original-time').textContent = appointmentDate.toLocaleString();
    document.getElementById('buffer-before-display').textContent = bufferBefore;
    document.getElementById('buffer-after-display').textContent = bufferAfter;
    document.getElementById('adjusted-time').textContent = bufferAfterTime.toLocaleString();
    document.getElementById('appointment-form').style.display = 'none';
    document.getElementById('appointment-summary').classList.remove('hidden');
});