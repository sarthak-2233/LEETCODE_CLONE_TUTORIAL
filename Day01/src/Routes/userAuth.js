const express=require('express')
const authRouter=express.Router();
const {registerContoller}=require('../Controllers/userController')
//REGISTER
router.post('/register',registerContoller)
// Login
router.post('/login',)
// LOGOUT
router.post('/logout',)
// GET PROFILE
router.get('/profile',)