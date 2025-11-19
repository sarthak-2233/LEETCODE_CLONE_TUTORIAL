const problemModel = require('../Models/problemModel');
const {getLanguageByid,submitBatch}= require('../Utils/problemUtil');
// createProblem,deleteProblem,updateProblem,fetchProblem,fetchAllProblem,solvedProblem

// CREATE PROBLEM CONTROLLER
const createProblem= async(req,res)=>{
    const {title,description,difficulty,tags,
            visibleTestCases,referenceSolution,
            hiddenTestCases,startCode,problemCreator}= req.body;
    try {
        for(const {language,completeCode} of referenceSolution) // destructure for every element
            {
                // JUDGE0 INTEGRATION TO FETCH CODE  
                const languageId= getLanguageByid(language)
                // USING BATCH SUBMISSION FOR MULTIPLE CASES AT ONCE
                const submission= visibleTestCases.map((input,output)=>({
                    source_code: completeCode,
                    language_id: languageId,
                    stdin: input,
                    expected_output: output
                }));
                const submitResult =await submitBatch(submission);
            }        
     } catch (error) {
        console.log(error)
    }
}
// DELETE PROBLEM CONTROLLER
const deleteProblem=async(req,res)=>{

}
// UPDATE PROBLEM CONTROLLER
const updateProblem=async(req,res)=>{

}
// FETCH PROBLEM CONTROLLER
const fetchProblem=async(req,res)=>{

}
// FETCH ALL PROBLEMS CONTROLLER
const fetchAllProblem=async(req,res)=>{

}
// FETCH SOLVED PROBLEMS CONTROLLER
const solvedProblem=async(req,res)=>{

}

module.exports={createProblem,deleteProblem,updateProblem,fetchProblem,fetchAllProblem,solvedProblem}

// JUDGE0 INTEGRATION TO FETCH CODE 
// KEYWORDS REQUIRED FROM JUDGE0 api
// source_code  --  QUESTION CODE
// language_id -- which language
// stdin -- input provided
// expected_output -- output expected
