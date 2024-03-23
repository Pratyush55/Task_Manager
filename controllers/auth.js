// controllers/authController.js
const admin = require('firebase-admin');


const auth = {

signup : async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password
    });
    res.json(userRecord);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
}
};

module.exports = auth;
