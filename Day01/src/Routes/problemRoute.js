const express=require('express')
const problemRouter= express.Router();
const adminMiddleware = require('../Middleware/adminMiddleware');
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
problemRouter.get('/getProblem/:id',getProblem)
problemRouter.get('/getAllProblem',getAllProblem)
problemRouter.get('/problemSolvedByUser',solvedProblem)

module.exports= problemRouter;