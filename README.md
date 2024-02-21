# Task Manager Application

Task Manager is a simple task management application built using React for the frontend, Express.js for the backend, and SQLite for data storage.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)


## Overview

Task Manager allows users to create, manage, update, and delete tasks. It provides a user-friendly interface for organizing tasks efficiently. The application uses a RESTful API to communicate between the frontend and backend, ensuring seamless data exchange.

## Features

- Create new tasks with titles and descriptions
- Mark tasks as completed or incomplete
- Edit existing tasks
- Delete tasks
- Error handling for API requests
- Beautiful UI design for an enhanced user experience

## Folder Structure
```

Sure, here's how you can update your README.md file to include the folder structure:

markdown
Copy code
# Task Manager App

This is a simple Task Manager application built with Express.js and React.

## Folder Structure

parent-folder/
│
├── client/ # Frontend folder
│ ├── public/ # Public assets
│ └── src/ # Source code
│   ├── App.js # Main React component
│   ├── index.js # Entry point for React app
│   └── App.css # Styles for React app
│
└── server/ # Backend folder
    ├── models/ # Data models
        └── Task.js/ 
    ├── controllers/ # Business logic
        └── taskController.js/
    ├── routes/ # API routes
        └── taskRoutes.js/ 
    ├── tasks.db # SQLite database file
    ├── index.js # Entry point for Express app
    └── package.json # Backend dependencies
```

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/khuranajordan/Earnest-Assignment.git
    ```
2. Navigate to the project directory
    ```bash
    cd Earnest-Assignment
    ```
3. Install dependencies for the frontend and backend:
    ```bash
    cd client
    npm install
    
    cd server
    npm install
    ```
## Usage
1. Start the backend server
    ```bash
    cd server
    npm start
    ```
2. Start the frontend development server:
    ```bash
    cd client
    npm run dev
    ```
3. Open your browser and navigate to http://localhost:3000 to use the Task Manager application.

## API Endpoints
- **GET /api/tasks:** Retrieve all tasks
- **POST /api/tasks:** Add a new task
- **PUT /api/tasks/:id:** Update a task's status (completed or not)
- **DELETE /api/tasks/:id:** Delete a task

## Technologies Used
- React
- Express.js
- SQLite
- Axios
- CSS (for styling)