import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
let dbURI = process.env.URI

let connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
}
export default connectDB;