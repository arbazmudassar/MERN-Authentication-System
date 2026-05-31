import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [ true, "UserName is required" ],
        unique : true
    },
    email : {
        type : String,
        required : [ true, "Email is required" ],
        unique : true
    },
    password : {
        type : String,
        required : [ true, "UserName is required" ]
    },
    verified : {
        type : Boolean,
        default : false
    }
})

const userModel = new mongoose.model("users", userSchema);

export default userModel