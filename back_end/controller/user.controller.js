import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken"


export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Provider email, name,password",
                error: true,
                success: false,
            })
        }
        const User = await UserModel.findOne({ email });
        if (User) {
            return response.json({
                message: "Already register email",
                error: true,
                success: false,
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashPassword,
        }
        const newUser = new UserModel(payload);
        const save = await newUser.save();
        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from myShop",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl,

            })
        })
        return response.json({
            message: "User register successfully",
            error: false,
            success: true,
            data: save,
        });


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }

}

export async function verifyEmailController(request, response) {
    try {
        const { code } = request.body;
        const user = await UserModel.findOne({ _id: code });

        if (!user) {
            return response.status(400).json(
                {
                    message: "Invalid code",
                    error: true,
                    success: false,
                }
            )
        }
        const updateUser = await UserModel.updateOne({ _id: code }, {
            verify_email: true
        })
        return response.json({
            message: "Verify email done",
            success: true,
            error: false,
        })



    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}

// login controller 
export async function loginController(request, response) {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({
                message: "provider email or password",
                error: true,
                success: false,
            })
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "User not register",
                error: true,
                success: false,
            })
        }
        if (user.status !== "Active") {
            return response.status(400).json({
                message: "Contact to Admin",
                error: true,
                success: false,
            })
        }
        const checkPassword = await bcryptjs.compare(password, user.password);
        if (!checkPassword) {
            return response.status(400).json({
                message: "Check your password",
                error: true,
                success: false,
            })
        }
        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);
        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        });

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"

        }
        response.cookie('accessToken', accessToken, cookieOptions);
        response.cookie('refreshToken', refreshToken, cookieOptions);
        return response.json({
            message: "Login successfully",
            error: false,
            success: true,

            data: {
                accessToken,
                refreshToken
            }

        })



    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}

// logout controller 

export async function logoutController(request, response) {
    try {
        const userId = request.userId;//middleware
        console.log()
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"

        }
        response.clearCookie("accessToken", cookieOptions)
        response.clearCookie("refreshToken", cookieOptions)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            refresh_token: ""
        })
        return response.json({
            message: "Logout success",
            error: false,
            success: true,
        })

    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}

// upload user avatar


export async function uploadAvatar(request, response) {
    try {

        const userId = request.userId;// auth middleware
        const image = request.file;// multer middleware
        const upload = await uploadImageClodinary(image);
        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return response.json({
            message: "upload profile",
            success: true,
            error: false,
            data: {
                _id: userId,
                avatar: upload.url
            }
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}

// update user details


export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId;// authMiddleware
        const { name, email, mobile, password } = request.body;
        let hashPassword = ""
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        }
        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashPassword }),

        });
        return response.json({
            message: "update user successfully",
            error: false,
            success: true,

        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}


// forgot password  not login
/*
forgotPassword(controller) --> send OTP (send email)--> Verify OTP (controller)-> resetpassword(controller)
*/


export async function forgotPasswordController(request, response) {
    try {
        const { email } = request.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "Email is not available",
                error: true,
                success: false,
            })
        }
        const otp = generatedOtp();
        const expireTime = new Date() + 60 * 60 * 1000 // 1hr

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString()
        })
        await sendEmail({
            sendTo: email,
            subject: "Forgot password from myShop",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp
            })
        })
        return response.json({
            message: "Check your email",
            error: false,
            success: true,

        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }

}


// verify forgot password 

export async function verifyForgotPasswordOtp(request, response) {

    try {
        const { email, otp } = request.body;
        if (!email || !otp) {
            return response.status(400).json({
                message: "provider required filed email or otp ",
                success: false,
                error: true,
            })
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "Email is not available",
                error: true,
                success: false,
            })
        }
        const currentTime = new Date().toISOString();
        if (user.forgot_password_expiry < currentTime) {
            return response.status(400).json({
                message: "otp is expired",
                error: true,
                success: false,
            })
        }
        if (otp !== user.forgot_password_otp) {
            return response.status(400).json({
                message: "Invalid otp",
                success: false,
                error: true,
            })
        }
        //  if otp is not expired 
        //  otp === user.forgot_password_otp khi thành công rồi thì reset lại 
        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            forgot_password_otp: "",
            forgot_password_expiry: "",
        })
        return response.json({
            message: "Verify password successfully ",
            error: false,
            success: true,
        })

    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}

// reset the password 
export async function resetpassword(request, response) {
    try {
        const { email, newPassword, configPassword } = request.body;
        if (!email || !newPassword || !configPassword) {
            return response.status(400).json({
                message: "provider required email,newPassword,configPassword",
                success: false,
                error: true,
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return response.status(400).json({
                message: "Email is not available",
                error: true,
                success: false
            })
        }
        if (newPassword !== configPassword) {
            return response.status(400).json({
                message: "newPassword and configPassword not same",
                error: true,
                success: false,

            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword, salt)
        const update = await UserModel.findByIdAndUpdate(user._id, {
            password: hashPassword
        })
        return response.json({
            message: "Password update successfully",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }

}

// refresh token controller


export async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split("")[1];// ["Bearer","token"]
        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid refreshToken",
                error: true,
                success: false,
            })
        }
        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        if (!verifyToken) {
            return response.status(401).json({
                message: "Token is expired",
                error: true,
                success: false,
            })
        }

        const userId = verifyToken?.id;
        const newAccessToken = await generateAccessToken(userId);
        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        }
        response.cookie("accessToken", newAccessToken, cookiesOptions);
        return response.json({
            message: "new access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken

            }
        })
    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}

// get login user details 

export async function userDetails(request, response) {
    try {
        const userId = request.userId;
        const user = await UserModel.findById(userId).select('-password -refresh_token')

        if (!user) {
            return response.status(400).json({
                message: "User is not login",
                error: true,
                success: false,
            })
        }
        return response.json({
            message: "User details",
            data: user,
            success: true,
            error: false,
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }

}