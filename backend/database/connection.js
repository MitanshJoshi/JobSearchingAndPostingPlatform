import mongoose from "mongoose";

export const connection = async() => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "JOB_PORTAL",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 50000, 
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.log(`Some error occurred while connecting: ${err.message}`);
    });
};
