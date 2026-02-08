const express = require('express')
const authRouter = express.Router();
const {register,login,logout,adminRegitser} = require('../Controllers/userController');
const userMiddleware = require('../Middleware/userMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');
const {deleteProfile} = require('../Controllers/userController');

// REGISTER
authRouter.post('/register', register)
// LOGIN
authRouter.post('/login', login)
// LOGOUT
authRouter.post('/logout',userMiddleware ,logout)
// ADMIN REGISTER route 
authRouter.post('/admin/register',adminMiddleware,adminRegitser)
// GET PROFILE (you'll need to add the controller function for this)
authRouter.delete('/profile',userMiddleware,deleteProfile)

// Check status of the user
authRouter.get('/check', userMiddleware, (req,res)=>{
    const reply ={
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id: req.result._id
    }
    res.status(200).json({
        success:true,
        user:reply,
        message:"User is logged in"
    })
})


module.exports = authRouter