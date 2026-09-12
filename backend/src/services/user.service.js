const userRepo = require("../repositories/user.repo")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

async function signUp(email, password) {
    const user = await userRepo.findByEmail(email)
    if (user) {
        throw { status: 409, message: "User already exists" }
    }
    const encrypted = await bcrypt.hash(password, 10)
    await userRepo.createUser({ email: email, password: encrypted })
    return { status: 201, message: "Account created Successful" }
}

async function login(email, enteredPassword) {
    const user = await userRepo.findByEmail(email)
    if (!user) {
        throw { status: 404, message: "User does not exists" }
    }
    const match = await bcrypt.compare(enteredPassword, user.password)
    if (!match) {
        throw { status: 401, message: "Incorrect Email or Password" }
    }
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )
    return { status: 200, message: "Login Successful", token: token }
}

module.exports = { signUp, login }
