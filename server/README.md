# React-nodejs-mongodb

**SetUp**
<br>
Back-End App

- 1: npm init -y
- 2: npm install express mongoose cors nodemon





# Models folder :

- it has schema of tables/collections

# Mongoose:

    It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

**mongoose.schema**create schema
**mongoose.model**creates collection (collectionName,schema) 


# index.js : 
   -const app = express(); create an instance of an Express application in a Node.js script 
   - app.listen(5000, () => {...}) ; makes app to run on this port .
   - app.use(cors()); is setting up Cross-Origin Resource Sharing (CORS) support in an Express.js application. 
   - make the db connection with **mongoose.connect**
   - create api endpoints with curd methods.














## Example:


# Creating a CRUD App in Node.js

In this guide, we'll create a basic CRUD (Create, Read, Update, Delete) application using Node.js. This application will allow you to manage a list of items.
Prerequisites

Before getting started, ensure you have the following installed:

    Node.js: Download and install it from nodejs.org.
    Text editor or IDE of your choice (e.g., Visual Studio Code).

# Step 1: Setup Project

    Create a project folder.
    Open a terminal in the project folder.
    Run npm init to initialize a package.json file.
    Install required packages, like Express for the web framework.

bash

npm install express

Step 2: Create the Express Application

    Create an index.js file in your project folder.
    Set up the Express app:

javascript

const express = require('express');
const app = express();

// Other configuration goes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

Step 3: Define Routes

    Define routes for CRUD operations (Create, Read, Update, Delete) in index.js.
    Create route handlers for each operation.

javascript

// Example route for reading all items
app.get('/items', (req, res) => {
  // Code to fetch and send items
});

Step 4: Implement Data Storage

    Implement a data storage solution (e.g., in-memory array, database).
    Use this data storage for CRUD operations.

javascript

const items = []; // Replace with your data storage solution

// Create a new item
app.post('/items', (req, res) => {
  // Code to create a new item
});

// Read a specific item
app.get('/items/:id', (req, res) => {
  // Code to read a specific item
});

// Update a specific item
app.put('/items/:id', (req, res) => {
  // Code to update a specific item
});

// Delete a specific item
app.delete('/items/:id', (req, res) => {
  // Code to delete a specific item
});

Step 5: Start the Application

    Run your Node.js application:

bash

node app.js

    Access your CRUD API at http://localhost:3000 (or your specified port).