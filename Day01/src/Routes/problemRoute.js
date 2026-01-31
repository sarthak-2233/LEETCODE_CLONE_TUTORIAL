const express=require('express')
const problemRouter= express.Router();
const adminMiddleware = require('../Middleware/adminMiddleware');
const userMiddleware = require('../Middleware/userMiddleware');
const {createProblem,deleteProblem,updateProblem,getProblem,getAllProblem,solvedProblem}= require('../Controllers/problemController');

// ADMIN ACCESS REQUIRED
// CREATE 
problemRouter.post('/create',adminMiddleware,createProblem)
// UPDATE
problemRouter.put('/update/:id',adminMiddleware,updateProblem)
// DELETE
problemRouter.delete('/delete/:id',adminMiddleware,deleteProblem)

// NO ACCESS REQUIRED
// FETCH
problemRouter.get('/getProblem/:id',userMiddleware,getProblem)
//fetch all
problemRouter.get('/getAllProblem',userMiddleware,getAllProblem)
problemRouter.get('/problemSolvedByUser',userMiddleware,solvedProblem)

module.exports= problemRouter;