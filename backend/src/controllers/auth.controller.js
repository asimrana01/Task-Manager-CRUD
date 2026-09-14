const userService = require("../services/user.service")
const AppError=require("../utils/AppError")

async function signUp(req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            throw new AppError("Email and Password required",400)
        }
        const result = await userService.signUp(email, password)
       return res.status(201).json({ message: result.message })
     
}

async function login(req, res) {
    
        const { email, password } = req.body
        if (!email || !password) {
            throw new AppError("Email and Password required",400)
        }
        const result = await userService.login(email, password)
        return res.status(200).json({ message: result.message, token: result.token })

}

module.exports = { signUp, login }
