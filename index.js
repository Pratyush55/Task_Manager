// index.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const tasksRouter = require('./routes/task');
const signup = require('./routes/auth')

// Load environment variables
require('dotenv').config();

// Connect to database
connectDB();

const app = express();
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/task', tasksRouter);
app.use('/api/auth', signup)

const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://task-management-7f438.firebaseio.com'
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
