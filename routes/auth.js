const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');



router.post('/signup', async (req, res) => {
  const { email, password, displayName } = req.body;
  console.log('display...', displayName)
  try {
    console.log("lets go")
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });
    res.status(201).json(userRecord);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJQnjz_imH8wXMLhCZRgoi1TicxBLG5_g`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });
  
      const data = await response.json();
      console.log('data...',data)
  
      if (response.ok) {
        res.status(200).json({ success: true, uid: data.localId, email: data.email, name:data.displayName });
      } else {
        console.error('Error logging in:', data.error);
        res.status(500).json({ error: 'Error logging in' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Error logging in' });
    }
  });

  module.exports = router;
