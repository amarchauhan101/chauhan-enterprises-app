import mongoose from "mongoose";

 const mongoUrl = process.env.MONGO_URL
 if(!mongoUrl){
    console.log("mongourl is missing");
 }
 let isConnected = false;

 export const dbConnect = async()=>{
    if(isConnected) return;
   
    try{
        const conn = await mongoose.connect(mongoUrl)
        isConnected=conn.connection.readyState === 1;
        if(isConnected ){
            console.log("mongoDb is connected ");
        }
        else{
            console.log("mongo is not connected");
        }
    }
    catch(err){
        console.log(err);
    }
 }
