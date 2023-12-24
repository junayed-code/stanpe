import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
