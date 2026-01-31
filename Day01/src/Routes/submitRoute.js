const express=require('express')
const submitRouter=express.Router();
const userMiddleware = require('../Middleware/userMiddleware');
const {userSubmission}= require('../Controllers/submitController');
submitRouter.post('/submit/:id',userMiddleware,userSubmission)


module.exports= submitRouter;
