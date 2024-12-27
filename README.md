# Express Backend Project with MongoDB

This repository contains an Express.js backend project that leverages MongoDB for database operations. It provides RESTful APIs for managing resources and user authentication, using JWT for secure credential handling and Multer for file storage.

## Features

- REST API for Resource Management: CRUD operations for /api/stuff.

- User Authentication: Endpoints for user login and signup.

- File Handling: Integrated Multer middleware for storing uploaded files.

- Secure Authentication: JSON Web Tokens (JWT) for encrypting user credentials.

## API Endpoints

### Stuff API

- GET /api/stuff/: Retrieve all items.

- GET /api/stuff/`:id`: Retrieve a single item by ID.

- POST /api/stuff/: Add a new item (authentication and file upload required).

- PUT /api/stuff/`:id`: Update an item by ID (authentication and file upload required).

- DELETE /api/stuff/`:id`: Delete an item by ID (authentication required).

### User API

- POST /api/user/signup: Register a new user.

- POST /api/user/login: Authenticate a user and generate a JWT.

## Quick Start

Follow these steps to run the project locally:

### Prerequisites

- Node.js (v14 or higher)

- MongoDB (running instance or cloud-based MongoDB Atlas account)

### Installation

Clone the repository:
```bash
git clone https://github.com/abdelkhalek-saadani/express-app.git
cd https://github.com/abdelkhalek-saadani/express-app.git
```
### Install dependencies:

```
npm install
```

### Create an .env file in the root directory and configure the following variables:

```
MONGOOSE_CONNECTION_STRING_USERDB=<user-db-uri>
MONGOOSE_CONNECTION_STRING_THINGDB=<stuff-db-uri>
RANDOM_TOKEN_SECRET=<your-jwt-secret>
```

### Start the development server:
```
npm start
```
Access the application at http://localhost:3000.

## File Uploads

The project uses Multer to handle file uploads. Uploaded files are stored in the /images directory by default. Ensure the directory exists and has appropriate permissions.

