import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
    await mongoose.connect(config.MongoDB_Local_URI);
    console.log("Database Connected Successfully.");
}

export default connectDB;