const mongoose = require("mongoose")
const dns = require("dns")
require("dotenv").config()

// Some networks/ISPs fail to resolve MongoDB Atlas's SRV DNS records.
// Forcing a public DNS resolver avoids the "querySrv ECONNREFUSED" error.
dns.setServers(["8.8.8.8", "8.8.4.4"])

const connectDB = async function () {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected")
    } catch (error) {
        console.log("DB Connection failed", error.message)
        process.exit(1)
    }
}

module.exports = connectDB
