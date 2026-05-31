import dotenv from "dotenv"
dotenv.config();

if(!process.env.MONGO_URI || !process.env.LocalDB_URI || !process.env.JWT_KEY || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN || !process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("Error occur in fetching data from .env file.");
}

const config = {
    Mongo_URI: process.env.MONGO_URI,
    MongoDB_Local_URI : process.env.LocalDB_URI,
    JWT_Key : process.env.JWT_KEY,
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN : process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER : process.env.GOOGLE_USER
}

export default config;