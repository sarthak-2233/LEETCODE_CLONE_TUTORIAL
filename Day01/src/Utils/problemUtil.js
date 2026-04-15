const axios = require('axios');

const getLanguageByid = (lang) => {
    const language = {
        "c++": 54,
        "java": 62,
        "javascript": 63,
        "python": 71,
    }
    return language[lang.toLowerCase()];
}

const submitBatch = async (submissions) => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions: submissions
        }
    };

    try {
        const response = await axios.request(options);
        return response.data; // Returns array of {token}
    } catch (error) {
        console.error('Error in submitBatch:', error.response?.data || error.message);
        throw error;
    }
}

// ✅ FIXED: Proper async waiting function
const waiting = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const submitToken = async (resultTokens) => {
    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            tokens: resultTokens.join(','),
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error('Error in fetchData:', error.response?.data || error.message);
            throw error;
        }
    }

    // ✅ FIXED: Poll for results until all are ready
    let result = await fetchData();
    
    // Check if submissions are still processing
    while (result.submissions && !result.submissions.every((r) => r.status_id > 2)) {
        console.log('Waiting for results...', result.submissions.map(r => r.status_id));
        await waiting(1000); // Wait 1 second
        result = await fetchData(); // Fetch again
    }
    
    // ✅ FIXED: Return the submissions array
    if (result && result.submissions) {
        return result.submissions;
    } else if (Array.isArray(result)) {
        return result;
    } else {
        console.error('Unexpected response format:', result);
        return [];
    }
}

module.exports = { getLanguageByid, submitBatch, submitToken };