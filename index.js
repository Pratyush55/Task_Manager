
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const tasksRouter = require('./routes/task');
const signupRouter = require('./routes/auth');


require('dotenv').config();


connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://task-management-7f438.firebaseio.com'
});



app.use('/api/task', tasksRouter);
app.use('/api/auth', signupRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
