const Problem = require('../Models/problem');
const Submission=require('../Models/submissionModel');
const {getLanguageByid,submitBatch,submitToken}= require('../Utils/problemUtil');
const userSubmission = async (req, res) => {
    try {
        const userId = req.result._id;
        const problemId = req.params.id;
        let { code, language } = req.body;

        if (!userId || !problemId || !code || !language) {
            return res.status(400).send("MISSING PARAMETERS");
        }
        
        if (language === 'cpp') language = 'c++';
        
        const problem = await Problem.findById(problemId);
        
        // ✅ FIXED: Use 'Pending' instead of 'pending'
        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            status: 'Pending',  // ✅ Changed from 'pending' to 'Pending'
            testCaseTotal: problem.hiddenTestCases.length  // Note: field name is testCaseTotal (not testCasesToatal)
        });
        
        const languageId = getLanguageByid(language);
        
        // ✅ IMPORTANT: Change 'completeCode' to 'code'
        const submission = problem.hiddenTestCases.map((testcase) => ({
            source_code: code,  // ✅ Must be 'code' not 'completeCode'
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));

        const submitResult = await submitBatch(submission);
        const resultToken = submitResult.map((result) => result.token);
        const testResult = await submitToken(resultToken);
        
        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = 'Accepted';  // ✅ Default to 'Accepted'
        let errormessage = '';
        
        for (const test of testResult) {
            if (test.status_id === 3) {
                testCasesPassed++;
                runtime = runtime + parseFloat(test.time);
                memory = Math.max(memory, test.memory);
            } else {
                // ✅ Map Judge0 status to your enum values
                if (test.status_id === 4) {
                    status = 'Runtime Error';  // ✅ Use your enum value
                    errormessage = test.stderr;
                } else if (test.status_id === 5) {
                    status = 'Time Limit Exceeded';  // ✅ Use your enum value
                    errormessage = test.stderr;
                } else if (test.status_id === 6) {
                    status = 'Compilation Error';  // ✅ Use your enum value
                    errormessage = test.stderr;
                } else {
                    status = 'Wrong Answer';  // ✅ Use your enum value
                    errormessage = test.stderr;
                }
            }
        }

        // ✅ Update with correct status
        submittedResult.status = status;
        submittedResult.testcasesPassed = testCasesPassed;  // Note: field name is testcasesPassed (lowercase c)
        submittedResult.runtime = runtime;
        submittedResult.memory = memory;
        submittedResult.errorMessage = errormessage;

        await submittedResult.save();
        
        // Add problem to user's solved list if status is 'Accepted'
        if (status === 'Accepted' && !req.result.problemSolved.includes(problemId)) {
            req.result.problemSolved.push(problemId);
            await req.result.save();
        }

        res.status(200).json({
            accepted: status === 'Accepted',
            totalTestCases: submittedResult.testCaseTotal,
            passedTestCases: testCasesPassed,
            runtime,
            memory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR SUBMISSION");
    }
}

const runCode = async (req, res) => {
    try {
        const userId = req.result._id;
        const problemId = req.params.id;
        const { code, language } = req.body;

        if (!userId || !problemId || !code || !language) {
            return res.status(400).send("MISSING PARAMETERS");
        }
        
        const problem = await Problem.findById(problemId);
        const languageId = getLanguageByid(language);
        
        const submission = problem.visibleTestCases.map((testcase) => ({
            source_code: code,  // ✅ Must be 'code'
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));

        const submitResult = await submitBatch(submission);
        const resultToken = submitResult.map((result) => result.token);
        const testResult = await submitToken(resultToken);
        
        res.status(200).json({
            success: testResult.every(t => t.status_id === 3),
            runtime: testResult.reduce((a, t) => a + parseFloat(t.time || 0), 0).toFixed(3),
            memory: Math.max(...testResult.map(t => t.memory || 0)),
            testCases: testResult
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR SUBMISSION");
    }
}
module.exports={userSubmission,runCode}
