function generateBookingLink() {
    var userName = document.getElementById("userName").value;
    
    if(userName.trim() === "") {
        alert("Please enter a valid name or identifier.");
        return;
    }
    var uniqueID = new Date().getTime();
    var bookingLink = "https://example.com/booking/" + userName + "/" + uniqueID;
    var bookingLinkContainer = document.getElementById("bookingLinkContainer");
    var bookingLinkElement = document.getElementById("bookingLink");
    bookingLinkElement.href = bookingLink;
    bookingLinkElement.textContent = bookingLink;
    bookingLinkContainer.style.display = "block";
}