const userModel = require("../models/user.model")

async function createUser(userObj) {
    return await userModel.create(userObj)
}

async function findByEmail(email) {
    return await userModel.findOne({ email })
}

async function findById(id) {
    return await userModel.findById(id)
}

module.exports = { createUser, findByEmail, findById }
