const mongoose= require('mongoose')
const {Schema}= mongoose;

const problemSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        enum:['easy','medium','hard'],
        required:true,
    },
    tags:{
        type:String,
        enum:['array','string','math','dynamic programming','graph','tree','hash table','linked list','stack','queue','bit manipulation'],
        required:true,
    },
    visibleTestCases:[
        {input:{
            type:String,
            required:true,
        },
        output:{
            type:String,
            required:true,
        },
        explanation:{
            type:String,
            required:true,
        }
    }
    ],
    referenceSolution:[{
        language:{
            type:String,
            required:true,
        },
        completeCode:{
            type:String,
            required:true,
        }
    }],
    hiddenTestCases:[
        {input:{
            type:String,
            required:true,
        },
        output:{
            type:String,
            required:true,
        },
        
    }
    ],
    // MAIN CODE WITH PREFFERED LANGUAGE
    startCode:[{
        language:{
            type:String,
            required:true,
        },
        initalCode:{
            type:String,
            required:true,
        }
    }],
    problemCreator:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
},{timestamps:true})

const Problem =mongoose.model('problem',problemSchema)

module.exports= Problem;