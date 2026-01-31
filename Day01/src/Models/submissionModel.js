const mongoose=require('mongoose')
const {Schema}= mongoose;
// problem submission when completed after code
const submissionSchema=new Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        problemId:{
            type:Schema.Types.ObjectId,
            ref:'Problem',
            required:true
        },
        code:{
            type:String,
            required:true   
        },
        language:{
            type:String,
            required:true,
            enum:['cpp','java','javascript']
        },
        status:{
            type:String,
            required:true,
            enum:['Pending','Accepted','Wrong Answer','Time Limit Exceeded','Runtime Error','Compilation Error']
        },
        runtime:{
            type:Number, // in ms
            default:0
        },
        memory:{
            type:Number, // in MB
            default:0
        },
        errorMessage:{
            type:String,
            default:""
        },
        testcasesPassed:{
            type:Number,
            default:0
        },
        testCaseTotal:{
            type:Number,
            default:0
        }
    },{timestamps:true}
)
// enum for array
const Submission = mongoose.Model('Submission',submissionSchema);

module.exports=Submission;
