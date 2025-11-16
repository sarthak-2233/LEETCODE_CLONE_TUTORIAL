const express=require('express')
const problemRouter= express.Router();
const adminMiddleware = require('../Middleware/adminMiddleware');
const {createProblem,deleteProblem,updateProblem,fetchProblem,fetchAllProblem,solvedProblem}= require('../Controllers/problemController');

// ADMIN ACCESS REQUIRED
// CREATE 
problemRouter.post('/create',adminMiddleware,createProblem)
// DELETE
problemRouter.delete('/:id',adminMiddleware,deleteProblem)
// UPDATE
problemRouter.patch('/:id',adminMiddleware,updateProblem)

// NO ACCESS REQUIRED
// FETCH
problemRouter.get('/:id',fetchProblem)
problemRouter.get('/',fetchAllProblem)
problemRouter.get('/user',solvedProblem)