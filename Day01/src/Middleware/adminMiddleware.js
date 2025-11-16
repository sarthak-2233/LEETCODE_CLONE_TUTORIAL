const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const redisClient = require('../Config/redis');


const adminMiddleware = async(req,res,next)=>{
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
     
        if(payload.role !== 'admin'){
            throw new Error("ACCESS DENIED - NOT AN ADMIN");
        }
     
        if(!result)
        {
            throw new Error("USER NOT FOUND");
        }
        // redis check karega block ke liye
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


module.exports = adminMiddleware;