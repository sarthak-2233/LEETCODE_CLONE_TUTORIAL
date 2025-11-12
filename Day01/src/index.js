const express= require('express')
const app= express()
const connectDB=require('./Config/db')
require('dotenv').config()
const cookieParser = require('cookie-parser');







// MIDDLEWARES
app.use(cookieParser()); // to parse cookies from incoming requests
app.use(express.json()); // convert incoming JSON requests to JS objects


// DB CONNECTION
const PORT =process.env.PORT || 5000;
connectDB().then(async ()=>{  
app.listen(PORT,()=>{
    console.log('Server is running on port '+PORT);
})
}).catch((err)=>{
    console.log('Database connection failed:', err);
})


