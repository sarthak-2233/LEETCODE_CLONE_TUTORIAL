const express = require('express')
const authRouter = express.Router();
const {register,login,logout,adminRegitser} = require('../Controllers/userController');
const userMiddleware = require('../Middleware/userMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');
// REGISTER
authRouter.post('/register', register)
// LOGIN
authRouter.post('/login', login)
// LOGOUT
authRouter.post('/logout',userMiddleware ,logout)
// ADMIN REGISTER route 
authRouter.post('/admin/register',adminMiddleware,adminRegitser)
// GET PROFILE (you'll need to add the controller function for this)
// authRouter.get('/profile', ) // Add the controller function here

module.exports = authRouter