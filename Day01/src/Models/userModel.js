const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema= new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:30
    },  
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true

    }  ,
    age:{
        type:Number,
        min:7,
        max:80
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    problemSolved:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'Problem'
        }],
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
    
},{timestamps:true});


const User =mongoose.model('User',userSchema);

module.exports=User;