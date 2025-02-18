import mongoose from 'mongoose';

export const connectDb = async ()  => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI);
       console.log("Connection successful", conn.connection.host);
    } catch (error) {
        console.log("ERROR MSG INSIDE DB.JS : ",error);
    }
}