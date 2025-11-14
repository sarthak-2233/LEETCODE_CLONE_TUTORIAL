const express = require('express')
const authRouter = express.Router();
const { register, login, logout } = require('../Controllers/userController')

// REGISTER
authRouter.post('/register', register)

// LOGIN
authRouter.post('/login', login)

// LOGOUT
authRouter.post('/logout', logout)

// GET PROFILE (you'll need to add the controller function for this)
// authRouter.get('/profile', ) // Add the controller function here

module.exports = authRouter