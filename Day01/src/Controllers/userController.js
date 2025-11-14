const User = require('../Models/userModel');
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
        const user= await User.create(req.body)
        const token = jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_SECRET,{expiresIn:60*60}) 
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
                const token = jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_SECRET,{expiresIn:60*60}) 
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

 const logout =async (req,res)=>{
    try {
        res.clearCookie('token')
        res.status(200).send({
            success:true,
            message:'User logged out successfully'
        })
    } catch (error) {
        console.log(error)
    }
}
// if(!firstName || !emailId || !password)
        // {
        //     res.status(400).send({
        //         success:false,
        //         message:'Please provide all required fields'
        //     })
        // }     

        module.exports={register,login,logout}