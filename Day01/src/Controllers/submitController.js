const Problem = require('../Models/problem');
const Submission=require('../Models/submissionModel');
const {getLanguageByid,submitCode}= require('../Utils/problemUtil');
const userSubmission=async (req,res)=>{
    try {
        const userId=req.result_.id;
        const problemId=req.params.id
        const {code,language}=req.body;

        if(!userId || !problemId || !code || !language)
        {
            return res.status(400).send("MISSING PARAMETERS")
        }
        // Fetch problem from Db
       const problem= await Problem.findById(problemId)
    //    TESTCASE MIL GAYE  
    const submittedResult= await Submission.create({
        userId,
        problemId,
        code,
        language,
        status:'pending',
        testCasesToatal: problem.hiddenTestCases.length
    })
    // DB MAIN STORED AB CHECK JUDGE 0
        const languageId= getLanguageByid(language)
        const submission= problem.hiddenTestCases.map((testcase)=>({
                    source_code: completeCode,
                    language_id: languageId,
                    stdin: testcase.input,
                    expected_output: testcase.output
                }));

         const submitResult =await submitBatch(submission);
                 //    console.log(submitResult)
        const resultToken =submitResult.map((result)=>result.token);
          const testResult =await submitToken(resultToken) 
          
          let testCasesPassed=0
          let runtime=0;
          let memory=0;
          let status='accepted'
          let errormessage=''
        //   AB RESULT KO UPDATE KARO
        for(const test of testResult){
            if(test.status_id===3)
             {
                testCasesPassed++;
            runtime=runtime+parseFloat(test.time);
            memory=Math.max(memory,test.memory);
             }     
             else{
                if(test.status_id==4)
                {
                    status='error'
                    errormessage=test.stderr;
                }else{
                    status='wrong'
                    errormessage=test.stderr;
                }
             }

             submittedResult.status=status;
             submittedResult.testCasesPassed=testCasesPassed;
                submittedResult.runtime=runtime;
                submittedResult.memory=memory;
                submittedResult.errorMessage=errormessage;
        }

        await submittedResult.save();
        res.status(200).json({
            submissionId: submittedResult._id,
            status: submittedResult.status,
            testCasesPassed: submittedResult.testCasesPassed,
            totalTestCases: submittedResult.testCasesToatal,
            runtime: submittedResult.runtime,
            memory: submittedResult.memory,
            errorMessage: submittedResult.errorMessage
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("INTERNAL SERVER ERROR SUBMISSION")
    }
}




module.exports={userSubmission}
