function processPayment(event) {
    event.preventDefault(); 
    setTimeout(() => {
        document.getElementById('payment-form').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
    }, 1000); 
}