const express = require("express")
const validation=require("../middlewares/validate.middleware")
const signUp=require("../validation/signup.Schema")
const login=require("../validation/login.Schema")
const router = express.Router()
const authController = require("../controllers/auth.controller")
router.post("/signup",validation(signUp), authController.signUp)
router.post("/login", validation(login),authController.login)
module.exports = router
