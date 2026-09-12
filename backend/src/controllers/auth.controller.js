const userService = require("../services/user.service")

async function signUp(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }
        const result = await userService.signUp(email, password)
        res.status(result.status).json({ message: result.message })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }
        const result = await userService.login(email, password)
        res.status(result.status).json({ message: result.message, token: result.token })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

module.exports = { signUp, login }
