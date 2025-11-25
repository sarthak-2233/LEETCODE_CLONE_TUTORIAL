const express= require('express')
const app= express()
const connectDB=require('./Config/db')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const cookieParser = require('cookie-parser');
const authRouter=require('./Routes/userAuth')
const redisclient=require('./Config/redis')
const problemRouter=require('./Routes/problemRoute')
// MIDDLEWARE
app.use(cookieParser()); // to parse cookies from incoming requests
app.use(express.json()); // convert incoming JSON requests to JS objects

// ROUTES
app.use('/user',authRouter)
app.use('/problem',problemRouter)
const PORT =process.env.PORT || 5000;

// REDIS USE
const InitializeConnection = async ()=>{
    try {
            await Promise.all([connectDB(),
                redisclient.connect()
            ]);
            console.log('Connected to Redis successfully');

            app.listen(PORT,()=>{ 
                console.log(PORT)
            })
    } catch (error) {
        console.log(error)

    }
}

InitializeConnection();





// // DB CONNECTION
// 
// connectDB().then(async ()=>{  
// app.listen(PORT,()=>{
//     console.log('Server is running on port '+PORT);
// })
// }).catch((err)=>{
//     console.log('Database connection failed:', err);
// })









// // quick diagnostic to confirm env loaded
// if (!process.env.PORT) {
//         console.warn('Warning: process.env.PORT is not set. Did dotenv load the .env file?');
//     } else {
//         console.log('Loaded env PORT=', process.env.PORT);
//     }
