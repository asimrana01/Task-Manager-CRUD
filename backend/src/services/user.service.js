const userRepo = require("../repositories/user.repo")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const AppError=require("../utils/AppError")
const sendOtpEmail  = require("../utils/sendOtpEmail")
require("dotenv").config()

async function signUp(email, password) {
    const user = await userRepo.findByEmail(email)
    if (user) {
        throw new AppError("User Already exists",409)
    }
    const encrypted = await bcrypt.hash(password, 10)
    await userRepo.createUser({ email: email, password: encrypted })
    return { status: 200, message: "Account created Successful" }
}

async function login(email, enteredPassword) {
    const user = await userRepo.findByEmail(email)
    if (!user) {
        throw new AppError("User does not exists",404)
    }
    const match = await bcrypt.compare(enteredPassword, user.password)
    if (!match) {
        throw new AppError("Incorrect email or Password",401)
    }
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )
    return { status: 200, message: "Login Successful", token: token }
}
async function forgotPassword(email) {
  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  const otp = crypto.randomInt(100000,1000000).toString()
  const hashedOtp=await bcrypt.hash(otp,10)
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now
  await userRepo.updateUser(email, { otp: hashedOtp, otpExpiry });

  await sendOtpEmail(email, otp);
 return {message:"OTP has been sent"}

}

module.exports = { signUp, login , forgotPassword}
