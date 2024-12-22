SchedPro - Professional Scheduling Platform
📝 Introduction
SchedPro is a web application designed to simplify scheduling and appointment management for professionals and teams. It provides features like availability management, group session scheduling, and real-time analytics to streamline your workflow.
🏗️ Project Type
Frontend + Backend (Fullstack)
🚀 Deployed App

Frontend: SchedPro Frontend
Backend: Firebase Services

📁 Directory Structure
Copyschedpro/
├─ index.html
├─ dashboard.html
├─ css/
│  ├─ styles.css
│  ├─ dashboard.css
├─ js/
│  ├─ main.js
│  ├─ dashboard.js
├─ firebase.js
✨ Features

User Authentication and Authorization with Firebase
Appointment Scheduling with Availability Management
Group Sessions Management
Real-time Analytics for Meetings and Availability
Dynamic UI Updates with Firebase Realtime Database and Firestore

🤔 Design Decisions and Assumptions

Firebase was chosen for its ease of integration and real-time capabilities
The application prioritizes responsiveness and accessibility to ensure usability across devices
User authentication is implemented using Firebase Auth for secure login and session management

🛠️ Installation & Getting Started
Follow the steps below to set up and run the project:

Clone the repository:

Copygit clone https://github.com/WANI-SHAFIQ/scheduling-app.git

Install a local web server (if needed for testing)
Configure Firebase:

Create a Firebase project at Firebase Console
Copy the Firebase config object and replace the placeholder in firebase.js


Open index.html in your browser to launch the app

📖 Usage

Visit the deployed site or open index.html locally
Sign up or log in using your credentials
Navigate through the dashboard to manage your schedule, availability, and group sessions
Use the stats section for insights into your meetings and availability

🔑 Credentials
For demo purposes, you can use the following credentials:

Email: johndoe@gmail.com
Password: 123456

🔌 APIs Used

Firebase Authentication
Firebase Firestore
Firebase Realtime Database

🛣️ API Endpoints
Since Firebase is used, explicit REST API endpoints are not defined. All data interactions are managed via Firebase SDK.
💻 Technology Stack

Frontend: HTML, CSS, JavaScript
Backend: Firebase Authentication, Firestore, Realtime Database
Hosting: Firebase Hosting
