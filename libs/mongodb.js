// libs/mongodb.js
import mongoose from "mongoose";
const MONGODB_URI="mongodb+srv://leahchung99:adminChung@cluster0.nsspakv.mongodb.net/?retryWrites=true&w=majority";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
   
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectMongoDB;
