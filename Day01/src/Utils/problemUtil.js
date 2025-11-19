const getLanguageByid= (lang)=>{
      const language = {
          "c++":54,
          "java":62,
          "javascript":63,
            "python":71,
        }
return language[lang.toLowerCase()];
}


const submitBatch= async(submissions)=>{
    // API INTEGRATION TO JUDGE0 FOR BATCH SUBMISSION
    // RETURN SUBMISSION RESULTS
}

module.exports={getLanguageByid,submitBatch};