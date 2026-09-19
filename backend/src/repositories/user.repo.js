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
async function updateUser(email,updates){
    return await userModel.updateOne({email},{$set:updates})
}
module.exports = { createUser, findByEmail, findById ,updateUser }
