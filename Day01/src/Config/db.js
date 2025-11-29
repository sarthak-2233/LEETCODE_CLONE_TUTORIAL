const mongoose=require('mongoose');
// connection for database 
async function main(){
  await  mongoose.connect(process.env.DB_URL);
  console.log("Database connected successfully");
}


module.exports=main;