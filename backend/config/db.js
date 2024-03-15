import mongoose from "mongoose";
import dotenv from "dotenv"
// Replace DB with your MongoDB connection string
dotenv.config({ path: './.env' })
const DB = process.env.DATABASE


const ConnectDB = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully!');
        // Additional code to execute after successful connection
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default ConnectDB;
