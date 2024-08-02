# MERN Stack Application

## Overview

This is a MERN stack application that includes features such as user authentication, profile management, and an admin dashboard. The application is designed to handle user registration, login, profile updates, and more. 

## Features

- **User Authentication**: Register, login, and manage user sessions.
- **Profile Management**: Update user profile information and profile images.
- **Admin Dashboard**: View and manage user profiles (accessible only to admin users).
- **Responsive Design**: Optimized for both desktop and mobile screens.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **State Management**: React Context API
- **Styling**: Material-UI for component styling

## Installation

To get started with the application, follow these steps:
# MERN Stack Application

## Overview

This is a MERN stack application that includes features such as user authentication, profile management, and an admin dashboard. The application is designed to handle user registration, login, profile updates, and more.

## Features

- **User Authentication**: Register, login, and manage user sessions.
- **Profile Management**: Update user profile information and profile images.
- **Admin Dashboard**: View and manage user profiles (accessible only to admin users).
- **Responsive Design**: Optimized for both desktop and mobile screens.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **State Management**: React Context API
- **Styling**: Material-UI for component styling

## Installation

To get started with the application, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   npm install
   
 2. To become an Admin of the app:
   set the environment variable in .env file of frontend directory to REACT_APP_ADMIN=your_email

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   npm install
   
2.  Create a .env file in the backend directory with the following variables:

  MONGO_URI=mongodb://localhost:27017/your-database
  JWT_SECRET=your-jwt-secret

3. To become an Admin of the app:
   set the environment variable in .env file of the root directory to ADMIN=your_email
   
