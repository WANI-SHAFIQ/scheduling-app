# SchedPro - Professional Scheduling Platform

## Introduction

SchedPro is a web application designed to simplify scheduling and appointment management for professionals and teams. It provides features like availability management, group session scheduling, and real-time analytics to streamline your workflow. This platform aims to help professionals organize their time and collaborate more efficiently.

## Project Type

Frontend | Backend | Fullstack

## Deployed App

- **Frontend**: https://schedpro.netlify.app/
- **Backend**: Firebase Services

## Directory Structure

bash
schedpro/
├─ index.html
├─ dashboard.html
├─ css/
│  ├─ styles.css
│  ├─ dashboard.css
├─ js/
│  ├─ main.js
│  ├─ dashboard.js
├─ firebase.js

## Features

- **Interactive User Signup/Login**: Seamlessly create and manage accounts using Firebase Authentication. This feature allows users to securely sign up, log in, and manage their accounts in real-time.
  
- **Dynamic Scheduling UI**: The platform provides an intuitive and user-friendly interface for managing appointments. Users can add, edit, and view tasks easily. The dynamic UI updates automatically, reflecting changes in real-time, making task management smooth.

- **Firebase Integration**: The app leverages Firebase for backend services, ensuring real-time synchronization of data. Firebase Firestore is used to store and retrieve user data, tasks, and schedules, while Firebase Authentication ensures secure login and user management.

## Design Decisions & Assumptions

- **Firebase for Authentication and Database**: Firebase was chosen for its ease of use and integration capabilities. It provides a seamless and secure way to handle authentication and database management, enabling real-time updates across all devices.

- **Single-User Model for Initial Implementation**: The initial version of the app assumes a single-user model. Future versions may include multi-user support for team collaboration and group scheduling.

- **Responsive Design**: Emphasis was placed on creating a responsive and user-friendly interface that works well on both desktop and mobile devices. The goal is to ensure the app is accessible from anywhere, providing flexibility to professionals on the go.

## Installation & Getting Started

Follow these steps to set up and run the project locally:

1. **Open `index.html`** in your preferred browser to launch the app.

2. **For Firebase Setup**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase config object to `scripts/app.js`.

3. **Deploy the app using Firebase CLI** (optional):
   - Install Firebase CLI:

     ``bash
     npm install -g firebase-tools
     ```

   - Log in to Firebase:

     ``bash
     firebase login
     ```

   - Deploy:

     ``bash
     firebase deploy
     ```

## Usage

To use **SchedPro**:

1. **Sign up or log in** using the interactive login page.
2. **Create tasks** by entering details in the task input form.
3. **View or edit tasks** on the dashboard.

You can view your current tasks and manage them by editing or deleting them as needed.

## Credentials

Test Credentials:

- **Email**: testuser@example.com
- **Password**: Test1234

## APIs Used

- **Firebase Authentication**: For user management and secure authentication.
- **Firebase Firestore**: For storing and retrieving task data in real-time, ensuring synchronization across all devices.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase Authentication, Firestore
- **Version Control**: GitHub for collaboration and source control
- **Hosting**: Firebase Hosting (optional for deploying your app)




