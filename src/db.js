import mongoose from "mongoose";

async function ConnectionDB() {
  console.log("Attempting to connect to MongoDB...");
  try {
    await mongoose.connect("mongodb://localhost:27017/LIGHTSOFTWARE");
    console.log("MongoDB Connection Succeeded");
  } catch (error) {
    console.log(`Error in DB connection: ${error}`);
  }
}

ConnectionDB();

