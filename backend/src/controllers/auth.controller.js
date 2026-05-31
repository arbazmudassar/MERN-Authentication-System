import userModel from "../models/user.model.js"
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js"
import { sendEmail } from "../services/mail.service.js"
import { generateOTP, getOTPhtml } from "../utils/mail.util.js"
import OTPModel from "../models/OTP.model.js"

export async function Register(req, res) {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({
        $or : [
            { username },
            { email }
        ]
    })

    if(isUserExist){
        return res.status(401).json({message : "User already exist."});
    }

    const hashPassword = crypto.createHash('sha256').update(password).digest('hex');

    const user = await userModel.create({
        username,
        email,
        password : hashPassword
    })

    res.cookie("verifyEmail", email, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 10 * 60 * 1000
    });

    res.status(200).json({
        message : "User registered successfully.",
        user : {
            username : user.username,
            email : user.email,
            verified : user.verified
        }
    })
}

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(401).json({message : "User Not Found!"});
    }
    if(!user.verified){

    res.cookie("verifyEmail", user.email, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 10 * 60 * 1000
    });

    return res.status(403).json({
        message: "Email not verified.",
        redirectToVerify: true
    });
}

    const hashPassword = crypto.createHash("sha256").update(password).digest('hex');

    const isValidPassword = hashPassword === user.password;
    if(!isValidPassword){
        return res.status(401).json({message : "Invalid Credentials!"});
    }

    const refreshToken = jwt.sign({
        id : user._id
    }, config.JWT_Key, {
        expiresIn : "7d"
    });

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers[ "user-agent" ]
    })

    const accessToken = jwt.sign({
            id: user._id,
            sessionId: session._id
        }, config.JWT_Key,{
            expiresIn: "15m"
        })

    res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        })

    res.status(200).json({
        message:"Logged In successfully.",
        user: {
            username: user.username,
            email:user.email
        }
    },accessToken)
}

export async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
            return res.status(400).json({message:"Token not found."})
        }
    
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    
    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })
        
    if(!session){
        return res.status(400).json({message:"Invalid Token"})
    }

    session.revoked = true;
    await session.save();

    res.status(200).json({message:"Logged out successfully."})
}

export async function logoutAll(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(400).json({message:"Token not found."})
    }

    const decoded = jwt.verify(refreshToken, config.JWT_Key);

    await sessionModel.updateMany({
        user: decoded._id,
        revoked: false
    },{
        revoked: true
    });

    res.clearCookie("refreshToken")

    res.status(200).json({
        message:"Logged out from all devices."
    })
}

export async function refreshToken(req, res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(409).json({message:"Referesh Token not found."})
    }

    const decoded = jwt.verify(refreshToken, config.JWT_Key)

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if(!session){
        return res.status(401).json({message:"Invalid Token"})
    }

    const accessToken = jwt.sign({
        id: decoded._id
    }, config.JWT_Key,{
        expiresIn: "15m"
    })

    const newrefreshToken = jwt.sign({
        id:decoded._id
    }, config.JWT_Key,{
        expiresIn: "7d"
    })

    const newrefreshTokenHash = crypto.createHash("sha256").update(newrefreshToken).digest("hex");

    session.refreshTokenHash = newrefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newrefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7*24*60*60*1000
    })

    res.status(200).json({message:"Token refreshed successfully.", accessToken})
}

export async function verifyEmail(req, res){
    const {email, otp} = req.body;

    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

    console.log("executed")
    const otpDoc = await OTPModel.findOne({
        email,
        otpHash
    })

    if(!otpDoc){
        return res.status(401).json({message:"Invalid OTP!"})
    }

    const user = await userModel.findByIdAndUpdate(otpDoc.user,{
        verified: true
    })

    await OTPModel.deleteMany({
        user: otpDoc.user
    })
    res.clearCookie("verifyEmail");

    return res.status(200).json({
        message: "User Verified Successfully.",
        user: {
            username : user.username,
            email : user.email,
            verified : user.verified
        }
    })
}

export async function sendVerificationOTP(req, res) {

    const email = req.cookies.verifyEmail;

    if(!email){
        return res.status(401).json({
            message: "Verification session expired"
        });
    }

    const user = await userModel.findOne({ email });

    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    const latestOTP = await OTPModel
    .findOne({ user: user._id })
    .sort({ createdAt: -1 });

if (
    latestOTP &&
    Date.now() - latestOTP.createdAt.getTime() < 60 * 1000
) {
    return res.status(429).json({
        message: "Please wait 60 seconds before requesting another OTP."
    });
}

    const OTP = generateOTP();

    const otpHash = crypto
        .createHash("sha256")
        .update(OTP)
        .digest("hex");

    await OTPModel.deleteMany({
        user: user._id
    });

    await OTPModel.create({
        email,
        user: user._id,
        otpHash
    });

    const HTML = getOTPhtml(OTP);

    await sendEmail(
        email,
        "OTP Verification",
        `Your OTP is ${OTP}`,
        HTML
    );

    return res.status(200).json({
        message: "OTP sent successfully"
    });
}

export async function getMe(req, res) {
    try {

        const email = req.cookies.verifyEmail;

        if (!email) {
            return res.status(401).json({
                message: "Verification session expired"
            });
        }

        const user = await userModel.findOne({ email })
            .select("username email verified");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export async function sendForgotPasswordOTP(req, res) {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const latestOTP = await OTPModel
        .findOne({ user: user._id })
        .sort({ createdAt: -1 });

    if (
        latestOTP &&
        Date.now() - latestOTP.createdAt.getTime() < 60 * 1000
    ) {
        return res.status(429).json({
            message: "Please wait 60 seconds before requesting another OTP."
        });
    }

    const OTP = generateOTP();

    const otpHash = crypto
        .createHash("sha256")
        .update(OTP)
        .digest("hex");

    await OTPModel.deleteMany({
        user: user._id
    });

    await OTPModel.create({
        email,
        user: user._id,
        otpHash
    });

    const HTML = getOTPhtml(OTP);

    await sendEmail(
        email,
        "Password Reset OTP",
        `Your OTP is ${OTP}`,
        HTML
    );

    return res.status(200).json({
        message: "OTP sent successfully"
    });

}

export async function verifyForgotPasswordOTP(req, res) {

    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            message: "Email and OTP are required"
        });
    }

    const otpHash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    const otpDoc = await OTPModel.findOne({
        email,
        otpHash
    });

    if (!otpDoc) {
        return res.status(401).json({
            message: "Invalid OTP"
        });
    }

    if (
        Date.now() -
        otpDoc.createdAt.getTime() >
        10 * 60 * 1000
    ) {
        await OTPModel.deleteOne({
            _id: otpDoc._id
        });

        return res.status(401).json({
            message: "OTP Expired"
        });
    }

    return res.status(200).json({
        message: "OTP verified successfully"
    });

}

export async function resetPassword(req, res) {

    const {
        email,
        otp,
        password
    } = req.body;

    if (
        !email ||
        !otp ||
        !password
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const otpHash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    const otpDoc = await OTPModel.findOne({
        email,
        otpHash
    });

    if (!otpDoc) {
        return res.status(401).json({
            message: "Invalid OTP"
        });
    }

    if (
        Date.now() -
        otpDoc.createdAt.getTime() >
        10 * 60 * 1000
    ) {
        await OTPModel.deleteOne({
            _id: otpDoc._id
        });

        return res.status(401).json({
            message: "OTP Expired"
        });
    }

    const hashPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    await userModel.findByIdAndUpdate(
        otpDoc.user,
        {
            password: hashPassword
        }
    );

    await OTPModel.deleteMany({
        user: otpDoc.user
    });

    return res.status(200).json({
        message: "Password reset successfully"
    });

}