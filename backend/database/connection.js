import mongoose from "mongoose";

export const connection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"JOB_PORTAL"
    }).then(()=>{
        console.log("connected to the database");
    }).catch((err)=>{
        console.log(`Some error occured while connecting: ${err}`);
    })
}