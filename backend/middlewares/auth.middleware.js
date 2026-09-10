const jwt = require("jsonwebtoken")
require("dotenv").config()

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: "Auth Header not Provided" })
    }
    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not Provided" })
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verify
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" })
    }
}

module.exports = authMiddleware
