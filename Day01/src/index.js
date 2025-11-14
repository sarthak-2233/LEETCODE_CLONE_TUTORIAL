const express= require('express')
const app= express()
const connectDB=require('./Config/db')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const cookieParser = require('cookie-parser');
const authRouter=require('./Routes/userAuth')


// MIDDLEWARES
app.use(cookieParser()); // to parse cookies from incoming requests
app.use(express.json()); // convert incoming JSON requests to JS objects




// ROUTES
app.use('/user',authRouter)
// DB CONNECTION
const PORT =process.env.PORT || 5000;
connectDB().then(async ()=>{  
app.listen(PORT,()=>{
    console.log('Server is running on port '+PORT);
})
}).catch((err)=>{
    console.log('Database connection failed:', err);
})









// // quick diagnostic to confirm env loaded
// if (!process.env.PORT) {
//         console.warn('Warning: process.env.PORT is not set. Did dotenv load the .env file?');
//     } else {
//         console.log('Loaded env PORT=', process.env.PORT);
//     }
