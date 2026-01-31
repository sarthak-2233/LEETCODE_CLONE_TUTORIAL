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
// SCHEMA COMPLETE HONE KE BAAD 
// OPTIONAL PICHE DELTE KARNE WALA BHI SHI
userSchema.post('findOneAndDelete',async function(userInfo){
    if(userInfo){
        await mongoose.model('Submission').deleteMany({user:userInfo._id});
    }
});

const User =mongoose.model('User',userSchema);

module.exports=User;