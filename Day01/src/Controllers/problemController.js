const Problem= require('../Models/problem')
const {getLanguageByid,submitBatch,submitToken}= require('../Utils/problemUtil');

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
                const submission= visibleTestCases.map((testcase)=>({
                    source_code: completeCode,
                    language_id: languageId,
                    stdin: testcase.input,
                    expected_output: testcase.output
                }));
           const submitResult =await submitBatch(submission);
        //    console.log(submitResult)
                const resultToken =submitResult.map((result)=>result.token); // TO STORRE TOKEN RETURNED FROM BATCH OP
                // ADD TOKEN TO VISIBLE TEST CASES
                const testResult =await submitToken(resultToken)
                        // console.log(testResult)
                    for(const test of testResult)
                    {
                        if(test.status_id!==3) // IF NOT SUCCESSFUL
                        {
                          return  res.status(400).send("ERROR OCCURED IN REFERENCE SOLUTION")
                        }
                    }
        }
        // CAN STORE IN DB NOW
        await Problem.create({
            ...req.body,
            problemCreator:req.body.problemCreator
            
        })

        res.status(201).send("PROBLEM CREATED SUCCESSFULLY")
    } 
     
     
     catch (error) {
        res.status(500).send("INTERNAL SERVER ERROR")
    }
}
// DELETE PROBLEM CONTROLLER
const deleteProblem=async(req,res)=>{
    const {id}=req.params;
    try {
        if(!id)
        {
            return  res.status(400).send("PROBLEM ID MISSING")
        }
        const deleteProblem= await Problem.findByIdAndDelete(id);
        if(!deleteProblem)
        {
            return res.status(404).send("PROBLEM NOT FOUND")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("INTERNAL SERVER ERROR DELETE")
    }
}
// UPDATE PROBLEM CONTROLLER
const updateProblem=async(req,res)=>{
    const {id}=req.params;
    const {title,description,difficulty,tags,
        visibleTestCases,referenceSolution,
        hiddenTestCases,startCode,problemCreator}= req.body;
        try {
            // CHECK ID
            if(!id)
            {
              return  res.status(400).send("PROBLEM ID MISSING")
            }
            const DsaProblem= await Problem.findById(id);
            if(!DsaProblem)
            {
              return  res.status(404).send("PROBLEM NOT FOUND")
            }
          // check refrence solution again 
          for(const {language,completeCode} of referenceSolution) // destructure for every element
            {
                // JUDGE0 INTEGRATION TO FETCH CODE  
                const languageId= getLanguageByid(language)
                // USING BATCH SUBMISSION FOR MULTIPLE CASES AT ONCE
                const submission= visibleTestCases.map((testcase)=>({
                    source_code: completeCode,
                    language_id: languageId,
                    stdin: testcase.input,
                    expected_output: testcase.output
                }));
           const submitResult =await submitBatch(submission);
        //    console.log(submitResult)
                const resultToken =submitResult.map((result)=>result.token); // TO STORRE TOKEN RETURNED FROM BATCH OP
                // ADD TOKEN TO VISIBLE TEST CASES
                const testResult =await submitToken(resultToken)
                        // console.log(testResult)
                    for(const test of testResult)
                    {
                        if(test.status_id!==3) // IF NOT SUCCESSFUL
                        {
                          return  res.status(400).send("ERROR OCCURED IN REFERENCE SOLUTION")
                        }
                    }
        }
        // AGAR YEH SABH SAHI TOH DIRECT SABH UPDATE MAARDE DB MAIN EK EK CHECK KARNE SE ACHA
      const newProblem= await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true})
      res.status(200).send("PROBLEM UPDATED SUCCESSFULLY")
        } catch (error) {
            console.log(error)
            res.status(500).send("INTERNAL SERVER ERROR Update")
        }
    }
    // FETCH PROBLEM CONTROLLER
    const getProblem=async(req,res)=>{
        
    }
    // FETCH ALL PROBLEMS CONTROLLER
    const getAllProblem=async(req,res)=>{
        
}
// FETCH SOLVED PROBLEMS CONTROLLER
const solvedProblem=async(req,res)=>{

}

module.exports={createProblem,deleteProblem,updateProblem,getProblem,getAllProblem,solvedProblem}

// JUDGE0 INTEGRATION TO FETCH CODE 
// KEYWORDS REQUIRED FROM JUDGE0 api
// source_code  --  QUESTION CODE
// language_id -- which language
// stdin -- input provided
// expected_output -- output expected
