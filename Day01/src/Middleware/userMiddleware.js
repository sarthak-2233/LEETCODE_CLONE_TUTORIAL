const jwt = require('jsonwebtoken');
const userMiddleware = async(req,res,next)=>{
 try {
        const {token} = req.cookies
        if(!token)
        {
            throw new Error("NO TOKEN FOUND");
        }
        const payload =jwt.verify(token,process.env.JWT_SECRET)

        // AB ASLI CHECK
        const {_id}= payload;
        if(!_id)
        {
            throw new Error("INVALID TOKEN PAYLOAD");
        }

        const result= await User.findById(_id)
        if(!result)
        {
            throw new Error("USER NOT FOUND");
        }
        const isBlocked =await redisClient.exists(`token:${token}`)
        if(isBlocked)
        {
            throw new Error("INVALID TOKEN ");
        }
            req.result = result;
            next()
 } catch (error) {
        console.log("MIDDLEWARE ERROR NO ACCESS "+error)    
 }

}

module.exports = userMiddleware;