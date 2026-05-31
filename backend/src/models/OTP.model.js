import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    otpHash: {
        type: String,
        required: true
    }
    },{
        timestamps: true
})

const OTPModel = new mongoose.model("OTPs", OTPSchema);

export default OTPModel