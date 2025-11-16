const User = require('../Models/userModel');
const RedisClient = require('../Config/redis');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken')
const validate =require('../Utils/validator');

// REGISTER CONTROLLER
 const register = async (req,res)=>{
    try {
        validate(req.body)
                //DESTRUCTURE 
        const {firstName,emailId,password}=req.body;   

        req.body.password=await bcrypt.hash(password,10) 
        req.body.role='user'   
        const user= await User.create(req.body)
        const token = jwt.sign({_id:user._id,emailId:emailId,role:'user'},process.env.JWT_SECRET,{expiresIn:60*60}) 
        // JWT TOKEN
            res.cookie('token',token,{maxAge:60*60*1000})
        res.status(201).send({
            success:true,
            message:'User registered successfully',
            user:{
                firstName:user.firstName,
                emailId:user.emailId,
                role:user.role,
                _id:user._id
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in registering user',
            error:error.message
        })
    }
}
// LOGIN CONTROLLER
 const login =async (req,res)=>{ 
    try {
            // DESTRUCTURE
            const {emailId,password}=req.body;
            if(!emailId || !password)
                {
                    throw new Error("WRONG CREDENTIALS");
                } 

                const user =await User.findOne({emailId})
                const match =await bcrypt.compare(password,user.password)
                if(!match)
                {
                    throw new Error("WRONG PASSWORD");
                }
                // JWT TOKEN
                const token = jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_SECRET,{expiresIn:60*60}) 
            res.cookie('token',token,{maxAge:60*60*1000})
            res.status(200).send({  
                success:true,
                message:'User logged in successfully',
                user:{
                    firstName:user.firstName,
                    emailId:user.emailId,
                    role:user.role,
                    _id:user._id
                },
                token
            })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in logging in',
            error:error.message
        })
    }
}
// LOGOUT CONTROLLER
 const logout =async (req,res)=>{
    try {

            // validate the token if correct or not
        const {token} = req.cookies
        const payload =jwt.decode(token)

        await RedisClient.set(`toke${token}`,'BLOCKED');
        await RedisClient.expireAt(`token:${token}`,payload.exp)

        res.cookie('token',null,{expires: new Date(Date.now())})
        res.status(200).send({
            success:true,
            message:'User logged out successfully'
        })
    } catch (error) {
        console.log("LOGOUT ERROR "+error)
    }
}
// ADMIN REGISTER CONTROLLER
const adminRegitser=async(req,res)=>{
   try {
        validate(req.body)
                //DESTRUCTURE 
        const {firstName,emailId,password}=req.body;   

        req.body.password=await bcrypt.hash(password,10) 
        req.body.role='admin'   
        const user= await User.create(req.body)
        const token = jwt.sign({_id:user._id,emailId:emailId,role:'user'},process.env.JWT_SECRET,{expiresIn:60*60}) 
        // JWT TOKEN
            res.cookie('token',token,{maxAge:60*60*1000})
        res.status(201).send({
            success:true,
            message:'User registered successfully',
            user:{
                firstName:user.firstName,
                emailId:user.emailId,
                role:user.role,
                _id:user._id
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in registering user',
            error:error.message
        })
    }
}

module.exports={register,login,logout,adminRegitser}