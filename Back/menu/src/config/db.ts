import mongoose from "mongoose";

const mongoUrl= process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/proyecto?authSource=admin';
const mongoUriLocal = process.env.MONGO_URI_LOCAL || 'mongodb://admin:admin@localhost:27017/proyecto';

const connectDB = async (): Promise<void> => {
    try{
        await mongoose.connect(mongoUrl);
        console.log("MongoDB connected successfully");
    }catch (error) {
        console.log("MongoDB connection failed:", error);
    }
}

export default connectDB;