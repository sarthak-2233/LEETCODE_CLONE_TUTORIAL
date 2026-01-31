const express=require('express')
const submitRouter=express.Router();
const userMiddleware = require('../Middleware/userMiddleware');
const {userSubmission,runCode}= require('../Controllers/submitController');
submitRouter.post('/submit/:id',userMiddleware,userSubmission)
submitRouter.post('/run/:id',userMiddleware,runCode)

module.exports= submitRouter;
