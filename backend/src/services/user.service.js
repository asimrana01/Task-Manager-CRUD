const userRepo = require("../repositories/user.repo")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AppError=require("../utils/AppError")
require("dotenv").config()

async function signUp(email, password) {
    const user = await userRepo.findByEmail(email)
    if (user) {
        throw new AppError("User Already exists",409)
    }
    const encrypted = await bcrypt.hash(password, 10)
    await userRepo.createUser({ email: email, password: encrypted })
    return { status: 201, message: "Account created Successful" }
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

module.exports = { signUp, login }
